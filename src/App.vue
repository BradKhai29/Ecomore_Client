<template>
    <div class="container-fluid bg-white p-0 position-relative">
        <NavigationBar></NavigationBar>
        <router-view></router-view>

        <!-- Back to Top -->
        <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"
            ><i class="bi bi-arrow-up"></i
        ></a>
        <FooterSection></FooterSection>
    </div>
</template>

<script>
// Import components.
import NavigationBar from "./components/shared/NavigationBar.vue";
import FooterSection from "./components/shared/FooterSection.vue";

export default {
    name: "App",
    components: {
        NavigationBar,
        FooterSection,
    },
};
</script>
