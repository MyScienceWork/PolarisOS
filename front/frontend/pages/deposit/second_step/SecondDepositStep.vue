<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <fform
                    :name="state.cform" 
                    :post_path="state.path" 
                    :put_path="state.path"
                    :get_path="state.rpath"
                    :get_form="state.rform"
                >
                    <dynamic-form :form="final_form" :cform="state.cform" />
                </fform>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./SecondDepositStep');
</script>
