export default {
    name: 'mail-main-area-nav',
    template: `
        <nav class="mail-main-area-nav flex space-between">
            <!-- dropdown css adjustments -->
            <section class="flex space-between">
                <button class="btn-mail-icon" @click="toggleFilterShow"><i class="fas fa-filter"></i></button>
                <select v-if="this.isFilterClicked" v-model="filtered" title="Filter by" @change="filter">
                    <option focus></option>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="starred">Starred</option>
                    <option value="unread">Unread</option>
                    <option value="unstarred">Unstarred</option>
                </select>
            </section>
            <input class="mail-input" type="text" placeholder="Search..."/>
            <select v-model="sorted" title="Sort by" @change="sort">
                <option value="dateNTO">Date (New to old)</option>
                <option value="dateOTN">Date (Old to new)</option>
                <option value="titleAO">Title (Ascending order)</option>
                <option value="titleDO">Title (Descending order)</option>
            </select>
            
        </nav>
    `,
    data() {
        return {
            isFilterClicked: false,
            filtered: 'all',
            sorted: 'dateNTO',
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filtered)
        },
        toggleFilterShow() {
            this.isFilterClicked = !this.isFilterClicked
        },
        sort() {
            this.$emit('sort', this.sorted)
        },
    },
}