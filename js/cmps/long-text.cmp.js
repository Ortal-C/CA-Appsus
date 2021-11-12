export default {
    props: ['txt'],
    template: `
        <section class="long-text">
            <p>{{txtForDisplay}}</p>
        </section>
    `,
    data() {
        return {
            isLong: false
        }
    },
    methods: {
        toggleTxt() {
            this.isLong = !this.isLong
        }
    },
    computed: {
        btnForDisplay() {
            return this.isLong ? 'Less' : 'More'
        },
        txtForDisplay() {
            if (this.txt.length <= 50) return this.txt;
            return (this.isLong) ? this.txt : this.txt.substr(0, 49) + '...'
        }
    }
};