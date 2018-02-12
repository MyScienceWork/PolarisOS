<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <widget-list 
                    form="test_form"
                    extra-classes="info-card-orange"
                    :boxed="true"
                    :title="lang('l_projects')"
                    type="project"
                    :small="true"
                    :items="items"
                />
            </div>
        </div>
        <!--<div class="columns is-centered">
            <div class="column">
                <div class="card info-card info-card-red">
                    <header class="card-header">
                    <p class="card-header-title">{{lang('l_search')}}</p>
                    </header>
                    <div class="card-content">
                        <widget-search 
                        form="test_form" 
                        mode="small" 
                        :search_url="this.state.pread_path"
                        :redirect_to_search="false"
                        />
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Project');
</script>
