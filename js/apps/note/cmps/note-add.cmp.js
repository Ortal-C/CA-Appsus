import { noteService } from "../services/note-service.js"

export default {
    name: 'note-add',
    template: `
         <section class="note-add">
                <textarea v-model="note.info.txt" class="note-textarea" type="text" placeholder="What's on your mind?"/>
                <button @click="add">Add note</button>
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
                    backgroundColor: '#e8eaed'
                }
            },
        }
    },
    methods: {
        add() {
            noteService.save(this.note)
                .then(res => {
                    console.log('Adding', res);
                    this.note = {
                        id: '',
                        type: '',
                        info: {
                            txt: ''
                        },
                        style: {
                            backgroundColor: '#e8eaed'
                        }
                    }
                    noteService.query()
                        .then(notes => { this.$emit('add', notes) })
                    console.log(res)
                })
            this.$emit('add')
        },
    }
}