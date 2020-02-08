<?php require_once 'inc/header.php'; ?>
<h1 class="main-header">Getting Started</h1>
<h2 class="sec-header">What is Custom Context?</h2>
<p class="desc">
    Custom Context is a Library which add to canvas 2d context a shortcuts for common functionality, as well as adding an advanced functionality.<br/>
    The library not gives you a new object, but add a new functions to the prototype of the existing context - in the case you want it.
</p>
<h2 class="sec-header">Installation</h2>
<p class="desc">
    To add the library to your project, download the js file from
    <a href="https://yoseftuk.github.io/custom-context/dist/custom-context.js" download="custom-context.js">here</a>.
    then include it in the header of your file.<br/>
    Alternative, you can use the following cdn:
</p>
<?php jscode('&lt;script src="https://yoseftuk.github.io/custom-context/dist/custom-context.js">&lt/script>') ?>
<h2 class="sec-header">Getting The custom context object</h2>
<p class="desc">For be able to use the new functionality of the context, when creating the context use this:</p>
<?php jscode('
var canvas = document.querySelector(\'canvas\');<br/>
var ctx = canvas.getCustomContext();') ?>
<p>The "ctx" variable is a Canvas2DRenderingContext object, which include all the library functionality in its prototype!</p>

<?php require_once 'inc/footer.php'; ?>

