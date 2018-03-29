const _ = require('lodash');
const Auth = require('../utils/auth');

module.exports = {
    computed: {
        user() {
            const u = Auth.user();
            if (u.firstname && u.lastname) {
                u.firstName = u.firstname;
                u.lastName = u.lastname;
                u.fullname = `${u.firstname} ${u.lastname}`;
                u.fullName = u.fullname;
            }
            return u;
        },
        author() {
            return (this.user ? this.user.author : null);
        },
        avatar() {
            if (this.author && this.author.avatar && this.author.avatar.trim() !== '') {
                return `/public/front/imgs/avatars/${this.author.avatar}`;
            }
            return '/public/front/imgs/icons/person-placeholder.png';
        },
    },
    methods: {
    },
};
