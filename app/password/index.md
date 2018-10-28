---
title: Password
layout: default
---
<h1 id="password" style="font-family: monospace"></h1>
<script type="text/javascript">
(function () {
    var alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";

    function get_random_letter(alphabet) {
        var arr = alphabet.split('');
        var r = Math.random()
        var i = Math.floor(r * arr.length) % arr.length;
        return arr[i];
    };

    function get_password(alphabet, length) {
        var pwd = '';
        while (length--) {
            pwd += get_random_letter(alphabet);
        }
        return pwd;
    };

    var node = document.getElementById('password');
    node.innerHTML = get_password(alphabet, 8);

})();
</script>
