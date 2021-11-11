import { noteService } from "../services/note-service.js"
import notePreview from '../cmps/note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    template: `
        <section>
            <ul class="note-list">
                <li v-for="note in notes" :key="note.id" class="note-preview-container">
                    <note-preview :note="note" @remove="remove" @changeColor="changeColor" @duplicate="duplicate"></note-preview>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            noteService.remove(noteId)
                .then(() => this.$emit('remove'))
        },
        changeColor() {
            this.$emit('changeColor')
        },
        duplicate() {
            this.$emit('duplicate')
        },
    },
    components: {
        notePreview
    }
}