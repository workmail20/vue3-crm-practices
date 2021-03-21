<template>
    <div>
        <div class="page-title">
            <h3>{{ $localize_Filter('Planning_Planning') }}</h3>
            <h4>{{ info_bill }}</h4>
        </div>

        <Loader v-if="loading"/>

        <section v-else>
            <div v-for="cat of categories" :key="cat.id">
                <p>
                    <strong>{{ cat.title }}:</strong>
                    {{ cf(cat.spend) }} {{ $localize_Filter('Planning_from') }} {{ cf(cat.limit) }}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                    <div
                        class="determinate"
                        :class="[cat.progressColor]"
                        :style="{width: cat.progressPercent + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
    name: "Planning",
    title() {
        return 'Title_planning'
    },
    data: () => ({
        loading: true,
        currencies: ['RUB', 'USD', 'EUR'],
        currency: null,
        info_bill: 0
    }),
    computed: {
        ...mapGetters(['info'])
    },
    async mounted() {

        this.currency = await this.$store.dispatch('fetchCurrency')

        // eslint-disable-next-line no-unused-vars
        const records = await this.$store.dispatch('fetchRecords')
        // eslint-disable-next-line no-unused-vars
        const categories = await this.$store.dispatch('fetchCategories')
        this.info_bill = this.$currency_Filter(this.info.bill, 'RUB')

        this.categories = categories.map(cat => {
            const spend = records
                .filter(r => r.categoryId === cat.id)
                .filter(r => r.type === 'outcome')
                .reduce((total, record) => {
                    return total += +record.amount
                }, 0)
            const percent = (100 * spend / cat.limit)
            const progressPercent = percent > 100 ? 100 : percent
            const progressColor = percent < 60
                ? 'green'
                : percent < 100
                    ? 'yellow'
                    : 'red'

            const tooltipValue = cat.limit - spend
            const tooltip = `${tooltipValue < 0 ? this.$localize_Filter('Planning_Excessby') : this.$localize_Filter('Planning_Left')} ${currencyFilter(Math.abs(tooltipValue))}`

            return {
                ...cat,
                progressPercent,
                progressColor,
                spend,
                tooltip
            }
        })

        this.loading = false
    },
    methods: {
        cf(c) {
            return this.$currency_Filter(c, 'RUB')
        }
    }
}
</script>

<style scoped>

</style>
