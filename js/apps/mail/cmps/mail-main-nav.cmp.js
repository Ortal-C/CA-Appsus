export default{
    name:'mail-main-nav',
    template: `
        <nav class="mail-main-nav flex">
            <button class="btn-mail btn-mail-compose" @click="compose">
                <i class="fas fa-plus"></i>
                Compose
            </button>
            <button class="btn-mail" @click="directory('inbox')">
                <i class="fas fa-inbox"></i>
                Inbox
            </button>
            <button class="btn-mail" @click="directory('starred')">
                <i class="fas fa-star"></i>
                Starred
            </button>
            <button class="btn-mail" @click="directory('sent')">
                <i class="fas fa-paper-plane"></i>
                Sent Mails
            </button>
            <button class="btn-mail" @click="directory('drafts')">
                <i class="fas fa-file"></i>
                Drafts
            </button>
            <button class="btn-mail" @click="directory('trash')">
                <i class="fas fa-trash"></i>
                Trash
            </button>

        </nav>
    `,
    data(){
        return{
            selected: 'inbox',
        }
    },
    methods: {
        directory(directory) {
            this.$emit('directory', directory)
        },
        compose(){
            this.$emit('compose')
        }
    },
    
}
// <!-- <router-link class="btn-mail" to="/mail/inbox" @click="getEvent">
// <i class="fas fa-inbox"></i>
// Inbox
// </router-link>
// <router-link class="btn-mail" to="/mail/starred" @click="changingRoute('starred')">
// <i class="fas fa-star"></i>
// Starred
// </router-link>
// <router-link class="btn-mail" to="/mail/sent" @click="changingRoute('sent')">
// <i class="fas fa-paper-plane"></i>
// Sent
// </router-link>
// <router-link class="btn-mail" to="/mail/drafts" @click="changingRoute('drafts')">
// <i class="fas fa-file"></i>
// Drafts
// </router-link>
// <router-link class="btn-mail" to="/mail/trash" @click="changingRoute('trash')">
// <i class="fas fa-trash"></i>
// Trash
// </router-link> -->
