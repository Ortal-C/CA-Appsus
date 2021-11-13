import { noteService } from "../services/note-service.js"
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-preview" :style="{backgroundColor}">
            <i title="Pin" class="fas fa-thumbtack" @click="pin" :style={color} style="width: 32px;height: 32px;"></i>
            <component :note="note" :is="note.type"></component>
            <div class="actions">
                <i title="Update" class="fas fa-edit" @click="update"></i>
                <i title="Delete" class="fas fa-trash" @click="remove(note.id)"></i>
                <i title="Change color" class="fas fa-palette" @click="openColors"></i>
                <i title="Duplicate" class="fas fa-copy" @click="duplicate"></i>
                <i title="Send as mail" class="fas fa-envelope" @click="sendAsMail"></i>
            </div>
            <div class="colors-container">
                <section class="colors" v-if="isShowColors">
                    <section v-for="color in colors">
                        <div class="note-color" :style="{backgroundColor: color.color}" @click="updateColor(color.color)">.</div>
                    </section>
                </section>
            </div>
        </section>
    `,
    data() {
        return {
            colors: noteService.getColors(),
            isShowColors: false,
            isUpdated: false,
        }
    },
    methods: {
        pin() {
            this.note.isPinned = !this.note.isPinned
            noteService.update(this.note)
                .then(() => this.$emit('pin'))
        },
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        update() {
            if (this.note.type !== 'note-txt') return
            this.isUpdated = !this.isUpdated;
            noteService.update(this.note)
                .then(() => this.$emit('update'))
        },
        openColors() {
            this.isShowColors = !this.isShowColors
        },
        updateColor(color) {
            this.isShowColors = false
            this.note.style.backgroundColor = color
            noteService.update(this.note)
                .then(() => this.$emit('changeColor'))
        },
        duplicate() {
            const duplicatedNote = JSON.parse(JSON.stringify(this.note));
            noteService.add(duplicatedNote)
                .then(() => this.$emit('duplicate'))
        },
        sendAsMail() {
            if (this.note.type === 'note-txt') {
                const txt = this.note.info.txt
                this.$router.push(`/mail?txt=${txt}`);
            }
        }
    },
    computed: {
        backgroundColor() {
            return this.note.style.backgroundColor
        },
        color() {
            if (this.note.isPinned) return 'orange'
            else return 'black'
        },
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos
    }
}