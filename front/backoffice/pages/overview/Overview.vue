<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-6">
                <widget>
                    <span slot="title">Number of deposits per month over 2017</span>
                    <div slot="body" id="chart_1">
                    </div>
                </widget>
            </div>
            <div class="column is-6">
                <widget>
                    <span slot="title">Type of accesses</span>
                    <div slot="body" id="chart_2">
                        
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Repartition of publishing authors per country in Europe</span>
                    <div slot="body" id="chart_3">
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Overview');
</script>
