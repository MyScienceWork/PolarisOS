<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns">
                    <div class="column">
                        <fform
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                        <dynamic-form :form="form" :cform="state.cform" />
                        </fform>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./SecondDepositStep');
</script>
