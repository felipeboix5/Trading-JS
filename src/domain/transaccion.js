export class Transaccion {
  constructor(tipo, activo, montoUSD, fecha = new Date()) {
    this.tipo = tipo;
    this.activo = activo;
    this.montoUSD = parseFloat(montoUSD);
    this.fecha = fecha.toISOString();
  }
}
export class Transacciones {
  constructor() {
    this.lista = [];
  }
}
