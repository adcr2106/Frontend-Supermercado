import os

# Lista de archivos models
archivos = [
    "caja_registradora.models.ts",
    "categoria.models.ts",
    "cliente.models.ts",
    "compra.models.ts",
    "detalle_compra.models.ts",
    "empleado.models.ts",
    "jornada.models.ts",
    "pago.models.ts",
    "producto.models.ts",
    "proveedor.models.ts",
]

# Crear carpeta models
os.makedirs("models", exist_ok=True)

# Crear archivos vacíos
for archivo in archivos:
    ruta = os.path.join("models", archivo)

    with open(ruta, "w", encoding="utf-8") as f:
        f.write("")

    print(f"Archivo creado: {ruta}")

print("Todos los models fueron creados correctamente.")
