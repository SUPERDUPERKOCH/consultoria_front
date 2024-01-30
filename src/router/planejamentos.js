import Crud from '../views/Planejamento/Crud'
import View from '../views/Planejamento/View'
import Dieta from '../views/Planejamento/Dieta'

let routes = {
    path: '/planejamentos',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [

        {
            path: '/planejamentos/view/:id?',
            name: 'ViewPlanejamento',
            component: View
        },

        {
            path: '/planejamentos/dieta/:id?',
            name: 'DietaPlanejamento',
            component: Dieta
        },
        
        {
            path: '/planejamentos',
            name: 'list-planejamentos',
            component: Crud,
            meta: {
                pageTitle: 'Lista de planejamentos',
                breadcrumb: [
                    {
                        text: 'Planejamentos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
