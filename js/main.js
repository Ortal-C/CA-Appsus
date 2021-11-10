import appHeader from './cmps/app-header.cmp.js' 
import { router } from './routes.js';

const options = {
    name: 'main',
    el: '#app',
    router,
    template: `
        <section>
            <app-header />
            <router-view />
        </section>
    `,
    components: {
        appHeader,
    }
};

new Vue(options);