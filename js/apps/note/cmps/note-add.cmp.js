import { noteService } from "../services/note-service.js"

export default {
    name: 'note-add',
    template: `
         <section class="note-add">
             <form @submit.prevent="add">
                     <input ref="txtInput" v-model="note.info.txt" class="note-input" type="text" placeholder="What's on your mind?"/>
                     <i class="fas fa-font"></i>
                     <i class="far fa-image"></i>
                     <i class="fab fa-youtube"></i>
                     <i class="fas fa-list"></i>
                 <!-- <textarea v-model="note.info.txt" class="note-textarea" type="text" placeholder="What's on your mind?"/> -->
                 <!-- <button>Add</button> -->
                </form>
         </section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        this.note = noteService.getEmptyNote()
    },
    mounted() {
        this.$refs.txtInput.focus()
    },
    methods: {
        add() {
            if (!this.note.info.txt) return
            noteService.save(this.note)
                .then(() => {
                    this.note = noteService.getEmptyNote()
                    this.$emit('add')
                })
        },
    }
}