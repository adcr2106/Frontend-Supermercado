import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';

import {
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuditContextService } from '../../core/audit-context.service';

import { EmpleadoService } from '../../core/services/empleado.service';

import {
  EmpleadoResponse
} from '../../models/empleado.models';

const SIDEBAR_KEY = 'shell_sidebar_collapsed';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    //RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent
  implements OnInit, AfterViewInit {

  private readonly empleadoService =
    inject(EmpleadoService);

  private readonly router =
    inject(Router);

  private readonly snack =
    inject(MatSnackBar);

  @ViewChild('sidenavShell')
  private sidenavShell?: MatSidenavContainer;

  readonly audit =
    inject(AuditContextService);

  readonly empleados =
    signal<EmpleadoResponse[]>([]);

  /** Menú lateral estrecho o ancho */
  readonly sidebarCollapsed = signal(
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(SIDEBAR_KEY) === '1',
  );

readonly nav = [
  {
    path: 'empleados',
    label: 'Empleados',
    icon: 'badge'
  },
  {
    path: 'clientes',
    label: 'Clientes',
    icon: 'groups'
  },
  {
    path: 'productos',
    label: 'Productos',
    icon: 'inventory_2'
  },
  {
    path: 'categorias',
    label: 'Categorías',
    icon: 'category'
  },
  {
    path: 'proveedores',
    label: 'Proveedores',
    icon: 'local_shipping'
  },
  {
    path: 'compras',
    label: 'Compras',
    icon: 'shopping_cart'
  },
  {
    path: 'pagos',
    label: 'Pagos',
    icon: 'payments'
  },
  {
    path: 'cajas',
    label: 'Cajas',
    icon: 'point_of_sale'
  },
  {
    path: 'jornadas',
    label: 'Jornadas',
    icon: 'schedule'
  }
];

  ngOnInit(): void {

    this.empleadoService.list().subscribe({
      next: (rows) =>
        this.empleados.set(rows),

      error: (err: HttpErrorResponse) =>
        this.snack.open(
          this.msg(err),
          'Cerrar',
          { duration: 5000 }
        ),
    });
  }

  ngAfterViewInit(): void {
    this.syncContentMarginsWithDrawer();
  }

  private syncContentMarginsWithDrawer(): void {

    const shell = this.sidenavShell;

    if (!shell) {
      return;
    }

    shell.updateContentMargins();
  }

  toggleSidebar(): void {

    const next =
      !this.sidebarCollapsed();

    this.sidebarCollapsed.set(next);

    localStorage.setItem(
      SIDEBAR_KEY,
      next ? '1' : '0'
    );

    queueMicrotask(() =>
      this.syncContentMarginsWithDrawer()
    );

    window.setTimeout(() =>
      this.syncContentMarginsWithDrawer(), 80);

    window.setTimeout(() =>
      this.syncContentMarginsWithDrawer(), 360);
  }

  onEmpleadoAudit(id: string): void {
    this.audit.select(id, this.empleados().find(e => e.id === id)?.documento || '');
  }

  logout(): void {

    this.audit.clear();

    void this.router.navigateByUrl('/login');
  }

  private msg(err: HttpErrorResponse): string {

    const d = err.error?.detail;

    if (typeof d === 'string') {
      return d;
    }

    if (Array.isArray(d)) {
      return d
        .map((x) => x.msg ?? JSON.stringify(x))
        .join('; ');
    }

    return err.message;
  }
}