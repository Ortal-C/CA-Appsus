//Mail home-page
import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js'

export default{
    name: 'mail',
    template: `
        <section class="mail-app main-app flex">
            <nav class="mail-main-nav flex ">
                <router-link to="/">
                    <button class="btn-mail mail-compose">
                        <i class="fas fa-plus"></i>
                        Compose
                    </button>
                </router-link >
                <router-link to="/">
                    <i class="fas fa-inbox"></i>
                    Inbox
                </router-link >
                <router-link to="/">
                    <i class="fas fa-star"></i>
                    Starred
                </router-link >
                <router-link to="/">
                    <i class="fas fa-paper-plane"></i>
                    Sent Mails
                </router-link >
                <router-link to="/">
                    <i class="fas fa-file"></i>
                    Drafts
                </router-link >

                <!-- Optional -->
                <router-link to="/">
                    <i class="fas fa-trash"></i>
                    Trash
                </router-link >

            </nav>
            <main class="mail-main-area">
                <nav>
                    <a href="#">Filter</a> 
                    <!-- ALL NONE READ UNREAD STARRED UNSTARED-->
                </nav>
                <h1>List of mails</h1>
                <email-list :emails="emailsToshow"></email-list>

            </main>
        </section>
    `,
    data(){
        return{
            emails: [],
        }
    },
    created(){
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails=> this.emails = emails)
        },
    },
    computed: {
        emailsToshow() {
            return this.emails
        },
    },
    components: {
        emailList,
    },
};