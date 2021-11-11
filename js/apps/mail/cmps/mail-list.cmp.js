import { mailService } from '../services/mail-service.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    name: 'mail-list',
    props: ['mails', 'loggedUser'],
    template: `
    <section class="mail-list">
        <ul class="clean-list">
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" :loggedUser="loggedUser" @remove="remove"/>
            </li>    
        </ul>
    </section>
    `,
    methods:{
        remove(mailId) {
            mailService.remove(mailId)
                .then(() => this.$emit('change'))
        },
    },
    components: {
        mailPreview,
    },

}