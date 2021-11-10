import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'

//mailApp routes
import mailApp from './apps/mail/pages/mail-app.cmp.js'

//noteApp routes
import noteApp from './apps/note/pages/note-app.cmp.js'

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/mail',
    component: mailApp,
    // children: [
    //   {
    //     path: 'inbox',
    //     component: inbox,
    //   },
    //   {
    //     path: 'starred',
    //     component: starred,
    //   },
    //   {
    //     path: 'sent',
    //     component: sent,
    //   },
    //   {
    //     path: 'drafts',
    //     component: drafts,
    //   },
    //   {
    //     path: 'trash',
    //     component: trash,
    //   },
    // ],
  },
  {
    path: '/note',
    component: noteApp,
  },
  // {
  //   path: '/car/:carId?/edit',
  //   component: carEdit,
  // },
  // {
  //   path: '/car/:carId',
  //   component: carDetails,
  // },
]

export const router = new VueRouter({ routes })