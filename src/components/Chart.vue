<script>
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'

export default defineComponent({
    name: 'Chart',
    extends: Pie,
    props: {
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            required: false
        },
    },
    watch: {
        chartData: function () {
            this.renderChart(this.chartData, this.chartOptions)
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.chartOptions)
    }
})
</script>
