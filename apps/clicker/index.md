---
title: Clicker
---

# Clicker

<script type="text/javascript">
(function () {
    var root_node = document.getElementById('content');
    var value_node = document.getElementById('clicker');
    var value = 0;
    value_node.innerText = value;
    root_node.style.cursor = 'pointer';
    root_node.onclick = function () {
        value += 1;
        value_node.innerText = value;
    };
})();
</script>
