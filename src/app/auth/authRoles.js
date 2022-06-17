export const authRoles = {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'ADMIN'], // Only SA & Admin has access
    editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
    guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
}

// Check out app/views/users/DashboardRoutes.js
// Only SA & Admin has users access

// const dashboardRoutes = [
//   {
//     path: "/users/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];

// Check navigaitons.js

// {
//   name: "users",
//   path: "/users/analytics",
//   icon: "users",
//   auth: authRoles.admin <=================
// }
