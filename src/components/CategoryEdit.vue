<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ $localize_Filter('CategoryEdit_Edit') }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                            v-for="c of categories"
                            :key="c.id"
                            :value="c.id"
                        >{{ c.title }}
                        </option>
                    </select>
                    <label>{{  $localize_Filter('CategoryEdit_ChooseCategory') }}</label>
                </div>
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{invalid: v$.title.$error}"
                    >
                    <label for="name">{{  $localize_Filter('CategoryEdit_Name') }}</label>
                    <span
                        v-if="v$.title.$error"
                        class="helper-text invalid"
                    >{{  $localize_Filter('CategoryEdit_NameCategory') }}</span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{invalid: v$.limit.$error}"
                    >
                    <label for="limit">{{  $localize_Filter('CategoryEdit_limit') }}</label>
                    <span
                        v-if="v$.limit.$error"
                        class="helper-text invalid"
                    >{{  $localize_Filter('CategoryEdit_MinValue') }} {{ v$.limit.minValue.$params['min'] }}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{  $localize_Filter('CategoryEdit_Update') }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {minLength, minValue, required} from "@vuelidate/validators";
import M from 'materialize-css'

export default {
    name: "CategoryEdit",
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        select: null,
        title: '',
        limit: 100,
        current: null
    }),
    setup: () => ({v$: useVuelidate()}),
    validations() {
        return {
            title: {required, minLength: minLength(1)},
            limit: {minValue: minValue(100)}
        }
    },
    watch: {
// eslint-disable-next-line no-unused-vars
        current(catId) {
            const {title, limit} = this.categories.find(c => c.id === catId)
            this.title = title
            this.limit = limit
        }
    },
    created() {
        const {id, title, limit} = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                await this.$store.dispatch('updateCategory', categoryData)
                this.$message(this.$localize_Filter('CategoryEdit_wasUpdate'))
                this.$emit('updated', categoryData)
                // eslint-disable-next-line no-empty
            } catch (e) {
            }
        }
    },
    mounted() {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
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
