export interface CategoriaCreate {
  nombre: string;
}

export interface CategoriaUpdate {
  nombre?: string | null;
}

export interface CategoriaResponse {
  id_categoria: string;
  nombre: string;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}