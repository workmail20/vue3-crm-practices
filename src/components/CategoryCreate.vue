<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4> {{ $localize_Filter('CategoryCreate_Create') }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{invalid: v$.title.$error}"
                    >
                    <label for="name"> {{ $localize_Filter('CategoryCreate_name') }}</label>
                    <span
                        v-if="v$.title.$error"
                        class="helper-text invalid"
                    > {{ $localize_Filter('CategoryCreate_nameenter') }}</span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{invalid: v$.limit.$error}"
                    >
                    <label for="limit">{{ $localize_Filter('CategoryCreate_limit') }}</label>
                    <span
                        v-if="v$.limit.$error"
                        class="helper-text invalid"
                    >{{ $localize_Filter('CategoryCreate_minvalue') }} {{ v$.limit.minValue.$params['min'] }}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ $localize_Filter('CategoryCreate_Create') }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength, minValue} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import M from 'materialize-css'

export default {
    name: "CategoryCreate",
    data: () => ({
        title: '',
        limit: 100
    }),
    setup: () => ({v$: useVuelidate()}),
    validations() {
        return {
            title: {required, minLength: minLength(1)},
            limit: {minValue: minValue(100)}
        }
    },
    mounted() {
        M.updateTextFields()
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                // eslint-disable-next-line no-unused-vars
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                })
                this.title = ''
                this.limit = 100
                this.v$.$reset()
                this.$message(this.$localize_Filter('CategoryCreate_Created'))
                this.$emit('created', category)
// eslint-disable-next-line no-empty
            } catch (e) {
            }
        }
    }
}
</script>

<style scoped>

</style>
