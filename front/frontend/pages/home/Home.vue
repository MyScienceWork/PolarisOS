<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-6">
                <widget-list 
                    form="test_form"
                    extra-classes="info-card-orange"
                    :boxed="true"
                    title="Derniers dépôts"
                    type="publication"
                    :small="true"
                    :items="items"
                />
            </div>
            <div class="column">
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">Rechercher</p>
                            </header>
                            <div class="card-content">
                                <widget-search 
                                form="test_form" 
                                mode="small" 
                                :search_url="this.state.pread_path"
                                :redirect_to_search="true"
                                />
                                <hr />
                                <div class="columns is-centered">
                                    <div class="column">
                                        <widget-nav form="test_form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <widget-browse 
                            :boxed="true"
                            form="test_form"
                            extra-classes="info-card-purple" 
                            title="Découvrir nos collections"
                        />
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <widget-stats form="test_form" :infos="[]" />
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <hierarchical-structure /> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Home');
</script>
