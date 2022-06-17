import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const UsersPage = Loadable(lazy(() => import('./UsersPage')))

const usersRoutes = [
    {
        path: '/usuarios',
        element: <UsersPage />,
        auth: authRoles.admin,
    },
]

export default usersRoutes
