<template>
    <div style="width: 90%; margin: auto">
        <iframe id="analytics-dashboard" :src="route_dashboard" height="1000px" width="100%"></iframe>
    </div>
</template>

<script>
module.exports = require('./AnalitycsDashboard');
</script>
