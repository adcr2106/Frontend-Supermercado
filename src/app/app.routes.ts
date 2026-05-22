import { Routes } from '@angular/router';

import { auditUserGuard } from './core/audit-user.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',

    loadComponent: () =>
      import('./features/login/login')
        .then((m) => m.LoginComponent),
  },

  {
    path: 'app',

    canActivate: [auditUserGuard],

    loadComponent: () =>
      import('./features/shell/main-layout')
        .then((m) => m.MainLayoutComponent),

    children: [

      {
        path: '',
        redirectTo: 'categorias',
        pathMatch: 'full'
      },

      {
        path: 'categorias',

        loadComponent: () =>
          import('./features/categoria/categoria-list')
            .then((m) => m.CategoriaListComponent),
      },

      {
        path: 'proveedores',

        loadComponent: () =>
          import('./features/proveedor/proveedor-list')
            .then((m) => m.ProveedorListComponent),
      },

      {
        path: 'empleados',

        loadComponent: () =>
          import('./features/empleado/empleados-list')
            .then((m) => m.EmpleadosListComponent),
      },

      {
        path: 'productos',

        loadComponent: () =>
          import('./features/producto/productos-list')
            .then((m) => m.ProductosListComponent),
      },

      {
        path: 'clientes',

        loadComponent: () =>
          import('./features/cliente/cliente-list')
            .then((m) => m.ClienteListComponent),
      },

      {
        path: 'cajas',

        loadComponent: () =>
          import('./features/caja_registradora/caja_registradora-list')
            .then((m) => m.CajaRegistradoraListComponent),
      },

      {
        path: 'jornadas',

        loadComponent: () =>
          import('./features/jornada/jornada-list')
            .then((m) => m.JornadaListComponent),
      },

      {
        path: 'compras',

        loadComponent: () =>
          import('./features/compra/compra-list')
            .then((m) => m.CompraListComponent),
      },

      {
        path: 'detalle_compra',

        loadComponent: () =>
          import('./features/detalle_compra/detalle_compra-list')
            .then((m) => m.DetalleCompraListComponent),
      },

      {
        path: 'pagos',

        loadComponent: () =>
          import('./features/pago/pago-list')
            .then((m) => m.PagoListComponent),
      },


    ],
  },

  {
    path: '**',
    redirectTo: 'login'
  },

];
