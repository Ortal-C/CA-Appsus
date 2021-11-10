export default{
    name:'mail-main-area-nav',
    template: `
        <nav class="mail-main-area-nav flex">
            <select v-model="selected" title="Filter by" @change="filter">
                <option focus>Filter by</option>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="starred">Starred</option>
                <option value="unread">Unread</option>
                <option value="unstarred">Unstarred</option>
            </select>
        </nav>
    `,
    data(){
        return{
            selected: 'all',
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.selected)
        }
    },
}