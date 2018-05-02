const Home = require('../frontend/pages/home/Home.vue');
const Deposit = require('../frontend/pages/deposit/Deposit.vue');
const Browse = require('../frontend/pages/browse/Browse.vue');
const Search = require('../frontend/pages/search/Search.vue');
const View = require('../frontend/pages/view/View.vue');
const Project = require('../frontend/pages/project/Project.vue');
const About = require('../frontend/pages/about/About.vue');
const Help = require('../frontend/pages/help/Help.vue');
const News = require('../frontend/pages/news/News.vue');
const Events = require('../frontend/pages/events/Events.vue');
const NewsPage = require('../frontend/pages/news/NewsPage.vue');
const ForumDiscussion = require('../frontend/pages/forum/ForumDiscussion.vue');
const ForumThread = require('../frontend/pages/forum/Forum.vue');
const USPCUserProfile = require('../frontend/pages/user_profile/USPCUserProfile.vue');
const UserFavorites = require('../frontend/pages/user_favorites/UserFavorites.vue');
const LoginView = require('../frontend/pages/login/Login.vue');

module.exports = {
    '/': News,
    '/browse': Browse,
    '/search': Search,
    '/project': Project,
    '/view/:id': View,
    '/u/:id/profile': USPCUserProfile,
    '/a/:id/profile': USPCUserProfile,
    '/deposit': Deposit,
    '/about': About,
    '/help': Help,
    '/news': News,
    '/news/:id': NewsPage,
    '/events': Events,
    '/events/:id': Events,
    '/forum': ForumDiscussion,
    '/forum/thread/:id': ForumThread,
    '/login': LoginView,
};
