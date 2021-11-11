import { mailService } from '../services/mail-service.js';
import { utilService } from '../../../services/util-service.js';

export default {
    name: 'mail-display',
    template: `
        <section class="mail-display">
            <header class="mail-display-row flex space-between">
                {{mail.subject}}
                <section class="actions">
                    <button class="btn-mail-icon" @click="toggleStar()">
                        <i class="fas fa-star" :class="styledStarredMail"></i>
                    </button>
                    <button class="btn-mail-icon" @click="toggleRead()">
                        <i :class="mailReadModeDisplay"></i>
                    </button>
                    <button class="btn-mail-icon" @click="remove()" >
                        <i class="fas fa-trash" @click="toggleRead()" ></i>
                    </button>
                </section>
            </header>
            <section class="mail-display-row">
                <p>Date:</p>
                {{mailSentDateToDisplay}}
            </section>
            <section class="mail-display-row">
                <p>From:</p>
                {{mail.from}}
            </section>
            <section class="mail-display-row">
                <p>To:</p>
                {{mail.to}}
            </section>
            <section class="mail-display-row">
                <p>Subject:</p>
                {{mail.subject}}
            </section>
            <section class="mail-display-row">{{mail.body}}</section>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        this.getMail();
    },
    watch: {
        $route: {
            handler() {
                this.getMail();
            }
        },
    },
    methods: {
        getMail() {
            const { mailId } = this.$route.params
            mailService.getById(mailId)
                .then(mail => this.mail = mail);
            console.log(this.mail);
        }
    },
    computed: {
        mailSentDateToDisplay() {
            return utilService.formatDate(this.mail.sentAt);
        },
        mailReadModeDisplay() {
            if (this.mail) {
                return this.mail.criteria.isRead ? "fas fa-envelope-open" : "fas fa-envelope";
            }
        },
    },
    components: {
    }
};