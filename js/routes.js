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
    path: '/mail',
    component: mailApp,
    children: [
      {
        path: ':mailId?',
        component: mailApp,
      },
    ],
  },
  {
    path: '/note',
    component: noteApp,
  },
]

export const router = new VueRouter({ routes })