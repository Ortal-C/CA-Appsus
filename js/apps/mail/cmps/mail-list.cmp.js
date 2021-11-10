export default{
    name:'mail-list',
    props:['mails'],
    template: `
        <section class="mail-list">
            <!-- <ul> -->
                <table>
                    <!-- <li  > -->
                        <tr title="click to open mail" v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                            <td class="mail-info-starred"><i class="fas fa-star"></i></td>
                                <td class="mail-info-from">{{mail.from}}</td>   
                                <td class="mail-info-subject">{{mail.subject}}</td>
                                <td class="mail-info-body">{{mail.body}}</td>
                                <td class="mail-info-sentAt">{{mail.sentAt}}</td>
                                <td class="actions">
                                    <!-- <button @click="remove(mail.id)" >X</button> -->
                                    <!-- <router-link :to="'/mail/'+mail.id" >>></router-link></router-link></router-link> -->
                                    <!-- <router-link :to="'/mail/'+mail.id + '/edit'" >Edit</router-link> -->
                                </td>
                        </tr>    
                    <!-- </li> -->
                </table>
            <!-- </ul> -->

        </section>
    `,
    data(){
        return{

        }
    },
    created(){

    },
    destroyed(){

    },
    methods:{},
    computed:{
        showDate(){
            
        }
    },
    mounted(){
        //FOCUS SOMETHING
    },
    watch:{},
    components:{},

}