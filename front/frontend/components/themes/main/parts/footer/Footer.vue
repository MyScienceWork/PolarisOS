<template>
<div class="hero-foot">
    <footer>
        <div class="columns footer-disclaimer is-centered">
            <div class="row">
                <div class="column">
                    <a href="https://www.france-bioinformatique.fr/en" target="_blank"><img style="width:150px;height:70px;" src="/public/front/imgs/footers/logo_ifb.png" alt="Logo IFB"/></a>
                    <img style="width:150px;height:70px;" src="/public/front/imgs/footers/logo_inserm.png" alt="Logo Inserm"/>
                    <img style="width:300px;height:70px;" height="60px" src="/public/front/imgs/footers/logo_ejp.png" alt="Logo EJP"/>
                </div>
            </div>
            <div class="row">
                <div class="column has-vertically-aligned-content" style="height:100%">
                    <div class="row">
                        <img style="width:60px;height:35px;" src="/public/front/imgs/footers/logo_europe.png" alt="Logo Europe"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column has-vertically-aligned-content" style="width:300px;height:100%">
                    <div class="row">
                        <p style="font-size:8px">This web service is funded by the European Union through the European Joint Programme on Rare Disease under the European Union’s Horizon 2020 research and innovation programme Grant Agreement N°825575.</p>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-bottom: -10px;" class="columns footer-disclaimer is-centered">
            <div class="row">
                <div class="column">
                    <a href="https://www.mysciencework.com/" target="_blank">
                        <span v-html="lang('l_footer_disclaimer')"></span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
    module.exports = require('./Footer');
</script>
