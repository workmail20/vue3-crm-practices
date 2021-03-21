<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{ $localize_Filter('Login_bookkeeping') }}</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model="email"
                    :class="{invalid: v$.email.$error}"
                >
                <label for="email">{{ $localize_Filter('Login_email') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.email.$dirty && v$.email.required.$invalid"
                >{{ $localize_Filter('Login_email1') }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="v$.email.$dirty && v$.email.$error"
                >{{ $localize_Filter('Login_email2') }}</small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    :class="{invalid: v$.password.$error}"
                >
                <label for="password">{{ $localize_Filter('Login_password') }}</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.password.$dirty && v$.password.required.$invalid"
                >{{ $localize_Filter('Login_password1') }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="v$.password.$dirty && v$.password.$error"
                >{{ $localize_Filter('Login_password2') }} {{ password.length }}</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    {{ $localize_Filter('Login_login') }}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{ $localize_Filter('Login_noacc') }}
                <router-link to="/register">{{ $localize_Filter('Login_register') }}</router-link>
            </p>
        </div>
    </form>

</template>

<script>
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import messages from '@/utils/messages'


export default {
    name: "Login",
    title() {
        return 'Title_login'
    },
    data: () => ({
        email: '',
        password: ''
    }),
    setup: () => ({v$: useVuelidate()}),
    validations() {
        return {
            email: {email, required, minLength: minLength(1)},
            password: {required, minLength: minLength(6)}
        }
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                // this.v$.$reset()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }

            // eslint-disable-next-line no-useless-catch
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/')
            } catch (e) {
                throw e
            }
        }
    }
}
</script>

<style scoped>

</style>
