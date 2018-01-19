<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card info-card-red">
                    <header class="card-header">
                        <p class="card-header-title">{{lang('f_general_information', {}, 'other')}}</p>
                    </header>
                    <div class="card-content">
                        <p v-html="lang('f_general_explanation_user_profile')"></p>
                        <hr />
                        <fform
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                            <dynamic-form v-if="state.forms.fname in forms" :form="forms[state.forms.fname]" :cform="state.cform" />
                        </fform>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card info-card-red">
                    <header class="card-header">
                        <p class="card-header-title">{{lang('f_affiliation', {}, 'other')}}</p>
                    </header>
                    <div class="card-content">
                        <p v-html="lang('f_affiliations_explanation_user_profile')"></p>
                        <hr />
                        <fform
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                            <dynamic-form v-if="'user_affiliations' in forms" :form="forms.user_affiliations" :cform="state.cform" />
                        </fform>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./UserProfile');
</script>
