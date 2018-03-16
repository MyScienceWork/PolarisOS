const TransFunctions = require('../../../pipeline/transformer/transfunctions');

// 'abstracts.content',
// 'authors'
// 'classifications._id'
// 'contributors'
// 'delivery_institution',
// 'diffusion.internal_collection'
// 'diffusion.projects'
// 'diffusion.anr_projects'
// 'diffusion.european_projects'
// 'diffusion.research_teams'
// 'diffusion.rights.access'
// 'diffusion.rights.license'
// 'diffusion.surveys'
// 'ids'
// 'keywords'
// 'localisation.country'
// 'resources'
// 'translated_titles'
// 'type'
// 'subtype'
// 'depositor'

module.exports = {
    transformers: [{
        collection: TransFunctions.identity(true),
        'denormalization.conference': TransFunctions.identity(true),
        'dates.publication': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.start': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.end': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.deposit': TransFunctions.template_identity('{{moment date=__path}}', true),
        description: TransFunctions.identity(true),
        'diffusion.rights.comment': TransFunctions.identity(true),
        'diffusion.rights.embargo': TransFunctions.template_identity('{{moment date=__path}}', true),
        'denormalization.editor': TransFunctions.identity(true),
        'denormalization.journal': TransFunctions.identity(true),
        newspaper: TransFunctions.identity(true),
        lang: TransFunctions.identity(true),
        'localisation.city': TransFunctions.identity(true),
        number: TransFunctions.identity(true),
        pagination: TransFunctions.identity(true),
        publication_title: TransFunctions.identity(true),
        'subtitles.0.content': TransFunctions.identity(true),
        'title.content': TransFunctions.identity(true),
        volume: TransFunctions.identity(true),
        url: TransFunctions.identity(true),
    },
    {
        collection: TransFunctions.flatten,
        'denormalization.conference': TransFunctions.flatten,
        'dates.publication': TransFunctions.flatten,
        'dates.start': TransFunctions.flatten,
        'dates.end': TransFunctions.flatten,
        'dates.deposit': TransFunctions.flatten,
        description: TransFunctions.flatten,
        'diffusion.rights.comment': TransFunctions.flatten,
        'diffusion.rights.embargo': TransFunctions.flatten,
        'denormalization.editor': TransFunctions.flatten,
        'denormalization.journal': TransFunctions.flatten,
        newspaper: TransFunctions.flatten,
        lang: TransFunctions.flatten,
        'localisation.city': TransFunctions.flatten,
        number: TransFunctions.flatten,
        pagination: TransFunctions.flatten,
        publication_title: TransFunctions.flatten,
        'subtitles.0.content': TransFunctions.flatten,
        'title.content': TransFunctions.flatten,
        volume: TransFunctions.flatten,
        url: TransFunctions.flatten,
    }],
};
