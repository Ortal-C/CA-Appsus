//NOTES PAGE
import { noteService } from "../services/note-service.js"
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    name: 'note',
    template: `
        <section class="note-app main-app">
            <note-add @add="add"/>
            <note-list :notes="notes" @remove="loadNotes" @changeColor="loadNotes" @update="loadNotes"/>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.loadNotes()
    },
    methods: {
        loadNotes() {
            console.log('Load notes');
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },
        add(notes) {
            console.log(notes);
            this.notes = notes
            this.loadNotes()
        }
    },
    components: {
        noteAdd,
        noteList
    }
};