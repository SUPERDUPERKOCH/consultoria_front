import Crud from '../views/Aluno/Crud'
import Entity from '../views/Aluno/Add'

let routes = {
    path: '/alunos',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/alunos/add',
            name: 'NewAluno',
            component: Entity
        },
        {
            path: '/alunos/edit/:id?',
            name: 'EditAluno',
            component: Entity
        },
        {
            path: '/alunos',
            name: 'list-alunos',
            component: Crud,
            meta: {
                pageTitle: 'Lista de alunos',
                breadcrumb: [
                    {
                        text: 'Alunos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
