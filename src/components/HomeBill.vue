<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{ $localize_Filter('HomeBill_currencyaccount') }}</span>

                <p
                    v-for="cur of currencies"
                    :key="cur"
                    class="currency-line">
                    <span>
                        {{ getCurrency(cur) }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeBill",
    props: ['rates'],
    data: () => ({
        currencies: ['RUB', 'USD', 'EUR']
    }),
    computed: {
        base() {
            return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        }
    },
    methods: {
        getCurrency(currency) {
            return this.$currency_Filter(Math.floor(this.base * this.rates[currency]), currency)
        },
        formatNumber(value, cur) {
            if (!value) return ''
            return Number(value).toLocaleString('en', {
                style: 'currency', currency: cur
            })
        }
    }
}
</script>

<style scoped>

</style>
