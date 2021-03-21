<template>

    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>{{ $localize_Filter('HistoryTable_sum') }}</th>
            <th>{{ $localize_Filter('HistoryTable_date') }}</th>
            <th>{{ $localize_Filter('HistoryTable_category') }}</th>
            <th>{{ $localize_Filter('HistoryTable_type') }}</th>
            <th>{{ $localize_Filter('HistoryTable_open') }}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(record, idx) of records" :key="record.id">
            <td> {{ idx + 1 }}</td>
            <td> {{ $currency_Filter(record.amount, 'RUB') }}</td>
            <td> {{ $date_Filter(record.date, 'datetime') }}</td>
            <td> {{ record.categoryName }}</td>
            <td>
                        <span
                            :class="[record.typeClass]"
                            class="white-text badge"
                        > {{ record.typeText }}</span>
            </td>
            <td>
                <button
                    v-tooltip="$localize_Filter('HistoryTable_showrecord')"
                    class="btn-small btn" @click="$router.push('/detail/' + record.id)">
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "HistoryTable",
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped>

</style>
