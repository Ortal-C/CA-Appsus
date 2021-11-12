export default{
    name:'mail-main-nav',
    template: `
        <nav class="mail-main-nav flex space-between">
            <button class="btn-mail btn-mail-compose" @click="compose">
            <i class="fas fa-plus"></i>
                <!-- Compose -->
            </button>
            <button class="btn-mail" @click="directory('inbox')">
                <i class="fas fa-inbox"></i>
                <!-- Inbox -->
            </button>
            <!-- <button class="btn-mail" @click="directory('starred')">
                <i class="fas fa-star"></i>
                Starred
            </button> -->
            <button class="btn-mail" @click="directory('sent')">
                <i class="fas fa-paper-plane"></i>
                <!-- Sent Mails -->
            </button>
            <button class="btn-mail" @click="directory('draft')">
                <i class="fas fa-file"></i>
                <!-- Drafts -->
            </button>
            <button class="btn-mail" @click="directory('trash')">
                <i class="fas fa-trash"></i>
                <!-- Trash -->
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