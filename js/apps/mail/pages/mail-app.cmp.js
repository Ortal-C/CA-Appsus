//Mail home-page
import { mailService } from '../services/mail-service.js';
import mailList from '../cmps/mail-list.cmp.js'
import mailMainNav from '../cmps/mail-main-nav.cmp.js'

export default {
    name: 'mail',
    template: `
        <section class="mail-app main-app flex">
            <mail-main-nav @filtered="setFilter"></mail-main-nav>
            <main class="mail-main-area">
            <router-view />
                <nav class="flex space-between">
                    <a href="#">Filter</a>
                    <a href="#">Sort by</a> 
                    <!-- ALL NONE READ UNREAD STARRED UNSTARED -->
                </nav>
                <mail-list :mails="displayMails"></mail-list>
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: 'inbox',
        }
    },
    created() {
        this.loadMails();
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        displayMails() {
            let mailsToShow;
            switch (this.filterBy) {
                case 'inbox':
                    mailsToShow = this.mails.filter(mail => mail.to === mailService.getLoggedUser().mail)
                    break;
                case 'starred':
                    mailsToShow = this.mails.filter(mail => mail.isStarred)
                    break;
                case 'sent':
                    mailsToShow = this.mails.filter(mail => mail.from === mailService.getLoggedUser().mail)
                    break;
                case 'drafts':
                    break;
                case 'trash':
                    break;
            }
            return mailsToShow;
        },
    },
    components: {
        mailMainNav,
        mailList,
    },
};