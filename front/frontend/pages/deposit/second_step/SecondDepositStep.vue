<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered">
                    <div class="column has-text-centered is-8">
                        <h4 class="title is-4">{{lang('f_deposit_'+subform+'_step')}}</h4>
                        <p v-html="lang('f_deposit_'+subform+'_step_help')"></p>
                    </div>
                </div>
                <fform
                    :name="state.cform" 
                    :post_path="state.path" 
                    :put_path="state.path"
                    :get_path="state.rpath"
                    :get_form="state.rform"
                    :has-buttons="false"
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
