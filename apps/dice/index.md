---
title: Yes
---
<style type="text/css">
.dice {
    position: relative;
    width: 10em;
    height: 10em;
    border-radius: 1em;
    background: black;
    margin: 0 auto;
}
.dark .dice {
    background: white;
}
.dice_point {
    position: absolute;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    background: white;
    display: none;
}
.dark .dice_point {
    background: black;
}
.dice_top {
    top: 1em;
}
.dice_middle {
    top: 4em;
}
.dice_bottom {
    top: 7em;
}
.dice_left {
    left: 1em;
}
.dice_center {
    left: 4em;
}
.dice_right {
    left: 7em;
}
.dice.dice_one   .dice_point.dice_one,
.dice.dice_two   .dice_point.dice_two,
.dice.dice_three .dice_point.dice_three,
.dice.dice_four  .dice_point.dice_four,
.dice.dice_five  .dice_point.dice_five,
.dice.dice_six   .dice_point.dice_six {
    display: block
}
</style>
<div id='dice' class='dice'>
    <div class='dice_point dice_top    dice_left   dice_four dice_five dice_six'></div>
    <div class='dice_point dice_middle dice_left   dice_six'></div>
    <div class='dice_point dice_bottom dice_left   dice_two dice_three dice_four dice_five dice_six'></div>
    <div class='dice_point dice_middle dice_center dice_one dice_three dice_five'></div>
    <div class='dice_point dice_top    dice_right  dice_two dice_three dice_four dice_five dice_six'></div>
    <div class='dice_point dice_middle dice_right  dice_six'></div>
    <div class='dice_point dice_bottom dice_right  dice_four dice_five dice_six'></div>
</div>
<script type="text/javascript">
(function () {
    var dice = document.getElementById('dice');
    var dice_classes = [
        'dice_one',
        'dice_two',
        'dice_three',
        'dice_four',
        'dice_five',
        'dice_six'
    ];
    var index = Math.round(Math.random() * 6) % 6;
    dice.className += ' ' + dice_classes[index];
})();
</script>
