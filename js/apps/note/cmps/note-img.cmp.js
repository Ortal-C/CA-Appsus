export default {
    name: 'note-img',
    props: ['note'],
    template: `
        <section class="note-img">
           <h3>{{note.info.title}}</h3>
           <img :src="note.info.url">
        </section>
    `,
};