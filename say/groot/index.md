---
title: I am Groot!
---
# I am Groot!
<script>
(function () {

var groot_node = document.getElementById("i_am_groot");
var phrase_parts = [
    ["I"],
    [" am ", "'m "],
    ["Groot", "Grooot", "Grooooot", "Grooooooot", "Grooooooooooot"],
    ["", "!", "!!!", "?", "?!", "..."]
];

function groot() {
	var text = [];
	for (var i = 0; i < phrase_parts.length; i++) {
	    var part = phrase_parts[i];
	    text.push(part[Math.floor(Math.random() * part.length) % part.length]);
	}
	text = text.join("");
	if (Math.random() < 0.3) {
		text = text.toUpperCase();
	}
	groot_node.innerHTML = text;
}

groot();

groot_node.onclick = groot;
groot_node.style.cursor = 'pointer';

})();
</script>
