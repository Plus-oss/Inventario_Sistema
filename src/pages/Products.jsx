// Importamos useState desde React.
// Sirve para crear variables que guardan información y actualizarla.
import { useState } from 'react';
// Importamos el hook personalizado que administra los productos.
// Nos permite agregar, editar y eliminar productos.
import { useInventario } from '../hooks/userInventario.js';
// Importamos el componente ProductForm.
// Este contiene el formulario para registrar o modificar productos.
import ProductForm from '../components/ProductForm';

// Creamos la función principal llamada Products.
// Esta función representa la página del sistema de inventario.
function Products() {

  // Llamamos al hook useInventario para obtener los datos y funciones.
  const {
    productos,          // Contiene la lista de productos registrados.
    agregarProducto,    // Función para registrar un producto nuevo.
    editarProducto,     // Función para modificar un producto existente.
    eliminarProducto    // Función para eliminar un producto.
  } = useInventario();

  // Creamos una variable llamada busqueda.
  // Guarda el texto que escribimos en el buscador.
  // setBusqueda permite cambiar el texto de búsqueda.
  const [busqueda, setBusqueda] = useState('');

  // Guarda si el formulario debe mostrarse o permanecer oculto.
  // false significa que está oculto.
  // true significa que está visible.
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Guarda el producto que estamos seleccionando para editar.
  // null significa que todavía no hemos seleccionado ningún producto.
  const [productoEditando, setProductoEditando] = useState(null);

  // filter recorre la lista de productos y selecciona los que coinciden
  // con el texto que escribimos en el buscador.
  const productosFiltrados = productos.filter(p =>

    // toLowerCase convierte el texto a minúsculas.
    // includes comprueba si el nombre contiene el texto buscado.
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||

    // Comprueba si existe una categoría y si coincide con la búsqueda.
    (p.categoria && p.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  // Creamos la función handleGuardar.
  // Recibe los datos del producto que vienen del formulario.
  const handleGuardar = (datos) => {

    // Verificamos si estamos editando un producto.
    if (productoEditando) {

      // Si existe un producto seleccionado, lo actualizamos.
      // productoEditando.id identifica cuál producto se modificará.
      editarProducto(productoEditando.id, datos);

    } else {

      // Si no estamos editando, registramos un producto nuevo.
      agregarProducto(datos);
    }

    // Ocultamos el formulario después de guardar.
    setMostrarFormulario(false);

    // Limpiamos el producto seleccionado.
    setProductoEditando(null);
  };

  // Creamos la función handleEditar.
  // Recibe el producto que el usuario desea modificar.
  const handleEditar = (producto) => {

    // Guardamos los datos del producto seleccionado.
    setProductoEditando(producto);

    // Mostramos el formulario para poder editarlo.
    setMostrarFormulario(true);
  };

  // return permite mostrar el contenido de la página.
  return (

    // div es un contenedor que agrupa los elementos.
    // style permite aplicar estilos directamente desde React.
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* h1 muestra el título principal de la página */}
      <h1>Sistema de Inventario</h1>

      {/* Creamos el campo de búsqueda de productos */}
      <input
        type="text" 
        // type indica que es un campo para escribir texto.

        placeholder="Buscar producto por nombre o categoría..."
        // placeholder muestra un mensaje de ayuda dentro del campo.

        value={busqueda}
        // value muestra el texto que está guardado en la variable busqueda.

        onChange={(e) => setBusqueda(e.target.value)}
        // onChange detecta cuando escribimos.
        // e representa el evento.
        // target identifica el campo donde escribimos.
        // value obtiene el texto ingresado.
        // setBusqueda actualiza la búsqueda.

        style={{ padding: '10px', width: '100%', maxWidth: '400px', marginBottom: '15px', fontSize: '16px' }}
        // style permite modificar la apariencia del campo.
        // padding: espacio interno.
        // width: ancho del campo.
        // maxWidth: ancho máximo.
        // marginBottom: espacio inferior.
        // fontSize: tamaño de la letra.
      />

      {/* br genera un salto de línea */}
      <br />

      {/* Botón para agregar un producto nuevo */}
      <button

        // onClick ejecuta las instrucciones cuando hacemos clic.
        onClick={() => {

          // Limpiamos cualquier producto que estuviera seleccionado.
          // null significa que no estamos editando ningún producto.
          setProductoEditando(null);

          // Cambiamos el estado para mostrar el formulario.
          setMostrarFormulario(true);
        }}

        // Aplicamos estilos al botón.
        style={{ padding: '10px 20px', marginBottom: '20px', cursor: 'pointer' }}
      >
        + Agregar producto
      </button>

      {/* && significa Y.
          Si mostrarFormulario es true, se muestra ProductForm.
          Si es false, el formulario no aparece. */}
      {mostrarFormulario && (

        // Llamamos al componente ProductForm.
        <ProductForm

          // Enviamos el producto seleccionado para editar.
          productoInicial={productoEditando}

          // Enviamos la función que guarda o actualiza los datos.
          onGuardar={handleGuardar}

          // Enviamos una función para cancelar el formulario.
          onCancelar={() => {

            // Ocultamos el formulario.
            setMostrarFormulario(false);

            // Quitamos el producto seleccionado.
            setProductoEditando(null);
          }}
        />
      )}

      {/* hr crea una línea horizontal para separar contenidos */}
      <hr />

      {/* h2 muestra el título de la lista.
          length cuenta cuántos productos se encontraron. */}
      <h2>Productos ({productosFiltrados.length})</h2>

      {/* Operador ternario:
          Si no hay productos, muestra un mensaje.
          Si existen productos, muestra la lista. */}
      {productosFiltrados.length === 0 ? (

        // Mensaje que aparece cuando la lista está vacía.
        <p>No hay productos todavía. Agrega el primero.</p>

      ) : (

        // div contiene la lista de productos.
        // display grid organiza los productos en una cuadrícula.
        // gap establece el espacio entre los elementos.
        <div style={{ display: 'grid', gap: '15px' }}>

          {/* map recorre todos los productos filtrados.
              Por cada producto crea un contenedor en pantalla. */}
          {productosFiltrados.map((producto) => (

            <div

              // key identifica cada producto de forma única para React.
              key={producto.id}

              // Aplicamos estilos a cada tarjeta de producto.
              style={{
                border: '1px solid #ddd', // Agrega un borde.
                borderRadius: '8px', // Redondea las esquinas.
                padding: '15px', // Agrega espacio interno.

                // Si la cantidad es menor a 5, el fondo será rojizo.
                // Si tiene 5 o más, el fondo será gris claro.
                backgroundColor: producto.cantidad < 5 ? '#fff3f3' : '#f9f9f9'
              }}
            >

              {/* h3 muestra el nombre del producto */}
              <h3 style={{ margin: '0 0 8px 0' }}>
                {producto.nombre}
              </h3>

              {/* Muestra la categoría.
                  Si no tiene categoría, muestra Sin categoría. */}
              <p style={{ margin: '4px 0' }}>
                <strong>Categoría:</strong> {producto.categoria || 'Sin categoría'}
              </p>

              {/* Muestra la descripción.
                  Si está vacía, muestra un guion. */}
              <p style={{ margin: '4px 0' }}>
                <strong>Descripción:</strong> {producto.descripcion || '—'}
              </p>

              {/* Muestra la cantidad disponible del producto */}
              <p style={{ margin: '4px 0' }}>
                <strong>Cantidad:</strong>{' '}

                {/* Cambia el color de la cantidad.
                    Si es menor a 5, aparece en rojo.
                    Si es 5 o más, aparece en verde. */}
                <span style={{ color: producto.cantidad < 5 ? 'red' : 'green', fontWeight: 'bold' }}>
                  {producto.cantidad}
                </span>
              </p>

              {/* Muestra el precio del producto.
                  Number convierte el precio a número.
                  toFixed(2) muestra dos decimales. */}
              <p style={{ margin: '4px 0' }}>
                <strong>Precio:</strong> ${Number(producto.precio).toFixed(2)}
              </p>

              {/* Contenedor donde colocamos los botones de acciones */}
              <div style={{ marginTop: '10px' }}>

                {/* Botón para editar un producto */}
                <button

                  // Cuando hacemos clic, ejecutamos handleEditar
                  // y enviamos los datos del producto seleccionado.
                  onClick={() => handleEditar(producto)}

                  // Estilos del botón.
                  style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}
                >
                  Editar
                </button>

                {/* Botón para eliminar un producto */}
                <button

                  // onClick ejecuta estas instrucciones al hacer clic.
                  onClick={() => {

                    // confirm muestra una ventana preguntando
                    // si estamos seguros de eliminar el producto.
                    if (confirm('¿Seguro que quieres eliminar este producto?')) {

                      // Si aceptamos, se elimina el producto usando su ID.
                      eliminarProducto(producto.id);
                    }
                  }}

                  // Estilos del botón eliminar.
                  style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none' }}
                >
                  Eliminar
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// export default permite importar y utilizar Products
// desde otros archivos del proyecto.
export default Products;