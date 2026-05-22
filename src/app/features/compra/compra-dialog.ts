import { CommonModule } from '@angular/common';

import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { AuditContextService }
from '../../core/audit-context.service';

@Component({
  selector: 'app-compra-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './compra-dialog.html',
})

export class CompraDialogComponent implements OnInit {

  apiUrl = 'http://localhost:8000/compras';

  form!: FormGroup;

  // EMPLEADO EN SESIÓN
  empleadoSesion = '';

  constructor(

    private fb: FormBuilder,

    private http: HttpClient,

    private router: Router,

    private audit: AuditContextService,

    private dialogRef: MatDialogRef<CompraDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {

    // OBTENER EMPLEADO ACTIVO
    this.empleadoSesion =
      this.audit.empleadoDocumento() || '';

    // VALIDAR SESIÓN
    if (!this.empleadoSesion) {

      alert('No hay empleado en sesión');

      this.dialogRef.close();

    }

    this.form = this.fb.group({

      doc_cliente: [
        '',
        Validators.required
      ],

      doc_empleado: [
        {
          value: this.empleadoSesion,
          disabled: true
        }
      ],

      total: [
        {
          value: 0,
          disabled: true
        }
      ],

    });

  }

  ngOnInit(): void {

    if (this.data) {

      this.form.patchValue({

        doc_cliente: this.data.doc_cliente,

        doc_empleado: this.data.doc_empleado,

        total: this.data.total,

      });

    }

  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const body = {

      total: 0,

      doc_cliente:
        this.form.getRawValue().doc_cliente,

      doc_empleado:
        this.empleadoSesion,

    };

    // EDITAR
    if (this.data) {

      this.http.put(

        `${this.apiUrl}/${this.data.id}`,
        body

      )
      .subscribe({

        next: () => {

          this.dialogRef.close(true);

        },

        error: (err) => {

          console.error(err);

        }

      });

    }

    // CREAR
    else {

      this.http.post(

        `${this.apiUrl}/`,
        body

      )
      .subscribe({

        next: (resp: any) => {

          // GUARDAR COMPRA ACTUAL
          localStorage.setItem(
            'compra_actual',
            JSON.stringify(resp)
          );

          // CERRAR DIALOG
          this.dialogRef.close(true);

          // IR A DETALLE
          this.router.navigate(
  ['/app/detalle_compra'],
  {
    queryParams: {
      id_compra: resp.id
    }
  }
);

        },

        error: (err) => {

          console.error(err);

        }

      });

    }

  }

  cerrar(): void {

    this.dialogRef.close(false);

  }

}