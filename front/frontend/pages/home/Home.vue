<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-6">
                <card color="orange" class="card-equal-height">
                    <template slot="card-title">
                        {{lang('l_last_deposits')}}
                    </template>
                    <last-deposits :items="items" slot="card-content" />
                </card>
            </div>
            <div class="column is-6">
                <card color="red" class="card-equal-height">
                    <template slot="card-title">
                        {{lang('l_discover')}}
                    </template>
                    <search slot="card-content" />
                    <hr />
                    <discovery :nav-items="navs" slot="card-content" />
                </card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Home');
</script>
