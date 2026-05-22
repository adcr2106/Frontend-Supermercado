export interface EmpleadoCreate {

  documento: string;

  nombre: string;

  salario: number;

  cargo: string;

  contrasena: string;

  telefono?: string | null;

  correo?: string | null;

  creado_por?: string | null;
}

export interface EmpleadoUpdate {

  documento?: string;

  nombre?: string;

  salario?: number;

  cargo?: string;

  contrasena?: string;

  telefono?: string | null;

  correo?: string | null;

  actualizado_por?: string | null;
}

export interface EmpleadoLogin {

  documento: string;

  contrasena: string;
}

export interface EmpleadoResponse {

  id: string;

  documento: string;

  nombre: string;

  salario: number;

  cargo: string;

  telefono?: string | null;

  correo?: string | null;

  creado_por?: string | null;

  actualizado_por?: string | null;

  fecha_creacion: string;

  fecha_actualizacion?: string | null;

  activo: boolean;
}

export interface RespuestaAPI {

  mensaje: string;

  exito: boolean;
}