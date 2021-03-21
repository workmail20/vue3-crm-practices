<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">{{ $localize_Filter('HomeCurrency_ExchangeRates') }}</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>{{ $localize_Filter('HomeCurrency_Currency') }}</th>
                        <th>{{ $localize_Filter('HomeCurrency_Rates') }}</th>
                        <th>{{ $localize_Filter('HomeCurrency_Date') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="cur of currencies"
                        :key="cur">
                        <td>{{ cur }}</td>
                        <td>{{ rates[cur].toFixed(5) }}</td>
                        <td>{{ dataFiltered() }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "HomeCurrency",
    props: ['rates', 'date'],
    data: () => ({
        currencies: ['RUB', 'USD', 'EUR']
    }),
    methods: {
        dataFiltered() {
            return this.$date_Filter(new Date(), 'date');
        }
    }
}
</script>

<style scoped>

</style>
