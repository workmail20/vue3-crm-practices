<template>
    <div>
        <Loader v-if="loading"/>
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">{{ $localize_Filter('Detail_history') }}</router-link>
                <a @click.prevent class="breadcrumb">
                    {{ record.type === 'income' ? $localize_Filter('Detail_income') : $localize_Filter('Detail_outcome') }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card"
                         :class="{
                        'red': record.type ==='outcome',
                        'green': record.type==='income'
                    }">
                        <div class="card-content white-text">
                            <p>{{ $localize_Filter('Detail_description') }}: {{ record.description }}</p>
                            <p>{{ $localize_Filter('Detail_amount') }}: {{ $currency_Filter(record.amount, 'RUB') }}</p>
                            <p>{{ $localize_Filter('Detail_category') }}: {{ record.categoryName }}</p>

                            <small>{{ $date_Filter(record.date, 'datetime') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else> {{ ids($route.params.id) }}</p>
    </div>

</template>

<script>
export default {
    name: "Detail",
    title() {
        return 'Title_detail'
    },
    data: () => ({
        record: null,
        loading: true
    }),
    async mounted() {
        // eslint-disable-next-line no-unused-vars
        const id = this.$route.params.id
        // eslint-disable-next-line no-unused-vars
        try {
            const record = await this.$store.dispatch('fetchRecordById', id)
            // eslint-disable-next-line no-unused-vars
            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

            // eslint-disable-next-line no-debugger

            this.record = {
                ...record,
                categoryName: category.title
            }
            // eslint-disable-next-line no-empty
        } catch (e) {

        }
        this.loading = false
    },
    methods: {
        ids(id) {
            // eslint-disable-next-line no-unreachable
            return this.$localize_Filter('Detail_recordid').replace("%", id);
        }
    }
}
</script>

<style scoped>

</style>
