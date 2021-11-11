export default {
    name: 'note-todos',
    props: ['note'],
    template: `
        <section class="note-todos">
           <h3>{{note.info.label}}</h3>
           <ul v-for="todo in note.info.todos">
               <li>{{todo.txt}}</li>
           </ul>
        </section>
    `,
};