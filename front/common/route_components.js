const Home = require('../frontend/pages/home/Home.vue');
const Deposit = require('../frontend/pages/deposit/Deposit.vue');
const DepositProject = require('../frontend/pages/deposit_project/DepositProject.vue');
const Browse = require('../frontend/pages/browse/Browse.vue');
const ListForWebsite = require('../frontend/pages/list_for_website/ListForWebsite.vue');
const Search = require('../frontend/pages/search/Search.vue');
const SearchResearchTrials = require('../frontend/pages/searchResearchTrials/SearchResearchTrials.vue');
const View = require('../frontend/pages/view/View.vue');
const Project = require('../frontend/pages/project/Project.vue');
const About = require('../frontend/pages/about/About.vue');
const Help = require('../frontend/pages/help/Help.vue');
const News = require('../frontend/pages/news/News.vue');
const Events = require('../frontend/pages/events/Events.vue');
const NewsPage = require('../frontend/pages/news/NewsPage.vue');
const EventPage = require('../frontend/pages/events/EventPage.vue');
const NewEvent = require('../frontend/pages/events/NewEvent.vue');
const NewResearchTrial = require('../frontend/pages/searchResearchTrials/NewResearchTrial.vue');
const ForumDiscussion = require('../frontend/pages/forum/ForumDiscussion.vue');
const ForumThread = require('../frontend/pages/forum/Forum.vue');
const ForumNewSubject = require('../frontend/pages/forum/ForumNewSubject.vue');
const UserProfile = require('../frontend/pages/user_profile/UserProfile.vue');
const UserList = require('../frontend/pages/user_list/UserList.vue');
const LoginView = require('../frontend/pages/login/Login.vue');
const LoginChoiceView = require('../frontend/pages/login_choice/LoginChoice.vue');
const CreateNews = require('../frontend/pages/news/CreateNews.vue');


module.exports = {
    home: Home,
    browse: Browse,
    search: Search,
    search_research_trials: SearchResearchTrials,
    project: Project,
    view: View,
    user_profile: UserProfile,
    deposit: Deposit,
    deposit_project: DepositProject,
    about: About,
    help: Help,
    news: News,
    single_news: NewsPage,
    events: Events,
    single_event: EventPage,
    create_event: NewEvent,
    create_news: CreateNews,
    create_research_trial: NewResearchTrial,
    forum: ForumDiscussion,
    forum_thread: ForumThread,
    create_forum_subject: ForumNewSubject,
    login: LoginView,
    login_choice: LoginChoiceView,
    user_list: UserList,
    list: ListForWebsite,
};
