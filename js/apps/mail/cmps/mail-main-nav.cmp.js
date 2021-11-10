export default{
    name:'mail-main-nav',
    template: `
        <nav class="mail-main-nav flex">
            <button class="btn-mail btn-mail-compose">
                <i class="fas fa-plus"></i>
                Compose
            </button>
            <!-- <button class="btn-mail" @click="filter('all')">
                <i class="fas fa-bars"></i>
                All
            </button> -->
            <button class="btn-mail" @click="filter('inbox')">
                <i class="fas fa-inbox"></i>
                Inbox
            </button>
            <button class="btn-mail" @click="filter('starred')">
                <i class="fas fa-star"></i>
                Starred
            </button>
            <button class="btn-mail" @click="filter('sent')">
                <i class="fas fa-paper-plane"></i>
                Sent Mails
            </button>
            <button class="btn-mail" @click="filter('drafts')">
                <i class="fas fa-file"></i>
                Drafts
            </button>

                <!-- Optional -->
            <button class="btn-mail" @click="filter('trash')">
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
        filter(filterBy) {
            this.$emit('filtered', filterBy)
        }
    },
}