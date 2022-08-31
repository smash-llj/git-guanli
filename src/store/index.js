import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import showTab from './showTab'
import user from './user'
const store = new Vuex.Store({
    modules: {
        showTab,
        user
    }
})
export default store