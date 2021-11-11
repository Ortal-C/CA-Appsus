import mailMainAreaNav from '../cmps/mail-main-area-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
    name:`mail-main-area`,
    template:`
        <section class="mail-main-area">
            <h1>hello!</h1>
            <mail-main-area-nav @filter="setFilter" @sort="setSort" />
            <mail-list :mails="displayMails" :loggedUser="loggedUser" @change="loadMails()"></mail-list>
            
        </section>
    `,
    data(){
        return{

        }
    },
    methods: {
        name() {
            
        },
    },
    computed: {
        name() {
            return this.data 
        }
    },
    components: {
        mailList,
        mailMainAreaNav,
    }
};