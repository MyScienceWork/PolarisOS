<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <!--<div class="column is-6">
                <widget-text 
                    form="test_form" 
                    extra-classes="info-card-red"
                    title="Bienvenue sur votre archive ouverte"
                    content="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacus erat, pretium quis laoreet eu, aliquet a mauris. Proin nec urna nec turpis pellentesque molestie. Cras ultricies ligula sed congue posuere. Ut ante sapien, tempus at mollis in, commodo sed ex. Aenean cursus arcu nisi, vitae eleifend dolor suscipit non. Cras et vestibulum ex. Vivamus pharetra nisl eget viverra pellentesque. Fusce cursus sit amet quam sodales condimentum. Curabitur malesuada interdum cursus. Nulla quis nibh vulputate, fringilla justo vitae, pharetra nisi. Cras venenatis tincidunt nibh in auctor. Praesent congue ultrices dapibus.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla sed finibus metus. Aliquam erat volutpat. Ut pharetra tortor vel massa pretium hendrerit. Curabitur sed mattis lorem, eget finibus mauris. Morbi imperdiet sed tortor vitae pulvinar. Cras a facilisis arcu. Vestibulum id sapien accumsan, mattis lectus at, suscipit nibh.</p>"
                >
                </widget-text>
            </div>-->
            <div class="column is-6">
                <widget-list 
                    form="test_form"
                    extra-classes="info-card-orange"
                    :boxed="true"
                    title="Derniers dépôts"
                    type="publication"
                    :small="true"
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
                                <widget-search form="test_form" />
                                <widget-nav form="test_form" />
                            </div>
                        </div>
                    </div>
                </div>
                <widget-browse 
                    :boxed="true"
                    form="test_form"
                    extra-classes="info-card-purple" 
                    title="Découvrir nos collections"
                />
                <widget-stats form="test_form" :infos="[]" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Home');
</script>
