<template>
    <div>
        <div class="page-title">
            <h3>{{ $localize_Filter('History_recordhistory') }}</h3>
        </div>

        <div style="text-align: center; margin: 0 auto;width: 400px;">
            <Chart :chartData="chartData" :chartOptions="chartOptions"/>
        </div>

        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">{{ $localize_Filter('History_norecord') }}
            <router-link to="/record">{{ $localize_Filter('History_addfirst') }}</router-link>
        </p>
        <section v-else>
            <HistoryTable :records="items"/>
            <br>
            <v-pagination
                v-model="page"
                :pages="pageCount"
                :range-size="1"
                active-color="#DCEDFF"
                @update:modelValue="pageChangeHandler"
            />
<!--            <pagination v-model="page" :records="items.length" :per-page="pageCount" @paginate="pageChangeHandler"
            />-->

        </section>
    </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from "@/components/HistoryTable";
// eslint-disable-next-line no-unused-vars
import Chart from '@/components/Chart'
import {defineComponent} from 'vue'

import VPagination from "vue3-pagination";
import "vue3-pagination/dist/vue3-pagination.css";

export default defineComponent({
    name: "History",
    title() {
        return 'Title_history'
    },
    //    extends: Pie,
    mixins: [paginationMixin],
    data: () => ({
        loading: true,
        records: [],
        categories: [],
        chartData: {},
        chartOptions: {}
    }),
    async mounted() {
        // eslint-disable-next-line no-unused-vars
        //    this.records = await this.$store.dispatch('fetchRecords')
        this.records = await this.$store.dispatch('fetchRecords')
        // eslint-disable-next-line no-unused-vars
        this.categories = await this.$store.dispatch('fetchCategories')
        this.setup(this.categories)

        this.loading = false
    },
    methods: {
        setup(categories) {
            this.setupPagination(this.records.map(record => {
                return {
                    ...record,
                    categoryName: categories.find(c => c.id === record.categoryId).title,
                    typeClass: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ? this.$localize_Filter('Detail_income') : this.$localize_Filter('Detail_outcome')
                }
            }))
            this.chartData = {
                labels: categories.map(c => c.title),
                datasets: [{
                    label: this.$localize_Filter('History_outcomecategory'),
                    data: categories.map(c => {
                        return this.records.reduce((total, r) => {
                            if (r.categoryId === c.id && r.type === 'outcome') {
                                total += +r.amount
                            }
                            return total
                        }, 0)
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        }
    },
    components: {
        HistoryTable, Chart,VPagination
    }
})
</script>
