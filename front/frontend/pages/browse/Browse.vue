<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget-search class="is-pulled-right" 
                    :search_url="this.state.pread_path"
                    :redirect_to_search="true"
                    form="test_form" mode="on-side" />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card card-equal-height info-card-purple info-card">
                    <div class="card-content">
                        <category :nav-items="navs" /> 
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card-purple">
                    <search-results />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Browse');
</script>
