/* global bootstrap */
import { Transaccion } from "../domain/transaccion.js";
import {
  historialCompras,
  historialVentas,
  agregarCompra,
  agregarVenta,
} from "../domain/historial.js";
import {
  sumarCompra,
  restarVenta,
  puedeVender,
  getPrecio,
  portafolio,
  inversionesActivas,
} from "../domain/portafolio.js";

let secciones = [
  "inicio",
  "compraVenta",
  "historial",
  "cotizaciones",
  "portafolio",
];

function ocultarTodo() {
  secciones.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("d-none");
  });
}

function mostrar(id) {
  ocultarTodo();
  const el = document.getElementById(id);
  if (el) el.classList.remove("d-none");
}

window.addEventListener("DOMContentLoaded", () => {
  mostrar("inicio");
  document.querySelectorAll("[data-section]").forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const target = a.getAttribute("data-section");
      if (target) mostrar(target);
      const offcanvasEl = document.querySelector("#offcanvasDarkNavbar");
      if (offcanvasEl) {
        const bsOff = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOff) bsOff.hide();
      }
    });
  });
});

/* --- MANEJAR COMPRA --- */
document.querySelector(".btn-success").addEventListener("click", (e) => {
  e.preventDefault();

  const activo = document.getElementById("monedaCompra").value;
  const monto = document.getElementById("cantidadCompra").value;

  if (monto <= 0) {
    alert("Ingrese un monto válido.");
    document.getElementById("cantidadCompra").value = "";
    return;
  }

  const t = new Transaccion("compra", activo, monto);

  agregarCompra(t);
  sumarCompra(activo, parseFloat(monto));

  actualizarMiniPortafolio();
  actualizarHistorial();
  actualizarPortafolio();
  ordenarTablaPorFecha("idTablaCompra");
  document.getElementById("cantidadCompra").value = "";
});

/* --- MANEJAR VENTA --- */
document.querySelector(".btn-danger").addEventListener("click", (e) => {
  e.preventDefault();

  const activo = document.getElementById("monedaVenta").value;
  const monto = document.getElementById("cantidadVenta").value;

  if (monto > 0) {
    if (!puedeVender(activo, monto)) {
      alert("No tenés suficientes activos para vender.");
      document.getElementById("cantidadVenta").value = "";
      return;
    }

    const t = new Transaccion("venta", activo, monto);

    agregarVenta(t);
    restarVenta(activo, parseFloat(monto));

    actualizarMiniPortafolio();
    actualizarPortafolio();
    actualizarHistorial();
    ordenarTablaPorFecha("idTablaVenta");
    document.getElementById("cantidadVenta").value = "";
  }
});

/* --- ACTUALIZAR TABLAS --- */
function actualizarHistorial() {
  const tablaCompras = document.getElementById("tablaHistorialCompras");
  const tablaVentas = document.getElementById("tablaHistorialVentas");
  tablaCompras.innerHTML = "";
  historialCompras.forEach((t) => {
    const f = new Date(t.fecha);
    const fechaLinda =
      f.getFullYear() +
      "-" +
      String(f.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(f.getDate()).padStart(2, "0") +
      ", " +
      String(f.getHours()).padStart(2, "0") +
      ":" +
      String(f.getMinutes()).padStart(2, "0") +
      ":" +
      String(f.getSeconds()).padStart(2, "0");
    tablaCompras.innerHTML += `
      <tr>
        <td>${fechaLinda}</td>
        <td>${t.activo}</td>
        <td>${(t.montoUSD / getPrecio(t.activo)).toLocaleString("es-UY", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 8,
        })}</td>
        <td>${t.montoUSD.toLocaleString("es-UY", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 8,
        })}</td>
      </tr>`;
  });

  tablaVentas.innerHTML = "";
  historialVentas.forEach((t) => {
    const f = new Date(t.fecha);
    const fechaLindaV =
      f.getFullYear() +
      "-" +
      String(f.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(f.getDate()).padStart(2, "0") +
      ", " +
      String(f.getHours()).padStart(2, "0") +
      ":" +
      String(f.getMinutes()).padStart(2, "0") +
      ":" +
      String(f.getSeconds()).padStart(2, "0");
    tablaVentas.innerHTML += `
      <tr>
        <td>${fechaLindaV}</td>
        <td>${t.activo}</td>
        <td>${t.montoUSD.toLocaleString("es-UY", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 8,
        })}</td>
        <td>${(t.montoUSD * getPrecio(t.activo)).toLocaleString("es-UY", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 8,
        })}</td>
      </tr>`;
  });
}

function ordenarTablaPorFecha(idTabla) {
  const tabla = document.getElementById(idTabla);
  const tbody = tabla.querySelector("tbody");
  const filas = Array.from(tbody.rows);

  filas.sort((a, b) => {
    const fechaA = new Date(a.cells[0].innerText);
    const fechaB = new Date(b.cells[0].innerText);
    return fechaB - fechaA; // más reciente arriba
  });

  filas.forEach((f) => tbody.appendChild(f));
}

/* --- ACTUALIZAR PORTAFOLIO --- */
function actualizarPortafolio() {
  document.getElementById("cantBTC").textContent =
    `${(portafolio["Bitcoin"] / getPrecio("Bitcoin")).toFixed(6)} BTC`;
  document.getElementById("usdBTC").textContent =
    "$ " +
    portafolio["Bitcoin"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("cantETH").textContent =
    `${(portafolio["Ethereum"] / getPrecio("Ethereum")).toFixed(6)} ETH`;
  document.getElementById("usdETH").textContent =
    "$ " +
    portafolio["Ethereum"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("cantUSDT").textContent =
    `${(portafolio["Tether"] / getPrecio("Tether")).toFixed(3)} USDT`;
  document.getElementById("usdUSDT").textContent =
    "$ " +
    portafolio["Tether"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("cantBROU").textContent =
    `Capital: $` +
    portafolio["Plazo Fijo BROU"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  +` - Tasa 4.25%`;
  document.getElementById("usdBROU").textContent =
    "$ " +
    portafolio["Plazo Fijo BROU"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("cantAAPL").textContent =
    `${(portafolio["AAPL"] / getPrecio("AAPL")).toFixed(6)} Acciones`;
  document.getElementById("usdAAPL").textContent =
    "$ " +
    portafolio["AAPL"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("cantKO").textContent =
    `${(portafolio["KO"] / getPrecio("KO")).toFixed(6)} Acciones`;
  document.getElementById("usdKO").textContent =
    "$ " +
    portafolio["KO"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

  document.getElementById("idValorTotal").textContent =
    "$" +
    (
      portafolio["Bitcoin"] +
      portafolio["Ethereum"] +
      portafolio["Tether"] +
      portafolio["Plazo Fijo BROU"] +
      portafolio["AAPL"] +
      portafolio["KO"]
    ).toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  document.getElementById("idInversionesActivas").textContent =
    "" + inversionesActivas();
}

/* --- ACTUALIZAR MINI PORTAFOLIO --- */
function actualizarMiniPortafolio() {
  document.getElementById("miniCantBTC").textContent =
    `${(portafolio["Bitcoin"] / getPrecio("Bitcoin")).toFixed(6)} BTC`;

  document.getElementById("miniCantETH").textContent =
    `${(portafolio["Ethereum"] / getPrecio("Ethereum")).toFixed(6)} ETH`;

  document.getElementById("miniCantUSDT").textContent =
    `${(portafolio["Tether"] / getPrecio("Tether")).toFixed(6)} USDT`;

  document.getElementById("miniCantBROU").textContent =
    `Capital: $` +
    portafolio["Plazo Fijo BROU"].toLocaleString("es-UY", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  +` - Tasa 4.25%`;

  document.getElementById("miniCantAAPL").textContent =
    `${(portafolio["AAPL"] / getPrecio("AAPL")).toFixed(6)} Acciones`;

  document.getElementById("miniCantKO").textContent =
    `${(portafolio["KO"] / getPrecio("KO")).toFixed(6)} Acciones`;
}
