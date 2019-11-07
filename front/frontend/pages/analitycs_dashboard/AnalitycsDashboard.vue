<template>
    <div style="width: 100%; margin: auto">
        <iframe id="analytics-dashboard" :src="route_dashboard" height="1800px" width="100%"></iframe>
    </div>
</template>

<script>
module.exports = require('./AnalitycsDashboard');
</script>
