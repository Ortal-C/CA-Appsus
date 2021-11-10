//NOTES PAGE
import { noteService } from "../services/note-service.js"
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    name: 'note',
    template: `
        <section class="note-app main-app">
            <note-add  @add="loadNotes"/>
            <note-list :notes="notes" @remove="loadNotes" @changeColor="loadNotes"/>
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
            console.log('here');
            noteService.query()
                .then(notes => this.notes = notes)
        },
    },
    components: {
        noteAdd,
        noteList
    }
};