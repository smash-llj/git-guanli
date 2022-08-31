const showTab={
    state:{
        isShow:false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null
    },
    mutations:{
        QIEHUAN(state){
            state.isShow=! state.isShow
        },
        TABSHOW(state, val) {

            //判断跳转路由的name是否等于tabList里面默认的name
            if (val.name !== 'home') {
                state.currentMenu = val
                //判断每一次跳转的路由name是否和tabList里面每一项的name是否重合，没有就添加，有我们把重合的删除
                const result = state.tabList.findIndex((item) => { return item.name === val.name })
                if (result === -1) {
                    state.tabList.push(val)

                } else {
                    console.log(result);
                    state.tabList.splice(result + 1, 1)
                }
            } else {
                //如果跳转的路由home下的name和tabList的home下的name重合，把数据进行初始化
                state.currentMenu = null
                state.tabList = [
                    {
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 'home'
                    }
                ]
            }
        }
    }
}
 export default showTab