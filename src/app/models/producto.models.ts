export interface ProductoCreate {
  nombre: string;
  precio: number;
  stock: number;
  id_categoria: string;
  id_proveedor: string;
}

export interface ProductoUpdate {
  nombre?: string | null;
  precio?: number | null;
  stock?: number | null;
  id_categoria?: string | null;
  id_proveedor?: string | null;
}

export interface ProductoResponse {
  id_producto: string;
  nombre: string;
  precio: number;
  stock: number;
  id_categoria: string;
  id_proveedor: string;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}