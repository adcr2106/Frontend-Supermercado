export interface DetalleCompraCreate {
  id_producto: string;
  id_compra: string;
  cantidad: number;
  subtotal: number;
}

export interface DetalleCompraUpdate {
  cantidad?: number | null;
  subtotal?: number | null;
}

export interface DetalleCompraResponse {
  id_detalle: string;
  id_producto: string;
  id_compra: string;
  cantidad: number;
  subtotal: number;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}