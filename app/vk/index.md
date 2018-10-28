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

<script src="snowball.min.js" type="text/javascript"></script>
<script src="vk.js" type="text/javascript"></script>

# VK

<div id="form">
    <div id="login_form">
        <input type="button" value="Login" onclick="onLoginClick()" />
    </div>
    <div id="loading_form" style="display: none">
        <span>Loading...</span><br>
        <span>It could take about 5 minutes</span>
    </div>
    <p id="status_form" style="text-align: center"></p>
    <p>
        <form id="query_form" style="display: none" onsubmit="return onSearchClick();">
            <input type="text" id="query" placeholder="Query" />
            <input type="submit" value="Search" />
        </form>
    </p>
</div>
<div id="result">
</div>
