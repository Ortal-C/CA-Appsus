export default {
    name: 'mail-main-area-nav',
    template: `
        <nav class="mail-main-area-nav flex space-between">
            <section class="flex space-between">
                <select v-model="filtered" @change="filter" style="width:100px;">
                    <option value="all">Filter By</option>
                    <option value="read">Read</option>
                    <option value="starred">Starred</option>
                    <option value="unread">Unread</option>
                    <option value="unstarred">Unstarred</option>
                </select>
            </section>
            <input v-model="filtered" @input="filter" class="mail-input" type="text" placeholder="Search..."/>
            <select v-model="sorted" title="Sort by" @change="sort" style="width:100px;">
                <option value="dateNTO">Sort By</option>
                <option value="dateNTO">Date (New to old)</option>
                <option value="dateOTN">Date (Old to new)</option>
                <option value="titleAO">Title (Ascending order)</option>
                <option value="titleDO">Title (Descending order)</option>
            </select>
        </nav>
    `,
    data() {
        return {
            filtered: 'all',
            sorted: 'dateNTO',
        }
    },
    methods: {
        filter() {
            this.$emit('filter', `${this.filtered}`)
        },
        sort() {
            this.$emit('sort', `${this.sorted}`)
        },
    },
}