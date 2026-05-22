export interface JornadaCreate {
  id_empleado: string;
  id_caja: string;
}

export interface JornadaUpdate {
  fin_jornada?: string | null;
}

export interface JornadaResponse {
  id: string;
  id_empleado: string;
  id_caja: string;
  inicio_jornada: string;
  fin_jornada?: string | null;
  activo: boolean;
}

export interface RespuestaAPI {
  mensaje: string;
  exito: boolean;
}