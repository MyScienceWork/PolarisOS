<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10">
                <widget-nav form="test_form" />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10">
                <widget-browse form="test_form" extra-classes="indexer-purple button-purple" />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-pulled-right">
                <b-dropdown>
                    <button class="button " slot="trigger">
                        <span>Export</span>
                        <b-icon icon="caret-down"></b-icon>
                        </button>

                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <widget-list extra-classes="info-card-purple" form="test_form" type="publication" :boxed="false" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Browse');
</script>
