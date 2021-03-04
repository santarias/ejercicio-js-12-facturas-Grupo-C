let lista;

const cargarDatos = async () => {
  console.log("Pidiendo datos a la API");
  const respuesta = await fetch("http://localhost:3001/facturas");
  lista = await respuesta.json();
};

cargarDatos();
