export default{
    template:`
        <section class="app-header">
            <main class="main-layout flex space-between align-center">
                <!-- change this to router-link later  -->
                <a href="#" class="app-logo" title="Appsus">Appsus</a> 
                <nav class="app-nav" title="Menu">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link> |
                    <router-link to="/mail">Email</router-link> |
                    <router-link to="/note">Notes</router-link>
                    <!-- <i class="fas fa-ellipsis-h"></i> -->
                </nav>
            </main>
        </section>
    `
    ,
};