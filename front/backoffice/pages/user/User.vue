<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of users</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(content, 'organization')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.firstname}} {{content.lastname}} 
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Add or modify a user</span>
                    <div slot="body">
                        <fform 
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                        >
                            <finput name="firstname" label="First name" :is-required="true" placeholder="First name" type="text" :form="state.cform" />
                            <finput name="lastname" label="Last name" :is-required="true" placeholder="Last name" type="text" :form="state.cform" />
                            <finput name="email" label="Email address" :is-required="true" placeholder="Email address" type="email" :form="state.cform" />
                            <finput name="address" label="Address" :is-required="true" placeholder="Address" type="text" :form="state.cform" />
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
module.exports = require('./User');
</script>
