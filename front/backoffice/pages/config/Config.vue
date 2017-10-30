<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Global configuration</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Add or modify the global configuration</span>
                    <div slot="body">
                        <fform 
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                        >
                            <finput name="environment" label="First name" :is-required="true" placeholder="First name" type="text" :form="state.cform" />
                            <finput name="lastname" label="Last name" :is-required="true" placeholder="Last name" type="text" :form="state.cform" />
                            <finput name="email" label="Email address" :is-required="true" placeholder="Email address" type="email" :form="state.cform" />
                            <finput name="password" label="Password" :is-required="true" placeholder="Password" type="password" :form="state.cform" />
                            <finput name="retype_password" label="Retype Password" :is-required="true" placeholder="Retype your password" type="password" :form="state.cform" />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Config');
</script>
