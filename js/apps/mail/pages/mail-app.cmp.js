//Mail home-page
import { mailService } from '../services/mail-service.js';
import { eventBus } from '../../../services/event-bus-service.js'
import mailMainNav from '../cmps/mail-main-nav.cmp.js'
import mailMainAreaNav from '../cmps/mail-main-area-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'

export default {
    name: 'mail-app',
    template: `
        <section class="mail-app main-app flex">
            <mail-main-nav @directory="setDirectory" @compose="composeMail"/>
            <main class="mail-main-area">
                <section v-if="!this.$route.params.mailId">
                    <mail-main-area-nav @sort="setSort" @filter="setFilter"></mail-main-area-nav>
                    <mail-list :mails="displayMails" :loggedUser="loggedUser" @change="loadMails"></mail-list>
                </section>
                <section v-else>
                    <mail-details @change="loadMails"></mail-details>
                </section>
            </main>
        </section>
    `,
    data() {
        return {
            loggedUser: mailService.getLoggedUser(),
            mails: [],
            directory: 'inbox',
            filterBy: 'all',
            sortedBy: 'dateNTO',
        }
    },
    created() {
        this.loadMails();
    },
    methods: {
        loadMails(msg) {
            mailService.query()
                .then(mails => {
                    this.mails = mails;
                    this.sortMails();
                });
            if (msg) eventBus.$emit('showMsg', {txt: msg, type: 'success'})
        },
        sortMails() {
            switch (this.sortedBy) {
                case 'dateNTO':
                    this.mails = this.mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt);
                    break;
                case 'dateOTN':
                    this.mails = this.mails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt);
                    break;
                case 'titleAO':
                    this.mails = this.mails.sort((mail1, mail2) => mail1.subject.toLowerCase() >= mail2.subject.toLowerCase() ? 1 : -1);
                    break;
                case 'titleDO':
                    this.mails = this.mails.sort((mail1, mail2) => mail2.subject.toLowerCase() >= mail1.subject.toLowerCase() ? 1 : -1);
                    break;
                default: break
            }
        },
        filterMails() {
            let mailsToFilter = this.mails;
            switch (this.filterBy) {
                case 'starred':
                    mailsToFilter = this.mails.filter(mail => mail.criteria.isStarred)
                    break;
                case 'read':
                    mailsToFilter = this.mails.filter(mail => mail.criteria.isRead)
                    break;
                case 'unread':
                    mailsToFilter = this.mails.filter(mail => !mail.criteria.isRead)
                    break;
                case 'unstarred':
                    mailsToFilter = this.mails.filter(mail => !mail.criteria.isStarred)
                    break;
                default:
                    if (['all', ''].includes(this.filterBy)) break;
                    mailsToFilter = this.mails.filter(mail => this.isMailIncludeStr(mail, this.filterBy))
                    break;
            }
            return mailsToFilter
        },
        setDirectory(directory) {
            this.directory = directory
            if (this.$route.path !== '/mail') {
                this.$router.push('/mail');
            }
        },
        composeMail() {
            let newMail = mailService.getEmptyMail();
            mailService.postNew(newMail)
            this.$router.push(`/mail/${newMail.id}`);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            this.loadMails();
        },
        setSort(sortedBy) {
            this.sortedBy = sortedBy;
            this.loadMails();
        },
        isMailIncludeStr(mail, str) {
            const tempStr = str.toLowerCase();
            return mail.subject.toLowerCase().includes(tempStr) ||
                mail.body.toLowerCase().includes(tempStr) ||
                mail.from.toLowerCase().includes(tempStr) ||
                mail.to.toLowerCase().includes(tempStr)
        }
    },
    computed: {
        displayMails() {
            let mails = this.filterMails();
            return mails.filter(mail => mail.criteria.status === this.directory);
        },
    },
    components: {
        mailMainNav,
        mailMainAreaNav,
        mailList,
        mailDetails,
    },
}