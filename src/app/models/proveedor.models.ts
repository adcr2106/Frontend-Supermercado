export interface ProveedorCreate {
  nombre: string;
}

export interface ProveedorUpdate {
  nombre?: string | null;
}

export interface ProveedorResponse {
  id_proveedor: string;
  nombre: string;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}