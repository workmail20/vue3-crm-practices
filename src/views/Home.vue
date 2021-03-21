<template>
    <div>
        <div class="page-title">
            <h3> {{ this.$localize_Filter('Home_account') }}</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading"/>


        <div v-else class="row">
            <HomeBill
                :rates="currency.rates"
            />

            <HomeCurrency
                :rates="currency.rates"
                :date="currency.date"
            />


        </div>
    </div>
</template>


<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
// @ is an alias to /src

export default {
    name: 'Home',
    title() {
        return 'Title_home'
    },
    data: () => ({
        loading: true,
        currency: null
    }),
    async mounted() {
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
        //  console.log(this.currency)
    },
    methods: {
        async refresh() {
            this.loading = true
            this.currency = await this.$store.dispatch('fetchCurrency')
            this.loading = false
        }
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        HomeBill, HomeCurrency
    }
}
</script>
