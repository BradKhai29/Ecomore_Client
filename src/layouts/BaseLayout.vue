<template>
    <header class="container-fluid bg-white p-0 position-relative">
        <slot name="header"></slot>
    </header>
    <main class="container-fluid bg-white">
        <slot></slot>
    </main>
    <footer class="container-fluid">
        <slot name="footer"></slot>
    </footer>
</template>

<script>
export default {
}
</script>

<style>
@import url("../assets/css/bootstrap.min.css");
@import url("../assets/css/style.css");
@import url("../assets/lib/animate/animate.min.css");


</style>