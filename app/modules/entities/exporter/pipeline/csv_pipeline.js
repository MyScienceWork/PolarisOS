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
        'dates.publication': TransFunctions.template_identity('{{moment date=.}}', true),
        'dates.start': TransFunctions.template_identity('{{moment date=.}}', true),
        'dates.end': TransFunctions.template_identity('{{moment date=.}}', true),
        'dates.deposit': TransFunctions.template_identity('{{moment date=.}}', true),
        description: TransFunctions.identity(true),
        'diffusion.rights.comment': TransFunctions.identity(true),
        'diffusion.rights.embargo': TransFunctions.template_identity('{{moment date=.}}', true),
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
    }],
};
