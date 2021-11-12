//Mail home-page
import { mailService } from '../services/mail-service.js';
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
                    <mail-main-area-nav></mail-main-area-nav>
                    <mail-list :mails="displayMails" :loggedUser="loggedUser" @change="loadMails()"></mail-list>
                </section>
                <section v-else>
                    <mail-details  @change="loadMails()" ></mail-details>
                </section>
            </main>
        </section>
    `,
    data() {
        return {
            loggedUser: mailService.getLoggedUser(),
            mails: [],
            directory: 'inbox',
            // filterBy: 'all',
            // sortedBy: 'dateNTO',
        }
    },
    created() {
        this.loadMails();
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => {
                    this.mails = mails;
                    // switch (this.sortedBy) {
                    //     case 'dateNTO':
                    //         this.mails = mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt);
                    //         break;
                    //     case 'dateOTN':
                    //         this.mails = mails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt);
                    //         break;
                    //     case 'titleAO':
                    //         this.mails = mails.sort((mail1, mail2) => mail1.subject.toLowerCase() >= mail2.subject.toLowerCase() ? 1 : -1);
                    //         break;
                    //     case 'titleDO':
                    //         this.mails = mails.sort((mail1, mail2) => mail2.subject.toLowerCase() >= mail1.subject.toLowerCase() ? 1 : -1);
                    //         break;
                    //         default: break
                    // }
                });
        },
        setDirectory(directory) {
            this.directory = directory
            this.$router.push('/mail');
        },
        composeMail() {
            let newMail = mailService.getEmptyMail();
            mailService.postNew(newMail)
            this.$router.push(`/mail/${newMail.id}`);
        },
        // setFilter(filterBy) {
        //     this.filterBy = filterBy
        // },
        // setSort(sortedBy) {
        //     this.sortedBy = sortedBy;
        //     this.loadMails();
        // },
        // isMailIncludeStr(mail, str) {
        //     let subject = mail.subject.toLowerCase()
        //     let body = mail.body.toLowerCase()
        //     let from = mail.from.toLowerCase();
        //     let to = mail.to.toLowerCase();
        //     console.log([subject, body, from, to]);
        //     return subject.includes(str.toLowerCase())
        // }
    },
    computed: {
        displayMails() {
            return this.mails.filter(mail => mail.criteria.status === this.directory);
        },
    },
    components: {
        mailMainNav,
        mailMainAreaNav,
        mailList,
        mailDetails,
    },
}

// switch (this.filterBy) {
//     case 'starred':
//         mailsToShow = mailsToShow.filter(mail => mail.criteria.isStarred)
//         break;
//     case 'read':
//         mailsToShow = mailsToShow.filter(mail => mail.criteria.isRead)
//         break;
//     case 'unread':
//         mailsToShow = mailsToShow.filter(mail => !mail.criteria.isRead)
//         break;
//     case 'unstarred':
//         mailsToShow = mailsToShow.filter(mail => !mail.criteria.isStarred)
//         break;
//     case 'all':
//         break;
//     case '':
//         break;
//     default:
//         mailsToShow = mailsToShow.filter(mail => {
//             const strToSearch = this.filterBy.toLowerCase();
//             return (
//                 mail.subject.toLowerCase().includes(strToSearch)
//                 || mail.body.toLowerCase().includes(strToSearch)
//                 || mail.from.toLowerCase().includes(strToSearch)
//                 || mail.to.toLowerCase().includes(strToSearch)
//             )
//         })
//         break;
// }