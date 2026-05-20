import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { EmpleadoDialogComponent } from './empleado-dialog';

@Component({
  selector: 'app-empleados-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './empleados-list.html',

  styleUrls: ['./empleados-list.scss'],
})

export class EmpleadosListComponent implements OnInit {

  empleados: any[] = [];

  displayedColumns: string[] = [
    'documento',
    'nombre',
    'cargo',
    'salario',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/empleados';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.empleados = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(empleado?: any): void {

    const dialogRef = this.dialog.open(
      EmpleadoDialogComponent,
      {
        width: '500px',

        data: empleado
          ? {
              mode: 'edit',
              row: empleado
            }
          : {
              mode: 'create'
            }
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerEmpleados();
        }

      });
  }

  eliminarEmpleado(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerEmpleados();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarEmpleado(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerEmpleados();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}
