<template>
    <ul class="sidenav app-sidenav" :class="{open: modelValue}">
        <router-link
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            custom
            v-slot="{navigate, isExactActive }"
        >
            <li
                :class="[isExactActive && 'active']"
            >
                <a class="waves-effect waves-orange pointer" :href="link.url" @click="navigate">{{ link.title }}</a>
            </li>
        </router-link>
    </ul>


</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
    name: "Sidebar",
    props: ['modelValue'],
    data: () => ({
        links: [
            {title: localizeFilter('Menu_Bill'), url: '/'},
            {title: localizeFilter('Menu_History'), url: '/history'},
            {title: localizeFilter('Menu_Planning'), url: '/planning'},
            {title: localizeFilter('Menu_NewRecord'), url: '/record'},
            {title: localizeFilter('Menu_Categories'), url: '/categories'}
        ]
    })
}


</script>

<style scoped>

</style>
