import localizeFilter from '../filters/localize.filter.js'

export default {
    install(Vue) {
        Vue.config.globalProperties.$title = function (titleKey) {
            const appName = process.env.VUE_APP_TITLE
            return `${localizeFilter(titleKey)} | ${appName}`
        }
    }
}
