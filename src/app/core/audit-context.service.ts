import {
  Injectable,
  computed,
  signal
} from '@angular/core';

const STORAGE_ID =
  'pos_audit_empleado_id';

const STORAGE_DOCUMENTO =
  'pos_audit_empleado_documento';

@Injectable({
  providedIn: 'root'
})

export class AuditContextService {

  private readonly id =
    signal<string | null>(
      localStorage.getItem(STORAGE_ID)
    );

  private readonly documento =
    signal<string | null>(
      localStorage.getItem(STORAGE_DOCUMENTO)
    );

  readonly empleadoId =
    this.id.asReadonly();

  readonly empleadoDocumento =
    this.documento.asReadonly();

  readonly hasEmpleado =
    computed(() => this.id() !== null);

  // CORREGIDO
  select(
    id: string,
    documento: string
  ): void {

    this.id.set(id);

    this.documento.set(documento);

    localStorage.setItem(
      STORAGE_ID,
      id
    );

    localStorage.setItem(
      STORAGE_DOCUMENTO,
      documento
    );

  }

  clear(): void {

    this.id.set(null);

    this.documento.set(null);

    localStorage.removeItem(
      STORAGE_ID
    );

    localStorage.removeItem(
      STORAGE_DOCUMENTO
    );

  }

}