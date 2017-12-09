<template>
    <div>
        <vue-dropzone class="dropzone pos-dropzone" ref="dropzone" :options="dropzone" :include-styling="false">
            <div slot="inside">
                <div class="dz-message">
                    Test test test
                </div>
            </div>
        </vue-dropzone>
    </div>
</template>

<script>
    module.exports = require('./Dropzone');
</script>
