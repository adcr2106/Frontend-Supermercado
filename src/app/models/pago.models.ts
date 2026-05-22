export type MetodoPago =
  | 'EFECTIVO'
  | 'TARJETA'
  | 'TRANSFERENCIA'
  | 'NEQUI'
  | 'DAVIPLATA';

export interface PagoCreate {
  metodo: MetodoPago;
  monto: number;
  id_caja: string;
  id_compra: string;
}

export interface PagoUpdate {
  metodo?: MetodoPago | null;
  monto?: number | null;
}

export interface PagoResponse {
  id: string;
  metodo: MetodoPago;
  monto: number;
  id_caja: string;
  id_compra: string;
  fecha: string;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}