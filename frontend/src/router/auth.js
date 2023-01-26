const { checkNonAuthenticatedUser } = require('./gaurds');
//all authenticated frontend routes
module.exports = [
    {
        path: '/',
        redirect: '/auth/login',
    },
    {
        path: '/auth',
        component: () =>
            import(
                './../pages/auth/auth.vue'
            ),

        children: [
            {
                name: 'login',
                path: 'login/',
                component: () =>
                    import(
                        './../pages/auth/login.vue'
                    ),
                beforeEnter: checkNonAuthenticatedUser
            },
            {
                name: 'register',
                path: 'register/',
                component: () =>
                    import(
                        './../pages/auth/register.vue'
                    ),
                beforeEnter: checkNonAuthenticatedUser
            },
        ]
    }
];