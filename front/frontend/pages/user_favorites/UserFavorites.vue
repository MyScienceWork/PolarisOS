<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-6">
                <widget-text 
                    form="test_form" 
                    extra-classes="info-card-red"
                    title="Bienvenue sur votre archive ouverte"
                    content="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacus erat, pretium quis laoreet eu, aliquet a mauris. Proin nec urna nec turpis pellentesque molestie. Cras ultricies ligula sed congue posuere. Ut ante sapien, tempus at mollis in, commodo sed ex. Aenean cursus arcu nisi, vitae eleifend dolor suscipit non. Cras et vestibulum ex. Vivamus pharetra nisl eget viverra pellentesque. Fusce cursus sit amet quam sodales condimentum. Curabitur malesuada interdum cursus. Nulla quis nibh vulputate, fringilla justo vitae, pharetra nisi. Cras venenatis tincidunt nibh in auctor. Praesent congue ultrices dapibus.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla sed finibus metus. Aliquam erat volutpat. Ut pharetra tortor vel massa pretium hendrerit. Curabitur sed mattis lorem, eget finibus mauris. Morbi imperdiet sed tortor vitae pulvinar. Cras a facilisis arcu. Vestibulum id sapien accumsan, mattis lectus at, suscipit nibh.</p>"
                >
                </widget-text>
            </div>
            <div class="column is-6">
                <div class="columns is-centered">
                    <div class="column">
                        <widget-search form="test_form" />
                    </div>
                </div>
                <widget-browse 
                    :boxed="true"
                    form="test_form"
                    extra-classes="info-card-purple" 
                    title="Découvrir"
                />
            </div>
        </div>
        <div class="columns">
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
            <div class="column is-6">
                <fvariadic-element name="test" form="test_form" :single="true" :is-required="true">
                    <template slot="variadic" slot-scope="props">
                        <finput label="test" placeholder="test" name="test" type="text" :has-addons="true" form="test_form">
                            <template slot="input-addons">
                                <fselect 
                                    :options="[{label: 'French', value: 'FR'}, {label: 'English', value: 'EN'}]"
                                    name="test2"
                                    slot="input-addons"
                                    placeholder="Choisissez une langue"
                                    form="test_form"
                                />
                                <div class="control">
                                    <a class="button is-info" @click="props.add">+</a>
                                </div>
                                <div class="control">
                                    <a class="button is-info" @click="props.remove(props.id, $event)">-</a>
                                </div>
                            </template>
                        </finput>
                    </template>
                </fvariadic-element>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./UserFavorites');
</script>
