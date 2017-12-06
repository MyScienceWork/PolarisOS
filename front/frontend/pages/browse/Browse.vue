<template>
<div class="hero-body">
    <div class="container is-fluid">
        <widget-alternative :stacked="false">
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
