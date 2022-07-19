import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const RegistrationPage = Loadable(lazy(() => import('./RegistrationPage')))

const registrationRoutes = [
    {
        path: '/registration',
        element: <RegistrationPage />,
        auth: authRoles.admin,
    },
]

export default registrationRoutes
