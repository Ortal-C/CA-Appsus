import { utilService } from '../../../services/util-service.js'

export default{
    name:'mail-preview',
    props:['mail','loggedUser'],
    template: `
    <div class="mail-preview flex align-center" style="width:100%;">
        <p :class="styledUnreadMail" style="width:3%"><i @click="toggleStar()" class="fas fa-star" :class="styledStarredMail"></i></p>
        <p :class="styledUnreadMail" style="width:15%;">{{mailContactToDisplay}}</p>
        <p :class="styledUnreadMail" style="width:20%;">{{mail.subject}}</p>
        <p :class="styledUnreadMail" style="width:50%;">{{mailBodyToDisplay}}</p>
        <p :class="styledUnreadMail" style="width:12%">{{mailSentDateToDisplay}}</p>
        <!-- <td :class="styledUnreadMail"> -->
            <!-- <button @click="remove(mail.id)" >X</button> -->
            <!-- <router-link :to="'/mail/'+mail.id" >>></router-link></router-link></router-link> -->
            <!-- <router-link :to="'/mail/'+mail.id + '/edit'" >Edit</router-link> -->
        <!-- </td> -->
    </div>
    `,
    data(){
        return{
            currMail: this.mail,
            isBodyLong: this.mail.body.length >= 32,
        }
    },
    created(){
        console.log(this.mail);
    },
    destroyed(){

    },
    methods:{
        toggleStar(){
            this.currMail.isStarred = !this.currMail.isStarred;
            console.log(this.mail);
        },
    },
    computed:{
        styledStarredMail(){
            return {starred: this.currMail.isStarred}
        },
        styledUnreadMail(){
            return {unread: !this.currMail.isRead}
        },
        mailContactToDisplay(){
            return (this.currMail.from !== this.loggedUser.mail)
            ? this.currMail.from
            : this.currMail.to
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