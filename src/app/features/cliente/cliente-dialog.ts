import { CommonModule } from '@angular/common';

import {
  Component,
  Inject
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cliente-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './cliente-dialog.html',
})

export class ClienteDialogComponent {

  apiUrl = 'http://localhost:8000/clientes';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ClienteDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.form = this.fb.group({

      documento: [
        '',
        Validators.required
      ],

      nombre: [
        '',
        Validators.required
      ],

      telefono: [''],

      correo: [
        '',
        Validators.email
      ],

    });

    if (data) {

      this.form.patchValue({
        documento: data.documento,
        nombre: data.nombre,
        telefono: data.telefono,
        correo: data.correo,
      });

    }
  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const body = this.form.value;

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

    } else {

      this.http.post(
        `${this.apiUrl}/`,
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
  }

  cerrar(): void {
    this.dialogRef.close(false);
  }
}