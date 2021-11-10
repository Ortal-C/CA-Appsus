export default {
    name: 'note-preview',
    props: ['notes'],
    template: `
        <section class="note-preview">
            <ul class="note-list">
                <li v-for="note in notes" :key="note.id" class="note">
                    <h2>{{note.info.title}}</h2>
                    <p>{{note.info.txt}}</p>
                    <div class="actions">
                        <button @click="remove(note.id)">Remove</button>
                        <button>Update</button>
                    </div>
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
    mounted() {

    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        }
    },
    computed: {},
    watch: {},
    components: {},

}