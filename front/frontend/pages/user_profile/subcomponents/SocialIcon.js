module.exports = {
    props: {
        hasImage: { default: false, type: Boolean },
        imgUrl: { default: '', type: String },
        hasUrl: { default: false, type: Boolean },
        url: { default: '', type: String },
        socialId: { required: true, type: String },
    },
};
