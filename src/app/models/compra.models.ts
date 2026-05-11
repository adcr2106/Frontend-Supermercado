export interface CompraCreate {
  total: number;
  doc_cliente: string;
  doc_empleado: string;
}

export interface CompraUpdate {
  total?: number | null;
  doc_cliente?: string | null;
  doc_empleado?: string | null;
}

export interface CompraResponse {
  id: string;
  total: number;
  doc_cliente: string;
  doc_empleado: string;
  fecha: string;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}