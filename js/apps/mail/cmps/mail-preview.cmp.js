import { utilService } from '../../../services/util-service.js'

export default{
    name:'mail-preview',
    props:['mail','loggedUser'],
    template: `
    <div class="mail-preview flex align-center" style="width:100%;" >
        <button class="btn-mail-icon" @click="toggleStar()">
            <i class="fas fa-star" :class="styledStarredMail"></i>
        </button>
        <button class="btn-mail-icon" @click="toggleRead()">
            <i :class="mailReadModeDisplay"></i>
        </button>
        <p :class="styledUnreadMail" style="width:15%;">{{mailContactToDisplay}}</p>
        <p :class="styledUnreadMail" style="width:20%;">{{mail.subject}}</p>
        <p :class="styledUnreadMail" style="width:50%;">{{mailBodyToDisplay}}</p>
        <p :class="styledUnreadMail" style="width:12%">{{mailSentDateToDisplay}}</p>
        <button class="btn-mail-icon" @click="remove()" >
            <i class="fas fa-trash" @click="toggleRead()" ></i>
        </button>
    </div>
    `,
    data(){
        return{
            currMail: this.mail,
            isBodyLong: this.mail.body.length >= 32,
        }
    },
    created(){
    },
    destroyed(){
    },
    methods:{
        toggleStar(){
            this.currMail.isStarred = !this.currMail.isStarred;
        },
        toggleRead(){
            this.currMail.isRead = !this.currMail.isRead;
        },
        remove() {
            this.$emit('remove', this.currMail.id)
        },
    },
    computed: {
        styledStarredMail(){
            return {starred: this.currMail.isStarred}
        },
        mailReadModeDisplay(){
            return this.currMail.isRead ? "fas fa-envelope-open" : "fas fa-envelope"
            
        },
        styledUnreadMail(){
            return {unread: !this.currMail.isRead}
        },
        mailContactToDisplay(){
            return (this.currMail.from !== this.loggedUser.mail)
            ? this.currMail.from
            : 'To: '+this.currMail.to
        },
        mailBodyToDisplay(){
            if (this.isBodyLong) return this.currMail.body.substr(0, 99) + '...';
            else return this.currMail.body
        },
        mailSentDateToDisplay(){
            return utilService.formatDate(this.currMail.sentAt);
        }
    },
    mounted(){
        //FOCUS SOMETHING
    },
    watch:{},
    components:{},

}