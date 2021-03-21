<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
        }
    },
    components: {
        EmptyLayout, MainLayout
    },
    methods: {}
}
</script>
<style lang="scss">

@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
