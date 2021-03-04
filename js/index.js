let lista;

const cargarDatos = async () => {
  console.log("Pidiendo datos a la API");
  const respuesta = await fetch("http://localhost:3001/facturas");
  lista = await respuesta.json();
  rellenarDatos(lista.filter((factura) => factura.tipo.toLowerCase() === "ingreso"));
};

const rellenarDatos = (listaDatos) => {
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
    base.textContent = `${factura.base} €`;
    iva.textContent = `${ivaFactura} (${factura.tipoIva}%)`;
    total.textContent = `${(factura.base + ivaFactura)} €`;
    estado.textContent = `${factura.abonada === true ? "Abonada" : "Pendiente"}`;
    estado.classList.add(estado.textContent === "Abonada" ? "table-success" : "table-danger");
    console.log(filaRellenar);

    const tabla = document.querySelector(".tabla-informacion");
    tabla.append(filaRellenar);
  }
};

cargarDatos();


