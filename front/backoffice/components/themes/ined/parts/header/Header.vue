<template>
<div>
    <div class="container is-fluid">
        <div class="tile is-ancestor">
            <div class="tile is-parent is-2 is-vertical is-hidden-touch">
                <div class="image tile is-child is-16by9">
                    <img src='/public/front/imgs/logo/logo.svg' alt='Logo' title='App Logo' />
                </div>
            </div>
            <div class="tile is-vertical">
            </div>
            <div class="tile is-parent is-2 is-vertical">
                <p class="tile is-child">
                <a href='#'>Log In / Sign In</a>
                </p>
                <p class="tile is-child">
                <a href='#'>FR</a>&nbsp;|&nbsp;<a href='#'>EN</a>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Header');
</script>
