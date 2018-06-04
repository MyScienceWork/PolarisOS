const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const moment = require('moment');
const Crypto = require('crypto');

module.exports = {
    mixins: [],
    props: {
    },

    data() {
        return {
            state: {
                tree: {
                    0: {},
                },
            },
        };
    },

    methods: {
        add_element(path, e) {
            e.preventDefault();
        },
        remove_element(path, e) {
            e.preventDefault();
        },
        move_up(path) {

        },
        move_down(path) {

        },
    },

    watch: {
    },
    computed: {
    },
    mounted() {
    },
};
