export default{
    name:'mail-main-nav',
    template: `
        <nav class="mail-main-nav flex">
            <button class="btn-mail btn-mail-compose" @click="compose">
            <i class="fas fa-plus"></i><span>Compose</span>
            </button>
            <button class="btn-mail" @click="directory('inbox')">
                <i class="fas fa-inbox"></i><span>Inbox</span>
            </button>
            <button class="btn-mail" @click="directory('sent')">
                <i class="fas fa-paper-plane"></i><span>Sent</span>
            </button>
            <button class="btn-mail" @click="directory('draft')">
                <i class="fas fa-file"></i><span>Drafts</span>
            </button>
            <button class="btn-mail" @click="directory('trash')">
                <i class="fas fa-trash"></i><span>Trash</span>
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
        },
    },
}