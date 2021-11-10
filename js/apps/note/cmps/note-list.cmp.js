import { noteService } from "../services/note-service.js"
import notePreview from '../cmps/note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    template: `
        <section>
            <ul class="note-list">
                <li v-for="note in notes" :key="note.id" class="note-preview-container">
                    <note-preview :note="note" @remove="remove" @update="update" 
                    @changedColor="changedColor"></note-preview>
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
    methods: {
        remove(noteId) {
            noteService.remove(noteId)
                .then(notes => this.notes = notes)
        },
        update() {
            console.log('UPDATE');
        },
        add() {
            this.loadNotes()
        },
        changedColor() {
            this.loadNotes()
        }
    },
    components: {
        notePreview
    }
}