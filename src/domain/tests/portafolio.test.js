import { describe, expect, test, beforeEach } from "@jest/globals";
describe("portafolio.js", () => {
  let portafolio,
    sumarCompra,
    puedeVender,
    restarVenta,
    inversionesActivas,
    getPrecio;

  beforeEach(async () => {
    const module = await import("../portafolio.js");

    portafolio = module.portafolio;
    sumarCompra = module.sumarCompra;
    puedeVender = module.puedeVender;
    restarVenta = module.restarVenta;
    inversionesActivas = module.inversionesActivas;
    getPrecio = module.getPrecio;

    for (const key in portafolio) {
      portafolio[key] = 0;
    }
  });

  test("sumarCompra suma correctamente", () => {
    sumarCompra("Bitcoin", 100);
    expect(portafolio["Bitcoin"]).toBe(100);
  });

  test("puedeVender devuelve true si alcanza", () => {
    sumarCompra("Bitcoin", 96430);

    expect(puedeVender("Bitcoin", 1)).toBe(true);
  });

  test("puedeVender devuelve false si no alcanza", () => {
    sumarCompra("Bitcoin", 1000);
    expect(puedeVender("Bitcoin", 1)).toBe(false);
  });

  test("restarVenta resta correctamente", () => {
    sumarCompra("Bitcoin", 192860);

    restarVenta("Bitcoin", 1);
    expect(portafolio["Bitcoin"]).toBe(96430);
  });

  test("inversionesActivas cuenta correctamente", () => {
    sumarCompra("Bitcoin", 10);
    sumarCompra("AAPL", 20);

    expect(inversionesActivas()).toBe(2);
  });

  test("getPrecio devuelve los valores correctos", () => {
    expect(getPrecio("Bitcoin")).toBe(96430);
    expect(getPrecio("Ethereum")).toBe(5430);
    expect(getPrecio("Tether")).toBe(1);
    expect(getPrecio("Plazo Fijo BROU")).toBe(1);
    expect(getPrecio("AAPL")).toBe(225.12);
    expect(getPrecio("KO")).toBe(68.44);
  });

  test("inversionesActivas cubre todos los if uno por uno", () => {
    portafolio.Bitcoin = 10;
    portafolio.Ethereum = 0;
    portafolio.Tether = 0;
    portafolio["Plazo Fijo BROU"] = 0;
    portafolio.AAPL = 0;
    portafolio.KO = 0;
    expect(inversionesActivas()).toBe(1);

    portafolio.Bitcoin = 0;
    portafolio.Ethereum = 10;
    expect(inversionesActivas()).toBe(1);

    portafolio.Ethereum = 0;
    portafolio.Tether = 10;
    expect(inversionesActivas()).toBe(1);

    portafolio.Tether = 0;
    portafolio["Plazo Fijo BROU"] = 10;
    expect(inversionesActivas()).toBe(1);

    portafolio["Plazo Fijo BROU"] = 0;
    portafolio.AAPL = 10;
    expect(inversionesActivas()).toBe(1);

    portafolio.AAPL = 0;
    portafolio.KO = 10;
    expect(inversionesActivas()).toBe(1);
  });

  test("getPrecio devuelve 1 para un activo desconocido", () => {
    expect(getPrecio("ActivoInexistente")).toBe(1);
  });
});
