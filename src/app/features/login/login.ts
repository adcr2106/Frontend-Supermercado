import { HttpErrorResponse } from '@angular/common/http';

import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatProgressSpinnerModule }
from '@angular/material/progress-spinner';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { AuditContextService }
from '../../core/audit-context.service';

import { EmpleadoService }
from '../../core/services/empleado.service';

import {
  EmpleadoCreate,
  EmpleadoLogin,
  EmpleadoResponse
} from '../../models/empleado.models';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],

  templateUrl: './login.html',

  styleUrl: './login.scss',
})

export class LoginComponent implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  private readonly empleadoService =
    inject(EmpleadoService);

  private readonly audit =
    inject(AuditContextService);

  private readonly router =
    inject(Router);

  private readonly snack =
    inject(MatSnackBar);

  readonly loading =
    signal(true);

  readonly empleados =
    signal<EmpleadoResponse[]>([]);

  readonly loginForm =
    this.fb.nonNullable.group({

      documento: [
        '',
        Validators.required
      ],

      contrasena: [
        '',
        Validators.required
      ],

    });

  readonly firstEmpleadoForm =
    this.fb.nonNullable.group({

      documento: [
        '',
        Validators.required
      ],

      nombre: [
        '',
        Validators.required
      ],

      salario: [
        0,
        Validators.required
      ],

      cargo: [
        '',
        Validators.required
      ],

      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],

      telefono: [''],

      correo: [
        '',
        Validators.email
      ],

    });

  ngOnInit(): void {

    this.reload();

  }

  reload(): void {

    this.loading.set(true);

    this.empleadoService
      .list()
      .subscribe({

        next: (rows) => {

          this.empleados.set(rows);

          this.loading.set(false);

        },

        error: (err: HttpErrorResponse) => {

          this.loading.set(false);

          this.snack.open(

            this.msg(err),

            'Cerrar',

            {
              duration: 6000
            }

          );

        },

      });

  }

  ingresar(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    const body: EmpleadoLogin =

      this.loginForm.getRawValue();

    this.empleadoService
      .login(body)
      .subscribe({

        next: (empleado) => {

          // GUARDAR ID Y DOCUMENTO
          this.audit.select(

            empleado.id,

            empleado.documento

          );

          void this.router.navigateByUrl(
            '/app'
          );

        },

        error: (err: HttpErrorResponse) => {

          this.snack.open(

            this.msg(err),

            'Cerrar',

            {
              duration: 5000
            }

          );

        },

      });

  }

  crearPrimero(): void {

    if (this.firstEmpleadoForm.invalid) {

      this.firstEmpleadoForm.markAllAsTouched();

      return;

    }

    const v =
      this.firstEmpleadoForm.getRawValue();

    const body: EmpleadoCreate = {

      documento: v.documento,

      nombre: v.nombre,

      salario: Number(v.salario),

      cargo: v.cargo,

      contrasena: v.contrasena,

      telefono: v.telefono || null,

      correo: v.correo || null,

      creado_por: 'sistema',

    };

    this.empleadoService
      .create(body)
      .subscribe({

        next: (created) => {

          this.empleados.set([

            ...this.empleados(),

            created

          ]);

          // GUARDAR ID Y DOCUMENTO
          this.audit.select(

            created.id,

            created.documento

          );

          void this.router.navigateByUrl(
            '/app'
          );

        },

        error: (err: HttpErrorResponse) => {

          this.snack.open(

            this.msg(err),

            'Cerrar',

            {
              duration: 6000
            }

          );

        },

      });

  }

  private msg(
    err: HttpErrorResponse
  ): string {

    const d =
      err.error?.detail;

    if (typeof d === 'string') {

      return d;

    }

    if (Array.isArray(d)) {

      return d
        .map(

          (x) =>

            x.msg ??

            JSON.stringify(x)

        )
        .join('; ');

    }

    return err.message;

  }

}