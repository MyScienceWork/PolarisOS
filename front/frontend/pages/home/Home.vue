<template>
    <div>
        <alpha-pad primary-color='#E60019' key-classes='h5' :on-key-change="onKeyChange" />
        <alpha-num-pad primary-color='#E60019' key-classes='h5' :on-key-change="onKeyChange" />
        <phone-pad primary-color='#E60019' key-classes='h5' :on-key-change="onKeyChange" />
        <email-pad primary-color='#E60019' key-classes='h5' :on-key-change="onKeyChange" />
        <p>{{state.value}}</p>
    </div>
    </template>

<script>
module.exports = require('./Home');
</script>
