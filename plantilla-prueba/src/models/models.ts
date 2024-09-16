export interface Asiento {
    asientoId: number;
    fecha: string;
    dptoId: number;
    descripcion?: string;
}

export interface CuentasContable {
    cuentaId: number;
    numCuenta?: string;
}

export interface Departamento {
    dptoId: number;
    descDpto?: string;
}

export interface Movimiento {
    movimientoId: number;
    asientoId: number;
    cuentaId: number;
    valor: number;
    tipoMovimiento?: string;
    descripcion?: string;
}
