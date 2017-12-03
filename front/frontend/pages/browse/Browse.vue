<template>
<div class="hero-body">
    <div class="container is-fluid">
        <widget-alternative :stacked="true">
            <div slot="first-part" class="card card-equal-height info-card info-card-purple">
                <div class="card-content">
                    <widget-search form="test_form" />
                </div>
            </div>
            <div slot="second-part" class="card card-equal-height info-card-purple info-card">
                <div class="card-content">
                    <widget-browse form="test_form" extra-classes="indexer-purple button-purple" />
                </div>
            </div>
        </widget-alternative>
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
