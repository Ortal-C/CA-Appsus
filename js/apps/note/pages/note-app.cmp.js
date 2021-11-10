//NOTES PAGE
import { noteService } from "../services/note-service.js"
import notePreview from '../cmps/note-preview.cmp.js'

export default {
    name: 'note',
    template: `
        <section class="note-app main-app">
            <form @submit.prevent="add">
                <input v-model="note.info.txt" class="note-input" type="text" placeholder="What's on your mind?">
                <button>Add note</button>
            </form>
            <note-preview :notes="notes" @remove="remove"/>
        </section>
    `,
    data() {
        return {
            notes: null,
            note: {
                id: '',
                type: '',
                info: {
                    txt: ''
                },
                style: {
                    backgroundColor: ''
                }
            },
        }
    },
    created() {
        this.loadNotes()
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        add() {
            noteService.save(this.note)
                .then(() => {
                    this.loadNotes()
                    this.note = {
                        id: '',
                        type: '',
                        info: {
                            txt: ''
                        },
                        style: {
                            backgroundColor: ''
                        }
                    }
                })
        },
        remove(noteId) {
            noteService.remove(noteId)
                .then(notes => this.notes = notes)
        }
    },
    components: {
        notePreview
    }
};