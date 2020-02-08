<?php
require_once 'fragments.php';
$uri = explode('/', $_SERVER["REQUEST_URI"]);
do {
    $path = array_pop($uri);
} while (!$path || $path === false);
$path = preg_replace("/\.php$/", "", $path);
if ($path === 'dist') $path = 'index';
function active_link($require_path) {
    global $path;
    return $require_path === $path ? 'class="active"' : '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Custom Canvas | Docs</title>
    <link rel="stylesheet" type="text/css" href="./index.css"/>
    <script src="./main.js" defer></script>
</head>
<body>
<header>
    <h1>Custom Canvas Documentation</h1>
</header>
<div id="main-container">
    <aside>
        <ul id="aside-menu">
            <li class="aside-menu__item" ><a <?= active_link('index') ?> href="#">Getting Started</a></li>
            <li class="aside-menu__item" ><a <?= active_link('shapes') ?> href="#">Shapes</a></li>
            <li class="aside-menu__item" ><a <?= active_link('image-drawing') ?> href="#">Image Drawing</a></li>
            <li class="aside-menu__item" ><a <?= active_link('image-filters') ?> href="#">Image Filters</a></li>
            <li class="aside-menu__item" ><a <?= active_link('hot-spots') ?> href="#">Hot Spots</a></li>
            <li class="aside-menu__item" ><a <?= active_link('animations') ?> href="#">Animations</a></li>
            <li class="aside-menu__item" ><a <?= active_link('video-record') ?> href="#">Video Record</a></li>
        </ul>
    </aside>
    <main>
