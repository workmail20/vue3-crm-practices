<template>
    <div>
        <Loader v-if="loading"/>
        <div class="app-main-layout" v-else>

            <Navbar v-on:change_isopen="isOpen = !isOpen"/>

            <Sidebar v-model="isOpen" :key="locale"/>

            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view/>
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link class="btn-floating btn-large blue" to="/record"
                             v-tooltip="r">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
//import messages from "@/layouts/EmptyLayout";
import messages from '@/utils/messages/'
//import localizeFilter from './filters/localize.filter.js'

export default {
    name: "main-layout",
    data: () => ({
            isOpen: true,
            loading: true,
            r: ''
        }

    ),
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        this.r = this.$localize_Filter('Create_newRecord');
        this.loading = false
    },
    components: {
        Navbar, Sidebar
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        locale() {
            return this.$store.getters.info.locale
        }
    },
    watch: {
        /*        locale(){
                    console.log('Locale changed')
                },*/
        error(fbError) {
            this.$error(messages[fbError.code] || this.$localize_Filter('ERROR1'))
        }
    }
}
</script>

<style scoped>

</style>
