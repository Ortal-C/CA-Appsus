import { noteService } from "../services/note-service.js"

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-preview" :style="{backgroundColor}">
                    <h2>{{note.info.title}}</h2>
                    <p>{{note.info.txt}}</p>
                    <div class="actions">
                        <button @click="remove(note.id)"><i class="fas fa-trash"></i></button>
                        <button @click="update(note.id)"><i class="fas fa-edit"></i></button>
                        <button @click="openColors(note.id)"><i class="fas fa-palette"></i></button>
                      
                        <div>
                            <section class="colors" v-if="isShowColors">
                                <section v-for="color in colors">
                                    <div class="note-color" :style="{backgroundColor: color.color}" @click="updateColor(note.id, color.color)">.</div>
                                </section>
                            </section>
                        </div>
                    </div>
        </section>
    `,
    data() {
        return {
            colors: noteService.getColors(),
            isShowColors: false,
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        update(noteId) {
            console.log('UPDATE', noteId);
        },
        openColors(noteId) {
            this.isShowColors = !this.isShowColors
        },
        updateColor(noteId, color) {
            noteService.getById(noteId)
                .then(note => {
                    note.style.backgroundColor = color
                    noteService.update(note)
                        .then(() => this.$emit('changedColor'))
                })
        }
    },
    computed: {
        backgroundColor() {
            return this.note.style.backgroundColor
        },
        colorForDisplay(color) {
            console.log('here');
        }
    },
}