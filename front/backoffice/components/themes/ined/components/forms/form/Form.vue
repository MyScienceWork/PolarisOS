<template>
<form @submit.prevent="submit">
    <div class="row" v-if="error.found">
        <div class="col-md-12">
            <div class="alert alert-danger alert-custom alert-dismissible" role="alert">
                <i class="fa fa-times-circle m-right-xs"></i> <strong>An error occured -</strong> {{error.content.message}}.
            </div>
        </div>
    </div>
        <slot></slot>
        <div class="row">
            <div class="form-group">
                <div class="col-md-12">
                    <button class="btn btn-success" v-if="loading">
                        <i class="fa fa-spinner fa-spin m-right-xs"></i>
                        Loading
                    </button>
                    <button v-else
                        type="submit" @click="submit"
                        class="btn btn-success"
                        >{{state.update_mode ? 'Modify' : 'Save'}}</button>
                    <button type="submit" @click="cancel" class="marginLR-md btn btn-danger">Cancel</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    module.exports = require('./Form');
</script>
