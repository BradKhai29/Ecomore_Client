<template>
    <section class="container-fluid bg-white p-0 position-relative">
        <NavigationBar></NavigationBar>
        <main class="container-fluid p-0 overflow-hidden">
            <slot></slot>
        </main>
        <FooterSection></FooterSection>
    </section>
</template>

<script>
import NavigationBar from "@/components/shared/NavigationBar.vue";
import FooterSection from "@/components/shared/FooterSection.vue";

export default {
    components: {
        NavigationBar,
        FooterSection,
    },
    props: {
        displayAuth: Boolean,
    },
    computed: {
        showAuth() {
            if (this.displayAuth == null) {
                return false;
            }

            return this.displayAuth;
        }
    }
};
</script>