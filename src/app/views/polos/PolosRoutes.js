import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const PolosPage = Loadable(lazy(() => import('./PolosPage')))

const polosRoutes = [
    {
        path: '/polos',
        element: <PolosPage />,
        auth: authRoles.admin,
    },
]

export default polosRoutes
