const { checkAuthenticatedUser } = require('./gaurds');
//chat frontend routes
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