export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      // Routes: ['src/pages/Authorized'],
      routes: [
        { path: '/', redirect: '/firstpage' },
        {
          path: '/firstpage',
          routes: [
            { path: '/firstpage', component: './firstpage',},
          ]
        },
        {
          path: '/user',
          routes: [
              { path: '/user', component: './user',},
          ]
        },
      ],
    },
  ]
}
