import { utilService } from '../../../services/util-service.js'
import longText from '../../../cmps/long-text.cmp.js'
export default {
    name: 'mail-preview',
    props: ['mail', 'loggedUser'],
    template: `
    <div class="mail-preview flex align-center" style="width:100%;">
        <button class="btn-mail-icon" @click="toggleStar()">
            <i class="fas fa-star" :class="styledStarredMail"></i>
        </button>
        <button class="btn-mail-icon" @click="toggleRead()">
            <i :class="mailReadModeDisplay"></i>
        </button>
        <router-link class="mail-content flex" style="width:100%;" :to="'/mail/'+mail.id">
            <p :class="styledUnreadMail" style="width:15%;">{{mailContactToDisplay}}</p>
            <p :class="styledUnreadMail" style="width:20%;">{{mail.subject}}</p>
            <long-text :txt="mail.body" :class="styledUnreadMail" style="width:50%;"/>
            <p :class="styledUnreadMail" style="width:12%">{{mailSentDateToDisplay}}</p>
        </router-link>
        <button class="btn-mail-icon" @click="remove()" >
            <i class="fas fa-trash" @click="toggleRead()" ></i>
        </button>
        <button class="btn-mail-icon" @click="saveAsNote()" >
            <i class="fas fa-sticky-note"></i>
        </button>
    </div>
    `,
    data() {
        return {
            currMail: this.mail,
            isBodyLong: this.mail.body.length >= 50,
        }
    },
    methods: {
        toggleStar() {
            this.currMail.criteria.isStarred = !this.currMail.criteria.isStarred;
            this.$emit('update', this.currMail)
        },
        toggleRead() {
            this.currMail.criteria.isRead = !this.currMail.criteria.isRead;
            this.$emit('update', this.currMail)
        },
        remove() {
            this.$emit('remove', this.currMail.id)
        },
        saveAsNote() {
            const to = this.currMail.to
            const from = this.currMail.from
            const subject = this.currMail.subject
            const body = this.currMail.body
            this.$router.push(`/note?to=${to}&from=${from}&subject=${subject}&body=${body}`);
        }
    },
    computed: {
        styledStarredMail() {
            return { starred: this.currMail.criteria.isStarred }
        },
        mailReadModeDisplay() {
            return this.currMail.criteria.isRead ? "fas fa-envelope-open" : "fas fa-envelope"

        },
        styledUnreadMail() {
            return { unread: !this.currMail.criteria.isRead }
        },
        mailContactToDisplay() {
            return (this.currMail.from !== this.loggedUser.mail)
                ? this.currMail.from
                : 'To: ' + this.currMail.to
        },
        mailBodyToDisplay() {
            if (this.isBodyLong) return this.currMail.body.substr(0, 49) + '...';
            else return this.currMail.body
        },
        mailSentDateToDisplay() {
            return utilService.formatDate(this.currMail.sentAt);
        }
    },
    watch: {},
    components: {
        longText,
    },

}