import Cookie from "js-cookie"
export default {
    state: {
        isCollaspe: false,
        menu: []
    },
    mutations: {
        collaspeMenu(state) {
            state.isCollaspe = !state.isCollaspe
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArr = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            import (`../views/${item.url}`)
                        return item
                    })
                    menuArr.push(...item.children)
                } else {
                    item.component = () =>
                        import (`../views/${item.url}`)
                    menuArr.push(item)
                }
            });
            menuArr.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}