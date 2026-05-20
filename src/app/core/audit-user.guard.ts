import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuditContextService } from './audit-context.service';

export const auditUserGuard: CanActivateFn = () => {

  const audit = inject(AuditContextService);
  const router = inject(Router);

  const hasEmpleado = audit.hasEmpleado();
  console.log('Empleado ID:', audit.empleadoId);
  if (hasEmpleado) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
