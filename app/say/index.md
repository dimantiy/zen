---
title: Say
---
<h1 id="say"></h1>
<script>
(function () {
    function read_hash() {
        var args = {};
        var hash = window.location.hash;
        hash = hash.replace('#', '');
        hash = hash.split('&')
        for (var i = 0; i < hash.length; i++) {
            var h = hash[i];
            if (h) {
                h = h.split('=');
                args[h[0]] = decodeURIComponent(h[1]);
            }
        }
        return args;
    };
    window.location.hash = window.location.hash || ('#text=' + encodeURIComponent('Change me in URL'));
    var args = read_hash();
    var node = document.getElementById('say');
    node.innerText = args.text;
})();
</script>
