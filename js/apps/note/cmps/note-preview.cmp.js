import { noteService } from "../services/note-service.js"

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-preview" :style="{backgroundColor}">
                    <i class="fas fa-thumbtack"></i>
                    <p v-if="!isUpdated">{{note.info.txt}}</p>
                    <div v-if="isUpdated">
                        <textarea v-if="isUpdated" v-model="note.info.txt" cols="20" rows="5"></textarea>
                    </div>
                    <div class="actions">
                        <i class="fas fa-trash" @click="remove(note.id)"></i>
                        <i class="fas fa-edit" @click="update"></i>
                        <i class="fas fa-palette" @click="openColors(note.id)"></i>
                    </div>
                    <div>
                        <section class="colors" v-if="isShowColors">
                            <section v-for="color in colors">
                                <div class="note-color" :style="{backgroundColor: color.color}" @click="updateColor(note.id, color.color)">.</div>
                            </section>
                        </section>
                    </div>
        </section>
    `,
    data() {
        return {
            colors: noteService.getColors(),
            isShowColors: false,
            isUpdated: false
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        update() {
            this.isUpdated = !this.isUpdated;
            noteService.update(this.note)
                .then(() => this.$emit('update'))
        },
        openColors() {
            this.isShowColors = !this.isShowColors
        },
        updateColor(noteId, color) {
            noteService.getById(noteId)
                .then(note => {
                    this.isShowColors = false
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
    },
}