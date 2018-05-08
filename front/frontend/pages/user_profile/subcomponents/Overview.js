const LangMixin = require('../../../../common/mixins/LangMixin');
const OAMixin = require('../../../../common/mixins/ObjectAccessMixin');

const SocialIcon = require('./SocialIcon.vue');

module.exports = {
    mixins: [LangMixin, OAMixin],
    props: {
        author: { type: Object, required: true },
    },
    components: {
        SocialIcon,
    },
    computed: {
        socials() {
            const orcid = this._oa_find(this.author, 'external.orcid');
            const ids = ['skype', 'website', 'twitter', 'linkedin'].map((i) => {
                const my_id = this._oa_find(this.author, `external.${i}`);
                let icon = `fa-${i}`;

                if (i === 'website') {
                    icon = 'fa-globe';
                }

                if (my_id) {
                    return { id: my_id, icon, url: '', hasUrl: false };
                }
                return null;
            }).filter(f => f != null);

            if (orcid) {
                ids.push({ id: orcid,
                    url: `https://orcid.org/${orcid}`,
                    img: '/public/front/imgs/icons/orcid.png',
                    hasUrl: true,
                    icon: '' });
            }

            return ids;
        },
    },
};
