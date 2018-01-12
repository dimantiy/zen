---
title: String
---
<style type="text/css">
#string {
    position: relative;
    overflow: hidden;
    height: 100%;
}
.string_point {
    width: 2em;
    height: 2em;
    position: absolute;
    margin-top: -1em;
    margin-left: -1em;
    border-radius: 1em;
    box-sizing: border-box;
    background-color: white;
    border: 0.33em black solid;
}
.dark .string_point{
    background-color: black;
    border-color: white;
}

.string_point:first-child,
.string_point:last-child {
    background-color: black;
}
.dark .string_point:first-child,
.dark .string_point:last-child {
    background-color: white;
}
</style>
<div id="string"></div>
<script type="text/javascript">
(function () {
    var string_node = document.getElementById('string');
    var items = 11;
    for (var i = 0; i < items; i++) {
        item_node = document.createElement('div');
        item_node.className = 'string_point';
        item_node.style.left = 100 * i / (items - 1) + '%';
        string_node.appendChild(item_node);
    }

    var drag_active = false;

    function render(rx, ry) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var nodes = string_node.childNodes;
        var steps = nodes.length - 1;

        rx = Math.max(1 / steps, Math.min((steps - 1) / steps, rx));

        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            var x = i / (nodes.length - 1);
            var y = ry;
            if (x < rx) {
                y = x / rx * ry;
            } else {
                y = (1 - x) / (1 - rx) * ry;
            }
            y += 1;
            y *= window.innerHeight / 2;
            n.style.top = y + 'px';
        }
    }

    function start_drag(rx, ry) {
        render(rx, ry);
        drag_active = true;
    };
    function stop_drag() {
        drag_active = false;
    };
    function drag(rx, ry) {
        render(rx, ry);
    };

    var content_node = document.getElementById('content');
    content_node.onmousedown = function (e) {
        var rx = e.clientX / window.innerWidth;
        var ry = 2 * e.clientY / window.innerHeight - 1;
        start_drag(rx, ry);
    };
    content_node.onmouseup = function (e) {
        stop_drag();
    };
    content_node.onmouseleav = function (e) {
        stop_drag();
    };
    content_node.onmousemove = function (e) {
        if (drag_active) {
            var rx = e.clientX / window.innerWidth;
            var ry = 2 * e.clientY / window.innerHeight - 1;
            drag(rx, ry);
        }
    };

    render(0.5, 0);

})();
</script>
