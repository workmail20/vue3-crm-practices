<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{ $localize_Filter('Register_bookkeeping') }}</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model="email"
                    :class="{invalid: v$.email.$error}"
                >
                <label for="email">{{ $localize_Filter('Register_email') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.email.$dirty && v$.email.required.$invalid"
                >{{ $localize_Filter('Register_email1') }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="v$.email.$dirty && v$.email.$error"
                >{{ $localize_Filter('Register_email2') }}</small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    :class="{invalid: v$.password.$error}"
                >
                <label for="password">{{ $localize_Filter('Register_password') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.password.$dirty && v$.password.required.$invalid"
                >{{ $localize_Filter('Register_password1') }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="v$.password.$dirty && v$.password.$error"
                >{{ $localize_Filter('Register_password2') }} {{ password.length }}</small>
            </div>
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model="name"
                    :class="{invalid: v$.name.$error}"
                >
                <label for="name">{{ $localize_Filter('Register_Name') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.name.$dirty && v$.name.$error"
                >{{ namel(name.length) }}</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree"/>
                    <span>{{ $localize_Filter('Register_accrul') }}</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    {{ $localize_Filter('Register_register') }}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{ $localize_Filter('Register_regacc') }}
                <router-link to="/login">{{ $localize_Filter('Register_login') }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core";

export default {
    name: "Register",
    title() {
        return 'Title_register'
    },
    data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false
    }),
    setup: () => ({v$: useVuelidate()}),
    validations() {
        return {
            email: {email, required, minLength: minLength(1)},
            password: {required, minLength: minLength(6)},
            name: {required, minLength: minLength(6)},
            agree: {checked: v => v}
        }
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }
            try {
                await this.$store.dispatch('register', formData)
                this.$router.push('/')
// eslint-disable-next-line no-empty
            } catch (e) {

            }
        },
        namel(c) {
            // eslint-disable-next-line no-unreachable
            return this.$localize_Filter('Register_Name2').replace("%", c);
        }
    }
}

</script>

<style scoped>

</style>
