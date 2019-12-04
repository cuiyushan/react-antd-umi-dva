export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      // Routes: ['src/pages/Authorized'],
      routes: [
        { path: '/', redirect: '/dataTransfer' },
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
