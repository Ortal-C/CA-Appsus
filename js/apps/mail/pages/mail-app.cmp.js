//Mail home-page
import { mailService } from '../services/mail-service.js';
import mailList from '../cmps/mail-list.cmp.js'
import mailMainNav from '../cmps/mail-main-nav.cmp.js'
import mailMainAreaNav from '../cmps/mail-main-area-nav.cmp.js'

export default {
    name: 'mail',
    template: `
        <section class="mail-app main-app flex">
            <mail-main-nav @directory="setDirectory"></mail-main-nav>
            <main class="mail-main-area">
                <mail-main-area-nav @filter="setFilter"></mail-main-area-nav>
                <nav class="flex space-between">
                    
                    <!-- sort-alpha-down-alt , sort-alpha-up-alt -->
                    <!-- sort-numeric-down-alt , sort-numeric-up-alt -->
                    <a href="#">Sort by</a> 
                    <!-- ALL NONE READ UNREAD STARRED UNSTARED -->
                </nav>
                <mail-list :mails="displayMails" :loggedUser="loggedUser" @change="loadMails()"></mail-list>
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            directory: 'inbox',
            filterBy: 'all',
            loggedUser: mailService.getLoggedUser(),
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
        setDirectory(directory){
            this.directory = directory
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        displayMails() {
            let mailsToShow = this.mails;
            switch (this.directory) {
                case 'inbox':
                    mailsToShow = this.mails.filter(mail => mail.to === this.loggedUser.mail)
                    break;
                case 'starred':
                    mailsToShow = this.mails.filter(mail => mail.isStarred)
                    break;
                case 'sent':
                    mailsToShow = this.mails.filter(mail => mail.from === this.loggedUser.mail)
                    break;
                case 'drafts':
                    break;
                case 'trash':
                    break;
            }
            switch (this.filterBy) {
                case 'starred':
                    mailsToShow = this.mails.filter(mail => mail.isStarred)
                    break;
                case 'read':
                    mailsToShow = this.mails.filter(mail => mail.isRead)
                    break;
                case 'unread':
                    mailsToShow = this.mails.filter(mail => !mail.isRead)
                    break;
                case 'unstarred':
                    mailsToShow = this.mails.filter(mail => !mail.isStarred)
                    break;
                default:
                    break;
            }
            return mailsToShow;
        },
    },
    components: {
        mailMainNav,
        mailList,
        mailMainAreaNav,
    },
};