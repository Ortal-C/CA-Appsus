export default{
    name:'email-list',
    props:['emails'],
    template: `
        <section class="email-list">
            <ul>
                <table>
                    <li v-for="email in emails" :key="email.id" class="email-preview-container flex space-between" >
                        <tr>
                            <td><i class="fas fa-star"></i></td>
                                <td>{{email.from}}</td>   
                                <td>{{email.subject}}</td>
                                <td>{{email.body}}</td>
                                <td>{{email.sentAt}}</td>
                                <div class="actions">
                                    <button @click="remove(email.id)" >X</button>
                                    <router-link :to="'/email/'+email.id" >Details</router-link>
                                    <router-link :to="'/email/'+email.id + '/edit'" >Edit</router-link>
                                </div>
                        </tr>    
                    </li>
                </table>
            </ul>

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