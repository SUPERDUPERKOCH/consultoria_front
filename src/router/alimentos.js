import Crud from '../views/Alimento/Crud'
import Entity from '../views/Alimento/Add'

let routes = {
    path: '/alimentos',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/alimentos/add',
            name: 'NewAlimento',
            component: Entity
        },
        {
            path: '/alimentos/edit/:id?',
            name: 'EditAlimento',
            component: Entity
        },
        {
            path: '/alimentos',
            name: 'list-alimentos',
            component: Crud,
            meta: {
                pageTitle: 'Lista de alimentos',
                breadcrumb: [
                    {
                        text: 'Alimentos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
