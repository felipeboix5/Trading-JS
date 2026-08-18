import { describe, expect, test } from "@jest/globals";
import { Transaccion } from "../transaccion.js";
import { Transacciones } from "../transaccion.js";

describe("Transaccion", () => {
  test("crea una transacción correctamente", () => {
    const t = new Transaccion("compra", "Bitcoin", 100);

    expect(t.tipo).toBe("compra");
    expect(t.activo).toBe("Bitcoin");
    expect(t.montoUSD).toBe(100);
    expect(typeof t.fecha).toBe("string");
  });
});

describe("Transacciones", () => {
  test("inicia con lista vacía", () => {
    const tx = new Transacciones();
    expect(Array.isArray(tx.lista)).toBe(true);
    expect(tx.lista.length).toBe(0);
  });

  test("puede agregar elementos a la lista", () => {
    const tx = new Transacciones();
    tx.lista.push("item");

    expect(tx.lista.length).toBe(1);
    expect(tx.lista[0]).toBe("item");
  });
});
