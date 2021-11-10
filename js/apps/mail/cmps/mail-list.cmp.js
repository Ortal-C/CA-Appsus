import mailPreview from './mail-preview.cmp.js'

export default {
    name: 'mail-list',
    props: ['mails', 'loggedUser'],
    template: `
    <section class="mail-list">
        <ul class="clean-list">
            <li v-for="mail in mails" :key="mail.id" title="click to open mail">
                <mail-preview :mail="mail" :loggedUser="loggedUser"/>
            </li>    
        </ul>
    </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    destroyed() {

    },
    methods: {},
    computed: {
        showDate() {

        },
    },
    mounted() {
        //FOCUS SOMETHING
    },
    watch: {},
    components: {
        mailPreview,
    },

}