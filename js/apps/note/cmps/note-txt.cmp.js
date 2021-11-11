import { noteService } from "../services/note-service.js"

export default {
    name: 'note-txt',
    props: ['note'],
    template: `
        <section class="note-txt">
            <p v-if="!isUpdated">{{note.info.txt}}</p>
            <div v-if="isUpdated">
                <textarea v-model="note.info.txt" cols="20" rows="2"></textarea>
            </div>
                <div class="fas fa-edit txt-update" @click="update" 
                style="cursor:pointer; position: relative;bottom: -42px;right: -90px;color: transparent;font-size: 20px;"></div>
        </section>
    `,
    data() {
        return {
            isUpdated: false
        }
    },
    methods: {
        update() {
            this.isUpdated = !this.isUpdated
            noteService.update(this.note)
                .then(() => this.$emit('update'))
        },
    }
};