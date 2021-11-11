export default {
    name: 'note-txt',
    props: ['note'],
    template: `
        <section class="note-txt">
           <p>{{note.info.txt}}</p>
        </section>
    `,
};