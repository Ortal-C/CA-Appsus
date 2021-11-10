import { noteService } from "../services/note-service.js"

export default {
    name: 'note-add',
    template: `
         <section class="note-add">
            <form @submit.prevent="add">
                <input v-model="note.info.txt" class="note-input" type="text" placeholder="What's on your mind?">
                <button>Add note</button>
            </form>
         </section>
    `,
    data() {
        return {
            note: {
                id: '',
                type: '',
                info: {
                    txt: ''
                },
                style: {
                    backgroundColor: '#dedede'
                }
            },
        }
    }, methods: {
        add() {
            noteService.save(this.note)
                .then(() => {
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
                    this.$emit('add')
                })
        },
    }
}