---
title: Deadline
layout: default
---
<style>
#deadline {
    display: inline-block;
    line-height: 1;
    font-size: 0;
}
#content {
    padding: 0;
}
.deadline_item {
    display: inline-block;
    box-sizing: border-box;
    border-color: black;
    border-style: solid;
}
.deadline_item.full {
    background: black;
}
.deadline_item.current {
    border-color: red;
    background: red;
}

.dark .deadline_item {
    display: inline-block;
    box-sizing: border-box;
    border-color: white;
    border-style: solid;
}
.dark .deadline_item.full {
    background: white;
}
.dark .deadline_item.current {
    border-color: red;
    background: red;
}
</style>
<div id="deadline"></div>
<script type="text/javascript">
(function () {
    // TODO: Read parameters from URL
    function read_hash() {
        var args = {};
        var hash = window.location.hash;
        hash = hash.replace('#', '');
        hash = hash.split('&')
        for (var i = 0; i < hash.length; i++) {
            var h = hash[i];
            if (h) {
                h = h.split('=');
                args[h[0]] = h[1];
            }
        }
        args.from = new Date(args.from || '1970-01-01');
        args.to = new Date(args.to || '2070-01-01');
        window.location.hash = 'from=' + args.from.toISOString().split('T')[0]
            + '&to=' + args.to.toISOString().split('T')[0];
        return args;
    };

    // TODO: Render function
    var PADDING = 40;
    var ITEM_SIZE = 16 + 2;
    var ITEM_BORDER = 2;
    var ITEM_MARGIN = 8 - 1;
    function render() {
        var args = read_hash();
        var node = document.getElementById('deadline');
        var width = window.innerWidth;
        var height = window.innerHeight;
        var cols = Math.floor((width - PADDING * 2) / (ITEM_SIZE + ITEM_MARGIN * 2));
        var rows = Math.floor((height - PADDING * 2) / (ITEM_SIZE + ITEM_MARGIN * 2));
        var progress = (new Date() - args.from) / (args.to - args.from) * cols * rows;

        node.style.padding = PADDING + 'px';
        node.innerHTML = '';

        for (var i = 0; i < cols * rows; i++) {
            var item = document.createElement('div');
            item.className = 'deadline_item';
            item.style.width = ITEM_SIZE + 'px';
            item.style.height = ITEM_SIZE + 'px';
            item.style.margin = ITEM_MARGIN + 'px';
            item.style.borderWidth = ITEM_BORDER + 'px';
            if (i < progress) {
                item.className = 'deadline_item full';
            }
            if (i == Math.ceil(progress)) {
                item.className = 'deadline_item current';
            }
            node.appendChild(item);
        }
    };

    // TODO: Window resize handler
    var resize_timeout = null;
    window.onresize = function () {
        clearTimeout(resize_timeout);
        resize_timeout = setTimeout(function () {
            render();
        }, 100);
    };
    render();
})();
</script>
