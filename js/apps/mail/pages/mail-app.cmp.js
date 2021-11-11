//Mail home-page
import { mailService } from '../services/mail-service.js';
import mailList from '../cmps/mail-list.cmp.js'
import mailMainNav from '../cmps/mail-main-nav.cmp.js'
import mailMainAreaNav from '../cmps/mail-main-area-nav.cmp.js'

export default {
    name: 'mail-app',
    template: `
        <section class="mail-app main-app flex">
            <mail-main-nav @directory="setDirectory"></mail-main-nav>
            <main class="mail-main-area">
                <mail-main-area-nav @filter="setFilter" @sort="setSort"></mail-main-area-nav>
                <nav class="flex space-between">
                </nav>
                <mail-list :mails="displayMails" :loggedUser="loggedUser" @change="loadMails()"></mail-list>
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
        loadMails() {
            mailService.query()
                .then(mails => {
                    switch (this.sortedBy) {
                        case 'dateNTO':
                            this.mails = mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt);
                            break;
                        case 'dateOTN':
                            this.mails = mails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt);
                            break;
                        case 'titleAO':
                            this.mails = mails.sort((mail1, mail2) => mail1.subject.toLowerCase() >= mail2.subject.toLowerCase() ? 1 : -1);
                            break;
                        case 'titleDO':
                            this.mails = mails.sort((mail1, mail2) => mail2.subject.toLowerCase() >= mail1.subject.toLowerCase() ? 1 : -1);
                            break;
                    }
                });

        },
        setDirectory(directory) {
            this.directory = directory
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setSort(sortedBy) {
            this.sortedBy = sortedBy;
            this.loadMails();
        },
        isMailIncludeStr(mail, str) {
            console.log(mail);
            let subject = mail.subject.toLowerCase()
            let body = mail.body.toLowerCase()
            let from = mail.from.toLowerCase();
            let to = mail.to.toLowerCase();
            console.log([subject, body, from, to]);
            return subject.includes(str.toLowerCase())
        }
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
                    mailsToShow = mailsToShow.filter(mail => mail.isStarred)
                    break;
                case 'read':
                    mailsToShow = mailsToShow.filter(mail => mail.isRead)
                    break;
                case 'unread':
                    mailsToShow = mailsToShow.filter(mail => !mail.isRead)
                    break;
                case 'unstarred':
                    mailsToShow = mailsToShow.filter(mail => !mail.isStarred)
                    break;
                case 'all':
                    break;
                case '':
                    break;
                default:
                    mailsToShow = mailsToShow.filter(mail => {
                        const strToSearch = this.filterBy.toLowerCase();
                        return (
                            mail.subject.toLowerCase().includes(strToSearch)
                            || mail.body.toLowerCase().includes(strToSearch)
                            || mail.from.toLowerCase().includes(strToSearch)
                            || mail.to.toLowerCase().includes(strToSearch)
                        )
                    })
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
}