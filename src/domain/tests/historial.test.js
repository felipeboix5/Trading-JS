import { describe, expect, test } from "@jest/globals";
describe("historial.js", () => {
  test("agregarCompra agrega al historial", async () => {
    const { historialCompras, agregarCompra } = await import("../historial.js");

    historialCompras.length = 0;

    agregarCompra("X");

    expect(historialCompras.length).toBe(1);
    expect(historialCompras[0]).toBe("X");
  });

  test("agregarVenta agrega al historial", async () => {
    const { historialVentas, agregarVenta } = await import("../historial.js");

    historialVentas.length = 0;

    agregarVenta("Y");

    expect(historialVentas.length).toBe(1);
    expect(historialVentas[0]).toBe("Y");
  });
});
