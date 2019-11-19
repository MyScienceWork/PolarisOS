<template>
    <div style="width: 100%; margin: auto">
        <iframe style="overflow: hidden;" id="analytics-dashboard" :src="route_dashboard" height="4000px" width="100%"></iframe>
    </div>
</template>

<script>
module.exports = require('./AnalitycsDashboard');
</script>
