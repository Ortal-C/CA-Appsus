import { noteService } from "../services/note-service.js"
import notePreview from '../cmps/note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    template: `
        <ul class="note-list">
            <template class="temp">
            <li v-for="note in notes" :key="note.id" class="note-pinned-container" v-if="note.isPinned">
                <note-preview :note="note" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate" />
            </li>
            </template>
            <li v-for="note in notes" :key="note.id" class="note-preview-container" v-if="!note.isPinned">
                <note-preview :note="note" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate" />
            </li>
        </ul>
        <!-- <section class="note-list">
            <template class="temp">
            <div v-for="note in notes" :key="note.id" class="note-pinned-container" v-if="note.isPinned">
                <note-preview :note="note" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate" />
            </div>
            </template>
            <div v-for="note in notes" :key="note.id" class="note-preview-container" v-if="!note.isPinned">
                <note-preview :note="note" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate" />
            </div>
        </section> -->
    `,
    methods: {
        pin() {
            this.$emit('pin')
        },
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