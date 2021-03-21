<template>
    <div>
        <div class="page-title">
            <h3> {{ $localize_Filter('Record_newrecord') }}</h3>
        </div>
        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">{{ $localize_Filter('Record_nocategory') }}
            <router-link to="/categories">{{ $localize_Filter('Record_addcategory') }}</router-link>
        </p>

        <form class="form" v-else @submit.prevent="handleSubmit">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option
                        v-for="c in categories"
                        :key="c.id"
                        :value="c.id"
                    >
                        {{ c.title }}
                    </option>
                </select>
                <label>{{ $localize_Filter('Record_choosecategory') }}</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type"
                    />
                    <span>{{ $localize_Filter('Record_income') }}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome"
                        v-model="type"
                    />
                    <span>{{ $localize_Filter('Record_outcome') }}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="number"
                    v-model.number="amount"
                    :class="{invalid: v$.amount.$error}"
                >
                <label for="amount">{{ $localize_Filter('Record_amount') }}</label>
                <span
                    v-if="v$.amount.$error"
                    class="helper-text invalid"
                >{{ $localize_Filter('Record_minamount') }} {{ v$.amount.minValue.$params['min'] }}</span>
            </div>

            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="description"
                    :class="{invalid: v$.description.$error}"
                >
                <label for="description">{{ $localize_Filter('Record_description') }}</label>
                <span
                    v-if="v$.description.$error"
                    class="helper-text invalid">
                    {{ $localize_Filter('Record_enterdesc') }}
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ $localize_Filter('Record_create') }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import {minValue, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core";

import {mapGetters} from 'vuex'

import M from "materialize-css";

export default {
    name: "Record",
    title() {
        return 'Title_record'
    },
    data: () => ({
        loading: true,
        categories: [],
        select: null,
        category: null,
        type: 'outcome',
        amount: 1,
        description: ''
    }),
    setup: () => ({v$: useVuelidate()}),
    validations() {
        return {
            amount: {minValue: minValue(1)},
            description: {required, minLength: minLength(1)},
        }
    },
    computed: {
        ...mapGetters(['info']),
        canCreateRecord() {
            if (this.type === 'income') {
                return true
            }
            return this.info.bill >= this.amount
        }

    },
    methods: {
        async handleSubmit() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
// eslint-disable-next-line no-empty
            if (this.canCreateRecord) {
                try {

                    await this.$store.dispatch('createRecord', {
                        categoryId: this.category,
                        amount: this.amount,
                        description: this.description,
                        type: this.type,
                        date: new Date().toJSON()
                    })

                    const bill = this.type === 'income'
                        ? this.info.bill + this.amount
                        : this.info.bill - this.amount

                    await this.$store.dispatch('updateInfo', {bill})
                    this.$message(this.$localize_Filter('Record_recordcreated'))
                    this.v$.$reset()
                    this.amount = 1
                    this.description = ''
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }
            } else {
                this.$message(this.$localize_Filter('Record_noamount') + ` (${this.amount - this.info.bill})`)
            }

        }
    },

    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')

        this.loading = false

        if (this.categories.length) {
            this.category = this.categories[0].id
        }

        setTimeout(() => {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        }, 0)

    },
    unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
}
</script>

<style scoped>

</style>
