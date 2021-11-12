import { mailService } from '../services/mail-service.js';
import { utilService } from '../../../services/util-service.js';

export default {
    name: 'mail-details',
    template: `
        <section v-if="mail" class="mail-details">
            <header class="mail-details-row flex space-between">
                <button class="btn-mail-icon" @click="goToList()" >
                    <i class="fas fa-arrow-left"></i>
                </button>
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
            <section class="mail-details-row">
                <p>Date:</p>
                <textarea disabled>{{mailSentDateToDisplay}}</textarea>
            </section>
            <section class="mail-details-row">
                <p>From:</p>
                <textarea disabled v-model="mail.from"></textarea>
            </section>
            <section class="mail-details-row">
                <p>To:</p>
                <textarea :disabled="!isDraft" v-model="mail.to">{{mail.to}}</textarea>
            </section>
            <section class="mail-details-row">
                <p>Subject:</p>
                <textarea :disabled="!isDraft" v-model="mail.subject">{{mail.subject}}</textarea>
            </section>
            <section class="mail-details-row">
                <textarea :disabled="!isDraft" v-model="mail.body">{{mail.body}}</textarea>
            </section>
            <section v-if="isDraft" class="mail-send-actions">
                <button @click="save(true)">Send</button>
                <button @click="save(false)">Save as draft</button>
            </section>
        </section>
    `,
    data() {
        return {
            mail: null,
            content:{}
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
                .then(mail => {
                    this.mail = mail
                    this.content = {
                        from: mail.from,
                        to: mail.to,
                        subject: mail.subject,
                        body:mail.body
                    }
                });
        },
        goToList() {
            this.$router.push('/mail');
        },
        toggleStar() {
            this.mail.criteria.isStarred = !this.mail.criteria.isStarred;
            mailService.save(this.mail)
                .then(() => this.$emit('change'))
            },
        toggleRead() {
            this.mail.criteria.isRead = !this.mail.criteria.isRead;
            mailService.save(this.mail)
                .then(() => this.$emit('change'))
        },
        remove() {
            mailService.remove(this.mail.id)
                .then(() => {
                    this.$emit('change')
                    this.goToList()

                })
        },
        save(toSend) {
            if (toSend) this.mail.criteria.status = 'sent'
            mailService.save(this.mail)
                .then(() => {
                    this.$emit('change')
                    this.goToList()
                })
        },
    },
    computed: {
        styledStarredMail() {
            return { starred: this.mail.criteria.isStarred }
        },
        mailSentDateToDisplay() {
            return utilService.formatDate(this.mail.sentAt);
        },
        isDraft() {
            return this.mail.criteria.status === 'draft';
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