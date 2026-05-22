import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { JornadaDialogComponent } from './jornada-dialog';

@Component({
  selector: 'app-jornada-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './jornada-list.html',

  styleUrls: ['./jornada-list.scss'],
})

export class JornadaListComponent implements OnInit {

  jornadas: any[] = [];

  displayedColumns: string[] = [
    'id_empleado',
    'id_caja',
    'inicio_jornada',
    'fin_jornada',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/jornadas';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerJornadas();
  }

  obtenerJornadas(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.jornadas = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(): void {

    const dialogRef = this.dialog.open(
      JornadaDialogComponent,
      {
        width: '500px'
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerJornadas();
        }

      });
  }

  cerrarJornada(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/cerrar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerJornadas();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }

  eliminarJornada(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerJornadas();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarJornada(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerJornadas();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}