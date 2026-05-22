export interface ClienteCreate {
  documento: string;
  nombre: string;
  telefono?: string | null;
  correo?: string | null;
  creado_por?: string | null;
}

export interface ClienteUpdate {
  documento?: string | null;
  nombre?: string | null;
  telefono?: string | null;
  correo?: string | null;
  actualizado_por?: string | null;
}

export interface ClienteResponse {
  id: string;
  documento: string;
  nombre: string;
  telefono?: string | null;
  correo?: string | null;
  creado_por?: string | null;
  actualizado_por?: string | null;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}