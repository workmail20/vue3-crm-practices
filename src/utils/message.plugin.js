import M from 'materialize-css'

export default {
    // eslint-disable-next-line no-unused-vars
    install(app, options) {
        app.config.globalProperties.$message = function (html) {
            M.toast({html})
        },

            app.config.globalProperties.$error = function (html) {
                M.toast({html: `[error]: ${html}`})
            }
    }
}
