---
title: VK
layout: default
---

<script src="//vk.com/js/api/openapi.js" type="text/javascript"></script>

<script type="text/javascript">
  VK.init({
    apiId: 6727188
  });
</script>

<script type="text/javascript">
(function () {

    var session = null;
    var version = '5.87';
    var now = (new Date()) * 1 / 1000;
    var delta = 30 * 24 * 60 * 60;
    var call_timeout = 500;

    var onLogin = function (resp) {
        console.log(resp);
        
        if (resp.status === "connected") {
            session = resp.session;
            
            var loginForm = document.getElementById('login_form');
            var queryForm = document.getElementById('query_form');
            
            loginForm.style.display = 'none';
            queryForm.style.display = 'block';
        }
    };
    
    var onLogout = function (resp) {
        // TODO
    };
    
    window.login = function () {
        console.log('LOGIN');
        VK.Auth.login(onLogin);
    };
    
    window.logout = function () {
        console.log('LOGOUT');
        VK.Auth.logout(onLogout);
    };
    
    var getFriends = function (cb) {
        console.log('GET_FRIENDS');
        VK.Api.call("friends.get", {
            version: '5.87'
        }, function (resp) {
            setTimeout(function () { cb(resp); }, call_timeout);
        });
    };
    
    var getPosts = function (userId, cb) {
        console.log('GET_POSTS');
        VK.Api.call("wall.get", {
            owner_id: userId,
            filter: 'owner',
            //extended: 1,
            //fields: 'first_name,last_name',
            version: '5.87'
        }, cb);
    };
    
    var getPostsIteration = function (users, cb) {
        if (users.length > 0) {
            getPosts(users.pop(), cb);
            setTimeout(function () {
                getPostsIteration(users, cb);
            }, call_timeout);
        } else {
            console.log('Finish Iteration');
        }
    };
    
    window.search = function () {
        var query = document.getElementById('query').value.toLowerCase();
        console.log('SEARCH: ' + query);
        
        getFriends(function (resp) {
            console.log(resp);
            if (!resp.error) {
                var friends = resp.response;
                getPostsIteration(friends, function (resp) {
                    console.log(resp);
                    if (!resp.error) {
                        var list = document.getElementById('result');
                        var posts = resp.response;
                        for (var i = 1; i < posts.length; i++) {
                            var from_id = posts[i].from_id;
                            var post_id = posts[i].id;
                            var text = posts[i].text;
                            var post_date = posts[i].date;
                            if (text.toLowerCase().search(query) >= 0 && post_date > now - delta) {
                                var item = document.createElement('p');
                                var link = document.createElement('a');
                                link.innerText = link.href = 'https://vk.com/wall' + from_id + '_' + post_id;
                                link.target = "_blank"; 
                                item.innerText = text;
                                item.appendChild(document.createElement('br'));
                                item.appendChild(link);
                                list.appendChild(item);
                            }
                        }
                    }
                });
            }
        });
    };
    
})();
</script>

# VK

<div id="form">
    <div id="login_form">
        <input type="button" value="Login" onclick="login()" />
    </div>
    <div id="query_form" style="display: none">
        <input type="text" id="query" placeholder="Query" />
        <input type="button" value="Search" onclick="search()" />
    </div>
</div>
<div id="result">
</div>
