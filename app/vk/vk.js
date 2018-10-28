(function () {


    var ZenVK = function (settings) {
        settings = settings || {};

        this._apiVersion = '5.87';
        this._now = (new Date()) * 1 / 1000;
        this._callTimeout = 100;
        this._stemmerRus = new Snowball('Russian');
        this._stemmerEng = new Snowball('English');
        this._regRus = /[а-я]{2,}/gi;
        this._regEng = /[a-z]{2,}/gi;
        this._timeDelta = 30 * 24 * 60 * 60;

        this._data = {};
        this._debug = false;
    };

    ZenVK.prototype._log = function () {
        if (this._debug) {
            console.log.apply(console, arguments);
        }
    };

    ZenVK.prototype.login = function (callback) {
        var self = this;
        if (!self.__call_login) {
            self.__call_login = true;
            VK.Auth.login(function (resp) {
                delete self.__call_login;
                self._log(resp);
                if (callback) callback(resp);
            });
        }
    };

    ZenVK.prototype.loadFriends = function (callback) {
        var self = this;
        if (!self.__call_loadFriends) {
            self.__call_loadFriends = true;
            VK.Api.call("friends.get", {
                version: self._apiVersion,
                fields: 'nickname'
            }, function (resp) {
                delete self.__call_loadFriends;
                self._log(resp);
                if (!resp.error) {
                    self._data.friends = resp.response;
                }
                if (callback) callback(resp);
            });
        }
    };

    ZenVK.prototype.loadPosts = function (callback) {
        var self = this;
        if (!self.__call_loadPosts) {
            self.__call_loadPosts = true;
            var friends = self._data.friends || [];
            var userIds = friends.map(function (item) { return item.user_id; });
            if (self._debug) {
                userIds.length = Math.min(userIds.length, 10);
            }
            self._loadPosts(userIds, function (resp) {
                delete self.__call_loadPosts;
                self._log(resp);
                if (callback) callback(resp);
            });
        }
    };

    ZenVK.prototype._loadPosts = function (userIds, callback) {
        var self = this;
        if (userIds.length > 0) {
            var id = userIds.pop();
            VK.Api.call("wall.get", {
                owner_id: id,
                filter: 'owner',
                version: self._apiVersion
            }, function (resp) {
                self._log(resp);
                if (!resp.error) {
                    resp.response.shift();
                    self._savePosts(id, resp.response);
                } else if (resp.error.error_code == 6) {
                    userIds.push(id);
                    setTimeout(function () {
                        self._loadPosts(userIds, callback);
                    }, self._callTimeout * 3 + 100);
                    return;
                }
                setTimeout(function () {
                    self._loadPosts(userIds, callback);
                }, self._callTimeout);
            });
        } else {
            if (callback) callback();
        }
    };

    ZenVK.prototype._savePosts = function (userId, posts) {
        var friends = this._data.friends || [];
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].user_id === userId) {
                this._indexPosts(posts);
                friends[i].posts = posts;
                break;
            }
        }
    };

    ZenVK.prototype._indexPosts = function (posts) {
        for (var i = 0; i < posts.length; i++) {
            var p = posts[i];
            p.index = this.textProcessing(p.text);
        }
    };

    ZenVK.prototype.textProcessing = function (text) {
        var self = this;
        text = text.toLowerCase().split('ё').join('е');
        var rusWords = (text.match(self._regRus) || []).map(function (x) {
            self._stemmerRus.setCurrent(x);
            self._stemmerRus.stem();
            return self._stemmerRus.getCurrent();
        });
        var engWords = (text.match(self._regEng) || []).map(function (x) {
            self._stemmerEng.setCurrent(x);
            self._stemmerEng.stem();
            return self._stemmerEng.getCurrent();
        });
        return rusWords.concat(engWords);
    };

    ZenVK.prototype.getStatus = function () {
        var friends = this._data.friends || [];
        var friendsPosts = 0;
        var posts = 0;
        for (var i = 0; i < friends.length; i++) {
            var f = friends[i];
            if (f.posts) {
                friendsPosts++;
                posts += f.posts.length;
            }
        }
        return {
            Friends: friends.length,
            FriendsPosts: friendsPosts,
            Posts: posts
        };
    };

    ZenVK.prototype.search = function (query) {
        var queryIndex = this.textProcessing(query);
        var friends = this._data.friends || [];
        var results = [];
        for (var i = 0; i < friends.length; i++) {
            var f = friends[i];
            var posts = f.posts || [];
            for (var j = 0; j < posts.length; j++) {
                var p = posts[j];
                var r = this.getRang(queryIndex, p.index);
                if (r > 0) {
                    results.push({
                        user: [f.first_name, f.last_name].join(' '),
                        text: p.text,
                        link: 'https://vk.com/wall' + p.from_id + '_' + p.id,
                        rang: r,
                        date: p.date
                    });
                }
            }
        }
        results.sort(function (l, r) {
            if (l.rang !== r.rang) {
                return r.rang - l.rang;
            }
            if (l.data !== r.date) {
                return r.date = l.date;
            }
            if (l.user < r.user) {
                return -1;
            }
            if (l.user > r.user) {
                return 1;
            }
            return 0;
        });
        return results;
    };

    ZenVK.prototype.getRang = function (queryIndex, index) {
        var score = 0;
        for (var i = 0; i < queryIndex.length; i++) {
            var q = queryIndex[i];
            if (index.indexOf(q) >= 0) {
                score++;
            }
        }
        return score;
    };

    var app = window.app = new ZenVK();

    window.onLoginClick = function () {
        app.login(function (resp) {
            if (resp.status === 'connected') {
                var loginForm = document.getElementById('login_form');
                var loadingForm = document.getElementById('loading_form');
                var queryForm = document.getElementById('query_form');
                loginForm.style.display = 'none';
                loadingForm.style.display = 'block';
                app.loadFriends(function (resp) {
                    app.loadPosts(function (resp) {
                        loadingForm.style.display = 'none';
                        queryForm.style.display = 'block';
                    });
                });
            }
        });
    };

    window.onSearchClick = function () {
        try {
            var queryInput = document.getElementById('query');
            var result = document.getElementById('result');
            var query = queryInput.value;
            var posts = app.search(query);

            console.log(posts);

            result.innerHTML = 'Found: ' + posts.length;

            for (var i = 0; i < posts.length; i ++) {
                var item = posts[i];
                var wrapper = document.createElement('p');
                var head = document.createElement('b');
                var date = document.createElement('i');
                var body = document.createElement('span');
                var foot = document.createElement('a');

                head.innerText = (i + 1) + ') ' + item.user;
                date.innerText = (new Date(item.date * 1000)).toISOString().split('T').join(' ');
                body.innerHTML = item.text;
                foot.href = item.link;
                foot.target = '_blank';
                foot.innerText = item.link;

                wrapper.appendChild(document.createElement('hr'));
                wrapper.appendChild(head);
                wrapper.appendChild(document.createElement('br'));
                wrapper.appendChild(date);
                wrapper.appendChild(document.createElement('br'));
                wrapper.appendChild(body);
                wrapper.appendChild(document.createElement('br'));
                wrapper.appendChild(foot);
                wrapper.appendChild(document.createElement('hr'));

                result.appendChild(wrapper);
            }
        } catch (e) {
            console.log(e);
        }

        return false;
    };

    var updateStatus = function () {
        var statusForm = document.getElementById('status_form');
        if (statusForm) {
            var status = app.getStatus();
            var fields = [];
            for (var i in status) {
                fields.push([i, status[i]].join(': '));
            }
            statusForm.innerHTML = fields.join(' / ');
        }
        setTimeout(updateStatus, 1000);
    };

    updateStatus();

})();