//NOTES PAGE
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/event-bus-service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    name: 'notes-app',
    template: `
        <section class="note-app">
            <note-add @add="loadNotes"/>
            <note-list :notes="notes" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate"/>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.loadNotes()
        console.log('Check git');
    },
    methods: {
        createSuccessMsg(txt) {
            return {
                txt,
                type: 'success'
            }
        },
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        pin() {
            this.loadNotes()
        },
        remove() {
            this.loadNotes()
            const msg = this.createSuccessMsg('Deleted note succesfully')
            eventBus.$emit('showMsg', msg)
        },
        duplicate() {
            this.loadNotes()
            const msg = this.createSuccessMsg('Duplicated note succesfully')
            eventBus.$emit('showMsg', msg)
        },
        changeColor() {
            this.loadNotes()
            const msg = this.createSuccessMsg('Changed note color succesfully')
            eventBus.$emit('showMsg', msg)
        },
    },
    components: {
        noteAdd,
        noteList
    }
};