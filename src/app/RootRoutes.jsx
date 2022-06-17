import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import usersRoutes from './views/users/UsersRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/usuarios" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
