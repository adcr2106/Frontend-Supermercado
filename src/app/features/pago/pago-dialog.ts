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

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pago-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],

  templateUrl: './pago-dialog.html',
})

export class PagoDialogComponent
implements OnInit {

  apiUrl =
    'http://localhost:8000/pagos';

  cajasUrl =
    'http://localhost:8000/cajas-registradoras';

  form!: FormGroup;

  saldo = 0;

  cajas: any[] = [];

  constructor(

    private fb: FormBuilder,

    private http: HttpClient,

    private dialogRef:
      MatDialogRef<PagoDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {

    this.saldo =
      data.total - data.total_pagado;

    this.form = this.fb.group({

      id_caja: [
        '',
        Validators.required
      ],

      metodo: [
        'EFECTIVO',
        Validators.required
      ],

      monto: [
        this.saldo,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

    });

  }

  ngOnInit(): void {

    this.obtenerCajas();

  }

  obtenerCajas(): void {

  console.log(this.cajasUrl);

  this.http.get<any[]>(
    `${this.cajasUrl}/`
  )
  .subscribe({

    next: (resp) => {

      console.log('RESPUESTA CAJAS');

      console.log(resp);

      this.cajas = resp;

    },

    error: (err) => {

      console.error('ERROR CAJAS');

      console.error(err);

    }

  });

}

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const monto =
      Number(this.form.value.monto);

    if (monto > this.saldo) {

      alert(
        'El monto supera el saldo pendiente'
      );

      return;

    }

    const body = {

      metodo:
        this.form.value.metodo,

      monto,

      id_caja:
        this.form.value.id_caja,

      id_compra:
        this.data.id,

    };

    this.http.post(
      `${this.apiUrl}/`,
      body
    )
    .subscribe({

      next: () => {

        alert(
          'Pago registrado correctamente'
        );

        this.dialogRef.close(true);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  cerrar(): void {

    this.dialogRef.close(false);

  }

}