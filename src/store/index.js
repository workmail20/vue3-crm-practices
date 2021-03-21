import {createStore} from 'vuex'
import auth from './auth.js'
import info from './info'

import category from './category'
import record from './record'

export default createStore({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER

            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,RUB&cachebuster=` + Math.random())
            const res2 = await res.json();
            return res2
        }
    },
    modules: {
        auth, info, category, record
    },
    getters: {
        error: s => s.error
    }
})
