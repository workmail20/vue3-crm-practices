<template>
    <div>
        <div class="page-title">
            <h3> {{ $localize_Filter('Categories_categories') }}</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory"/>
                <CategoryEdit
                    v-if="categories.length"
                    :categories="categories"
                    :key="categories.length + updateCount"
                    @updated="updateCategories"
                />
                <p v-else class="center">{{ $localize_Filter('Categories_nocategories') }}</p>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
    name: "Categories",
    title() {
        return 'Title_categories'
    },
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }),
    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
    },
    components: {
        CategoryCreate, CategoryEdit
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategories(category) {
            // eslint-disable-next-line no-unused-vars
            const idx = this.categories.findIndex(c => c.id === category.id)
            this.categories[idx].limit = category.limit
            this.categories[idx].title = category.title
            this.updateCount++
        }
    }
}
</script>

<style scoped>

</style>
