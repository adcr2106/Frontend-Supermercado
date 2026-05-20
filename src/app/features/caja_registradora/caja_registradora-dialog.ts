import { CommonModule } from '@angular/common';

import {
  Component,
  Inject
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-caja-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],

  templateUrl: './caja_registradora-dialog.html',
})

export class CajaRegistradoraDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<CajaRegistradoraDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  cerrar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}