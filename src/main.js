import {createApp} from 'vue'
import Pagination from 'v-pagination-3';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'

// eslint-disable-next-line no-unused-vars
import tooltipDirective from '@/directives/tooltip.directive'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Loader from '@/components/app/Loader'


firebase.initializeApp({
    apiKey: "AIzaSyBK5u9sY89bpOnyXH4EF38Me8cb0laTsPo",
    authDomain: "vue-maincrm.firebaseapp.com",
    projectId: "vue-maincrm",
    storageBucket: "vue-maincrm.appspot.com",
    messagingSenderId: "962303243612",
    appId: "1:962303243612:web:a500aeccff773ac611fd99",
    measurementId: "G-3PGQKDS8RK"
})
import dateFilter from './filters/date.filter.js'
import currencyFilter from './filters/currency.filter.js'
import localizeFilter from './filters/localize.filter.js'

import titlePlugin from './utils/title.plugin.js'
//import VuePageTitle from 'vue-page-title'
import titleMixin from './utils/titleMixin'

let app

firebase.auth().onAuthStateChanged(() => {
        if (!app) {
            app = createApp(App)
            app.use(store).use(router).mount('#app')
            app.use(messagePlugin)

            app.directive('tooltip', tooltipDirective)
            app.component('Pagination', Pagination);
            app.component('Loader', Loader)

            app.config.globalProperties.$date_Filter = dateFilter;
            app.config.globalProperties.$currency_Filter = currencyFilter;
            app.config.globalProperties.$localize_Filter = localizeFilter;
            // app.use(VuePageTitle,{ suffix: '- My App '})
            app.mixin(titleMixin)
            app.use(titlePlugin)
        }
    }
)
//app.use(Vuelidate)

