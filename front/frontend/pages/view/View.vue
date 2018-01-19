<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-8">
                <div class="card card-equal-height">
                    <div class="card-content content">
                        <h3 class="title is-3">Deeper syntax for better semantic parsing</h3>
                        <p><strong>Olivier Michalon<sup>1</sup></strong>, <strong>Corentin Ribeyre<sup>2</sup></strong>, <strong>Marie Candito<sup>3</sup></strong>, <strong>Alexis Nasr<sup>1</sup></strong></p>
                        <ol>
                            <li>LIF - Laboratoire d'informatique fondamentale de Marseille</li>
                            <li>Département de Linguistique - Université de Genève</li>
                            <li>ALPAGE - Analyse Linguistique Profonde à Grande Echelle</li>
                        </ol>
                        <div class="card">
                            <div class="card-content">
                                <h4 class="subtitle is-5"><strong>{{lang('f_abstract')}}</strong></h4>
                                <p>
                                    Syntax plays an important role in the task of predicting the semantic structure of a sentence. But syntactic phenomena such as alternations, control and raising tend to obfuscate the relation between syntax and semantics. In this paper we predict the semantic structure of a sentence using a deeper syntax than what is usually done. This deep syntactic representation abstracts away from purely syntactic phenomena and proposes a structural organization of the sentence that is closer to the semantic representation. Experiments conducted on a French corpus annotated with semantic frames showed that a semantic parser reaches better performances with such a deep syntactic input. 
                                </p>
                            </div>
                        </div>
                        <p></p>
                        <p><strong v-html="lang('f_publication_type')"></strong> Communication dans un congrès</p>
                        <p>Coling 2016 - 26th International Conference on Computational Linguistics, Dec 2016, Osaka, Japan. The 26th International Conference on Computational Linguistics Proceedings of COLING 2016: Technical Papers, 2016</p>
                        <p><strong v-html="lang('f_publication_id')"></strong> ark:tt:12342432fezfe</p>
                        <p><a class="has-text-info" href=''>{{lang('f_see_more_metadata')}}</a></p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_file')}}</p>
                            </header>
                            <div class="card-content has-text-centered">
                                <a class="swap" href=''>{{lang('f_click_here_to_download')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_license')}}</p>
                            </header>
                            <div class="card-content">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_citation')}}</p>
                            </header>
                            <div class="card-content">
                                <p>Olivier Michalon, Corentin Ribeyre, Marie Candito, Alexis Nasr. <strong>Deeper syntax for better semantic parsing</strong>. <i>Coling 2016 - 26th International Conference on Computational Linguistics, Dec 2016, Osaka, Japan.</i> The 26th International Conference on Computational Linguistics Proceedings of COLING 2016: Technical Papers, 2016.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_share')}}</p>
                            </header>
                            <div class="card-content has-text-centered">
                                <a class="icon facebook-color is-large">
                                    <i class="fa fa-facebook-official fa-2x"></i>
                                </a>
                                <a class="icon twitter-color is-large">
                                    <i class="fa fa-twitter fa-2x"></i>
                                </a>
                                <a class="icon linkedin-color is-large">
                                    <i class="fa fa-linkedin fa-2x"></i>
                                </a>
                                <a class="swap icon is-large">
                                    <i class="fa fa-envelope fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./View');
</script>
