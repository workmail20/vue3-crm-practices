<template>
    <div>
        <div class="page-title">
            <h3>{{ $localize_Filter('ProfileTitle') }}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="name"
                    :class="{invalid: v$.name.$error}"
                >
                <label for="description">{{ $localize_Filter('Name') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.name.$dirty"
                >{{ $localize_Filter('Message_EnterName') }}</small>
            </div>
            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRuLocale">
                    <span class="lever"></span>
                    Русский
                </label>
            </div>
            <button class="btn waves-effect waves-light" type="submit">
                {{ $localize_Filter('Update') }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import M from 'materialize-css'
import {mapGetters, mapActions} from 'vuex'
import {minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";


export default {
    name: "Profile",
    title() {
        return 'Title_profile'
    },
    data: () => ({
        name: '',
        isRuLocale: true
    }),
    setup() {
        //this.title=this.$localize_Filter('Title_profile')
        return {v$: useVuelidate()};
    },
    validations() {
        return {
            name: {required, minLength: minLength(1)},
        }
    },
    mounted() {
        this.name = this.info.name
        this.isRuLocale = this.info.locale === 'ru-RU'
        setTimeout(function () {
            M.updateTextFields()
        })
    },
    computed: {
        ...mapGetters(['info'])
    },
    methods: {
        ...mapActions(['updateInfo']),
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                // this.v$.$reset()
                return
            }

            // eslint-disable-next-line no-useless-catch,no-empty
            try {
                await this.updateInfo({
                    name: this.name,
                    locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                })
                // eslint-disable-next-line no-unused-vars
                const prevented = window.dispatchEvent(new Event("change_title"));
            } catch (e) {
                throw e
            }
        }
    }
}
</script>

<style scoped>
.switch {
    margin-bottom: 2rem;
}
</style>
