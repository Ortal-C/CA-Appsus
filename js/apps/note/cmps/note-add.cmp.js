import { noteService } from "../services/note-service.js"

export default {
    name: 'note-add',
    template: `
         <section class="note-add">
            <form @submit.prevent="add" v-if="type === 'note-txt'">
                 <input ref="input" v-model="note.info.txt" class="note-input" type="text" placeholder="What's on your mind?"/>
                 <button><i class="fas fa-check"></i></button>
            </form>
            <form @submit.prevent="add" v-if="type === 'note-img'">
                <input type="text" v-model="note.info.title" placeholder="Enter title">
                <input type="url" v-model="note.info.url" placeholder="Enter image url">
                <button><i class="fas fa-check"></i></button>
            </form>
            <form @submit.prevent="add" v-if="type === 'note-todos'">
                <input type="text" v-model="note.info.label" placeholder="Enter label">
                <input type="text" v-model="note.info.todos[0].txt" placeholder="Enter todo">
                <input type="text" v-model="note.info.todos[1].txt" placeholder="Enter todo">
                <button><i class="fas fa-check"></i></button>
            </form>
            <div class="types-container">
                <span class="fas fa-font" @click="changeType('note-txt')"></span>
                <span class="far fa-image" @click="changeType('note-img')"></span>
                <span class="fas fa-list" @click="changeType('note-todos')"></span>
            </div>
         </section>
    `,
    data() {
        return {
            note: null,
            type: 'note-txt'
        }
    },
    created() {
        this.note = noteService.getEmptyNote(this.type)
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        add() {
            if (this.type === 'note-txt' && !this.note.info.txt) return
            else if (this.type === 'note-img' && !this.note.info.url) return
            else if (this.type === 'note-todos' && !this.note.info.label) return
            noteService.add(this.note)
                .then(() => {
                    this.note = noteService.getEmptyNote(this.type)
                    this.$emit('add')
                })
        },
        changeType(type) {
            this.type = type
            this.note = noteService.getEmptyNote(type)
        }
    }
}