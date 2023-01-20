const { checkAuthenticatedUser } = require('./gaurds');

module.exports = [
    {
        path: '/chat',
        component: () =>
        import(
            './../pages/chat/chat.vue'
        ),
        beforeEnter: checkAuthenticatedUser
    },
];