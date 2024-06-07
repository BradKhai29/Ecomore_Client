<template>
    <figure class="mx-1 mx-sm-0 w-100 rounded my-shadow">
        <img class="img-fluid rounded" :src="imageUrl" alt="anh_san_pham">
    </figure>
</template>

<script>
export default {
    props: {
        imageUrl: String,
    }
}
</script>
