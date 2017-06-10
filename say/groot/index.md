---
title: I am Groot!
---
<h1 id="groot">I am Groot!</h1>
<script>
(function () {

var groot_node = document.getElementById("groot");
var phrase_parts = [
    ["I"],
    [" am ", "'m "],
    ["Groot", "Grooot", "Grooooot", "Grooooooot", "Grooooooooooot"],
    ["", "!", "!!!", "?", "?!", "..."]
];

var text = [];
for (var i = 0; i < phrase_parts.length; i++) {
    var part = prase_parts[i];
    text.push(part[Math.floor(Math.random() * part.length)]);
}

groot_node.innerHTML = text.join("");

})();
</script>
