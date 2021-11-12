export default {
    template: `
        <section class="app-header">
            <main class="main-layout flex space-between align-center" title="Menu">
                <!-- change this to router-link later  -->
                <!-- <nav class="app-nav flex space-between" > -->
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/mail">Email</router-link>
                    <router-link to="/note">Notes</router-link>
                    <!-- <i class="fas fa-ellipsis-h"></i> -->
                <!-- </nav> -->
            </main>
        </section>
    `
    ,
};