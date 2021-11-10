
export default{
    name:'mail-preview',
    props:['mail', 'loggedUser'],
    template: `
    <tr class="mail-preview" >
        <td :class="styledUnreadMail"><i class="fas fa-star"></i></td>
        <td :class="styledUnreadMail" style="width:20%">{{mailContactToDisplay}}</td>
        <td :class="styledUnreadMail" style="width:30%;">{{mail.subject}}</td>
        <td :class="styledUnreadMail" style="width:50%;">{{mailBodyToDisplay}}</td>
        <td :class="styledUnreadMail" style="width:150px;">{{mail.sentAt}}</td>
        <!-- <td :class="styledUnreadMail"> -->
            <!-- <button @click="remove(mail.id)" >X</button> -->
            <!-- <router-link :to="'/mail/'+mail.id" >>></router-link></router-link></router-link> -->
            <!-- <router-link :to="'/mail/'+mail.id + '/edit'" >Edit</router-link> -->
        <!-- </td> -->
</tr>
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
    methods:{},
    computed:{
        styledUnreadMail(){
            return {unread: !this.currMail.isRead}
        },
        mailContactToDisplay(){
            return (this.currMail.from !== this.loggedUser)
            ? this.currMail.from
            : this.currMail.to
        },
        mailBodyToDisplay(){
            if (this.isBodyLong) return this.currMail.body.substr(0, 99) + '...';
            else return this.currMail.body
        }
    },
    mounted(){
        //FOCUS SOMETHING
    },
    watch:{},
    components:{},

}