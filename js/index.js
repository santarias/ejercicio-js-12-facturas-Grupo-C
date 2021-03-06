let lista;

const cargarDatos = async () => {
  const respuesta = await fetch("http://localhost:3001/facturas");
  lista = await respuesta.json();
  rellenarDatos(lista.filter((factura) => factura.tipo.toLowerCase() === "ingreso"));
};

const rellenarDatos = (listaDatos) => {
  let sumaTotalIva = 0;
  for (const factura of listaDatos) {
    const filaRellenar = document.querySelector(".fila-dummy").cloneNode(true);
    const numeroFactura = filaRellenar.querySelector(".numero");
    const fechaFactura = filaRellenar.querySelector(".fecha");
    const concepto = filaRellenar.querySelector(".concepto");
    const base = filaRellenar.querySelector(".base");
    const iva = filaRellenar.querySelector(".iva");
    const total = filaRellenar.querySelector(".total");
    const estado = filaRellenar.querySelector(".estado");
    const vence = filaRellenar.querySelector(".vence");
    filaRellenar.classList.remove("fila-dummy");
    numeroFactura.textContent = factura.numero;
    const fechaFacturaRecibida = new Date(parseInt(factura.fecha)).toLocaleDateString("es-ES");
    fechaFactura.textContent = fechaFacturaRecibida;
    concepto.textContent = factura.concepto;
    const ivaFactura = (factura.base * (factura.tipoIva / 100));
    sumaTotalIva += ivaFactura;
    base.textContent = `${factura.base}€`;
    iva.textContent = `${ivaFactura}€ (${factura.tipoIva}%)`;
    total.textContent = `${(factura.base + ivaFactura)}€`;
    estado.textContent = `${factura.abonada === true ? "Abonada" : "Pendiente"}`;
    estado.classList.add(estado.textContent === "Abonada" ? "table-success" : "table-danger");
    if (factura.abonada) {
      vence.textContent = "-";
    } else {
      const fechaAhora = new Date();
      // console.log(luxon.DateTime.fromMillis(parseInt(factura.vencimiento)).toLocaleString());
      const fechaVencimiento = luxon.DateTime.fromMillis(parseInt(factura.vencimiento)).toLocaleString();
      const algo = luxon.DateTime.fromMillis(parseInt(factura.vencimiento));
      const diasDiferencia = parseInt(algo.diffNow("days").days.toLocaleString()).toFixed();
      if (luxon.DateTime.fromMillis(parseInt(factura.vencimiento)) > fechaAhora) {
        vence.classList.add("table-success");
        vence.textContent = `${fechaVencimiento} vence en (${diasDiferencia}) dias`;
      } else {
        vence.classList.add("table-danger");
        vence.textContent = `${fechaVencimiento} vencio hace (${Math.abs(diasDiferencia)}) dias`;
      }
    }

    const tabla = document.querySelector(".tabla-informacion");
    tabla.append(filaRellenar);
  }
  const totalesBase = document.querySelector(".totales-base");
  const totalBaseFacturas = listaDatos.map((factura) => factura.base).reduce((accumulator, currentValue) => accumulator + currentValue);
  totalesBase.textContent = `${totalBaseFacturas}€`;
  const totalIva = document.querySelector(".totales-iva");
  totalIva.textContent = `${sumaTotalIva}€`;
  const totalidad = document.querySelector(".totales-total");
  totalidad.textContent = `${(totalBaseFacturas + sumaTotalIva)}€`;
};

cargarDatos();
