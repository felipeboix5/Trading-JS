export const portafolio = {
  Bitcoin: 0,
  Ethereum: 0,
  Tether: 0,
  "Plazo Fijo BROU": 0,
  AAPL: 0,
  KO: 0,
};

export function sumarCompra(activo, monto) {
  portafolio[activo] += monto;
}

export function puedeVender(activo, monto) {
  return portafolio[activo] >= monto * getPrecio(activo);
}

export function restarVenta(activo, monto) {
  portafolio[activo] -= monto * getPrecio(activo);
}

export function inversionesActivas() {
  let total = 0;
  if (portafolio["Bitcoin"] > 0) total++;
  if (portafolio["Ethereum"] > 0) total++;
  if (portafolio["Tether"] > 0) total++;
  if (portafolio["Plazo Fijo BROU"] > 0) total++;
  if (portafolio["AAPL"] > 0) total++;
  if (portafolio["KO"] > 0) total++;
  return total;
}

export function getPrecio(activo) {
  switch (activo) {
    case "Bitcoin":
      return 96430;
    case "Ethereum":
      return 5430;
    case "Tether":
      return 1;
    case "Plazo Fijo BROU":
      return 1;
    case "AAPL":
      return 225.12;
    case "KO":
      return 68.44;
    default:
      return 1;
  }
}
