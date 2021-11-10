import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import noteApp from './apps/keep/pages/note-app.cmp.js'
// import carDetails from './pages/car-details.cmp.js'
// import carSurvey from './pages/car-survey.cmp.js'
// import carEdit from './pages/car-edit.cmp.js'

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
    // children: [
    //   {
    //     path: 'team',
    //     component: aboutTeam,
    //   },
    //   {
    //     path: 'service',
    //     component: aboutService,
    //   },
    // ],
  },
  {
    path: '/mail',
    component: mailApp,
  },
  {
    path: '/keep',
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