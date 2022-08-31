import cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        SETTOKEN(state, val) {
            state.token = val
            cookie.set('token', val)
        },
        CLEARTOKEN(state) {
            state.token = ''
            cookie.remove('token')
        },
        GETTOKEN(state) {
            state.token = state.token || cookie.get('token')
        }
    }
}