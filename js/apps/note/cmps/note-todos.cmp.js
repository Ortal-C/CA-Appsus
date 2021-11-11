export default {
    name: 'note-todos',
    props: ['note'],
    template: `
        <section class="note-todos">
           <h3>{{note.info.label}}</h3>
           <pre>{{note.info.todos}}</pre>
           <ul v-for="todo in note.info.todos">
               <li>{{todo}}</li>
           </ul>
        </section>
    `,
};