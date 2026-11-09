// Importamos React y useState.
// useState permite guardar información y actualizarla cuando sea necesario.
import React, { useState } from 'react';

// Creamos el componente principal llamado App.
function App() {

  // 1. ESTADOS: Guardan la información que utiliza el sistema.

  // Guarda todos los productos registrados.
  const [productos, setProductos] = useState([]);

  // Guarda el nombre que escribimos en el formulario.
  const [nombre, setNombre] = useState('');

  // Guarda la categoría seleccionada.
  const [categoria, setCategoria] = useState('');

  // Guarda la descripción del producto.
  const [descripcion, setDescripcion] = useState('');

  // Guarda la cantidad disponible del producto.
  const [cantidad, setCantidad] = useState('');

  // Guarda el precio del producto.
  const [precio, setPrecio] = useState('');

  // Guarda el texto que escribimos en el buscador.
  const [busqueda, setBusqueda] = useState('');


  // 2. FUNCIÓN PARA GUARDAR PRODUCTOS.

  // Esta función se ejecuta cuando presionamos el botón Guardar producto.
  const handleSubmit = (e) => {

    // Evita que la página se recargue al enviar el formulario.
    e.preventDefault();

    // trim elimina los espacios al inicio y al final.
    // Si el nombre está vacío, detiene la función.
    if (!nombre.trim()) return;

    // Creamos un objeto que contiene los datos del producto.
    const nuevoProducto = {

      // Date.now genera un identificador utilizando la fecha y hora actual.
      id: Date.now(),

      // Guarda el nombre ingresado.
      nombre,

      // Si no seleccionamos una categoría, coloca General.
      categoria: categoria || 'General',

      // Guarda la descripción.
      descripcion,

      // Si no ingresamos cantidad, coloca 0.
      cantidad: cantidad || 0,

      // Si no ingresamos precio, coloca 0.
      precio: precio || 0
    };

    // Agregamos el producto nuevo al inicio de la lista.
    // ...productos conserva los productos que ya estaban registrados.
    setProductos([nuevoProducto, ...productos]);

    // Después de guardar, limpiamos los campos del formulario.
    handleLimpiar();
  };


  // 3. FUNCIÓN PARA LIMPIAR EL FORMULARIO.

  // Esta función borra los datos escritos en los campos.
  const handleLimpiar = () => {

    // Deja vacío el campo del nombre.
    setNombre('');

    // Deja vacía la categoría.
    setCategoria('');

    // Deja vacía la descripción.
    setDescripcion('');

    // Deja vacía la cantidad.
    setCantidad('');

    // Deja vacío el precio.
    setPrecio('');
  };


  // 4. FUNCIÓN PARA ELIMINAR PRODUCTOS.

  // Recibe el ID del producto que queremos eliminar.
  const eliminarProducto = (id) => {

    // filter recorre los productos y crea una nueva lista.
    // p representa cada producto.
    // !== significa diferente.
    // Conserva todos los productos cuyo ID sea diferente al seleccionado.
    setProductos(productos.filter(p => p.id !== id));
  };


  // 5. FUNCIÓN PARA FILTRAR PRODUCTOS.

  // Busca productos según el texto que escribimos.
  const productosFiltrados = productos.filter(p =>

    // Busca coincidencias en el nombre.
    // toLowerCase convierte el texto a minúsculas.
    // includes comprueba si contiene el texto buscado.
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||

    // También busca coincidencias en la categoría.
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );


  // 6. MOSTRAR EL CONTENIDO DE LA PÁGINA.

  // return devuelve todo lo que aparecerá en pantalla.
  return (

    // Contenedor principal de toda la aplicación.
    // styles.container aplica los estilos definidos más abajo.
    <div style={styles.container}>

      {/* ENCABEZADO DE LA PÁGINA */}

      {/* header representa la cabecera del sistema. */}
      <header style={styles.header}>

        <div>

          {/* Muestra el título principal. */}
          <h1 style={styles.title}>Sistema de Inventario</h1>

          {/* Muestra un subtítulo debajo del título principal. */}
          <p style={styles.subtitle}>
            Panel de control y registro de productos
          </p>

        </div>
      </header>


      {/* Contenedor que organiza el formulario y la lista en columnas. */}
      <div style={styles.grid}>


        {/* COLUMNA 1: FORMULARIO PARA REGISTRAR PRODUCTOS */}

        <div style={styles.card}>

          {/* Título del formulario. */}
          <h2 style={styles.cardTitle}>Agregar producto</h2>

          {/* form agrupa los campos del formulario.
              onSubmit ejecuta handleSubmit al enviar los datos. */}
          <form style={styles.form} onSubmit={handleSubmit}>


            {/* FILA 1: NOMBRE Y CATEGORÍA */}

            {/* Organiza el nombre y la categoría en una misma fila. */}
            <div style={styles.row}>

              {/* Campo para escribir el nombre del producto. */}
              <input
                type="text"

                // Texto de ayuda que aparece dentro del campo.
                placeholder="Nombre del producto"

                // Muestra el nombre guardado en el estado.
                value={nombre}

                // Actualiza el nombre cuando escribimos.
                // e.target.value obtiene el texto ingresado.
                onChange={(e) => setNombre(e.target.value)}

                // Aplica estilos y flex: 2 le da mayor espacio al campo.
                style={{ ...styles.input, flex: 2 }}

                // Indica que el campo es obligatorio.
                required
              />

              {/* select permite seleccionar una categoría. */}
              <select

                // Muestra la categoría seleccionada.
                value={categoria}

                // Actualiza la categoría cuando seleccionamos una opción.
                onChange={(e) => setCategoria(e.target.value)}

                // Aplica los estilos y flex: 1 define su proporción de espacio.
                style={{ ...styles.input, flex: 1 }}
              >

                {/* Opción inicial del selector. */}
                <option value="">Categoría</option>

                {/* Opciones disponibles para clasificar los productos. */}
                <option value="Alimentos">Alimentos</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Ropa">Ropa</option>
                <option value="Hogar">Hogar</option>

              </select>
            </div>


            {/* CAMPO PARA ESCRIBIR LA DESCRIPCIÓN */}

            {/* textarea permite escribir textos más largos. */}
            <textarea

              // Texto de ayuda dentro del campo.
              placeholder="Descripción del producto"

              // Define la cantidad de filas visibles.
              rows="3"

              // Muestra la descripción guardada.
              value={descripcion}

              // Actualiza la descripción cuando escribimos.
              onChange={(e) => setDescripcion(e.target.value)}

              // Aplica los estilos del campo de descripción.
              style={styles.textarea}
            ></textarea>


            {/* FILA 2: CANTIDAD Y PRECIO */}

            {/* Organiza los campos de cantidad y precio en una fila. */}
            <div style={styles.row}>

              {/* Campo para ingresar la cantidad del producto. */}
              <input
                type="number"

                // Texto de ayuda.
                placeholder="Cantidad"

                // Muestra la cantidad guardada.
                value={cantidad}

                // Actualiza la cantidad ingresada.
                onChange={(e) => setCantidad(e.target.value)}

                // Aplica los estilos y distribuye el espacio.
                style={{ ...styles.input, flex: 1 }}
              />

              {/* Campo para ingresar el precio del producto. */}
              <input
                type="number"

                // Permite ingresar números decimales de dos cifras.
                step="0.01"

                // Texto de ayuda.
                placeholder="Precio"

                // Muestra el precio guardado.
                value={precio}

                // Actualiza el precio cuando escribimos.
                onChange={(e) => setPrecio(e.target.value)}

                // Aplica los estilos al campo.
                style={{ ...styles.input, flex: 1 }}
              />

            </div>


            {/* BOTONES DEL FORMULARIO */}

            {/* Contenedor que agrupa los botones. */}
            <div style={styles.btnGroup}>

              {/* Botón para registrar el producto.
                  submit envía el formulario y ejecuta handleSubmit. */}
              <button type="submit" style={styles.btnSave}>
                Guardar producto
              </button>

              {/* Botón para limpiar los campos.
                  type button evita que se envíe el formulario.
                  onClick ejecuta handleLimpiar. */}
              <button
                type="button"
                onClick={handleLimpiar}
                style={styles.btnCancel}
              >
                Limpiar
              </button>

            </div>
          </form>
        </div>


        {/* COLUMNA 2: LISTA DE PRODUCTOS Y BUSCADOR */}

        <div style={styles.card}>

          {/* Contenedor del título y contador de productos. */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

            {/* Muestra la cantidad de productos encontrados.
                length cuenta los elementos de la lista. */}
            <h2 style={{ ...styles.cardTitle, margin: 0 }}>
              Productos ({productosFiltrados.length})
            </h2>

          </div>


          {/* BARRA PARA BUSCAR PRODUCTOS */}

          <input
            type="text"

            // Mensaje de ayuda del buscador.
            placeholder="Buscar producto..."

            // Muestra el texto que estamos buscando.
            value={busqueda}

            // Actualiza la búsqueda cuando escribimos.
            onChange={(e) => setBusqueda(e.target.value)}

            // Aplica los estilos del buscador.
            style={{ ...styles.searchInput, marginBottom: '1rem' }}
          />


          {/* VERIFICAMOS SI EXISTEN PRODUCTOS */}

          {/* Operador ternario:
              Si la cantidad de productos es 0, muestra un mensaje.
              Si existen productos, muestra la lista. */}
          {productosFiltrados.length === 0 ? (

            // Mensaje que aparece cuando no hay productos.
            <div style={styles.emptyState}>

              {/* Muestra un icono de caja. */}
              <div style={styles.iconBox}>📦</div>

              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                No hay productos todavía. Agrega el primero.
              </p>

            </div>

          ) : (

            // Si existen productos, mostramos la lista.
            <div style={styles.productList}>

              {/* map recorre todos los productos encontrados.
                  prod representa cada producto de la lista. */}
              {productosFiltrados.map((prod) => (

                // Crea una tarjeta individual para cada producto.
                <div key={prod.id} style={styles.productItem}>

                  {/* Contenedor de la información del producto. */}
                  <div style={{ flex: 1 }}>

                    {/* Organiza el nombre y la categoría. */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                      {/* Muestra el nombre del producto en negrita. */}
                      <strong style={{ fontSize: '1rem', color: '#fff' }}>
                        {prod.nombre}
                      </strong>

                      {/* Muestra la categoría como una etiqueta. */}
                      <span style={styles.badge}>
                        {prod.categoria}
                      </span>

                    </div>

                    {/* Muestra la descripción del producto. */}
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                      {prod.descripcion}
                    </p>

                  </div>


                  {/* Contenedor para mostrar precio y cantidad. */}
                  <div style={{ textAlign: 'right', margin: '0 1rem' }}>

                    {/* Number convierte el precio a número.
                        toFixed(2) muestra dos decimales.
                        S/ representa la moneda peruana. */}
                    <span style={{ display: 'block', fontWeight: 'bold', color: '#10b981' }}>
                      S/ {Number(prod.precio).toFixed(2)}
                    </span>

                    {/* Muestra la cantidad disponible en el inventario. */}
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Stock: {prod.cantidad}
                    </span>

                  </div>


                  {/* BOTÓN PARA ELIMINAR UN PRODUCTO */}

                  <button

                    // Cuando hacemos clic, enviamos el ID del producto
                    // a la función eliminarProducto.
                    onClick={() => eliminarProducto(prod.id)}

                    // Aplica los estilos del botón.
                    style={styles.btnDelete}

                    // Muestra un texto al colocar el cursor sobre el botón.
                    title="Eliminar producto"
                  >
                    ❌
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


// 7. ESTILOS CSS EN LÍNEA.

// Creamos un objeto llamado styles.
// Aquí definimos la apariencia de todos los elementos de la página.
const styles = {

  // ESTILOS DEL CONTENEDOR PRINCIPAL.
  container: {
    backgroundColor: '#0f172a', // Fondo oscuro.
    minHeight: '100vh', // Ocupa como mínimo toda la altura de la pantalla.
    color: '#f8fafc', // Color general del texto.
    fontFamily: 'system-ui, -apple-system, sans-serif', // Tipo de letra.
    padding: '1.5rem', // Espacio interno.
    boxSizing: 'border-box' // Incluye bordes y relleno en el tamaño.
  },

  // ESTILOS DE LA CABECERA.
  header: {
    marginBottom: '1.5rem', // Espacio inferior.
    maxWidth: '1100px', // Ancho máximo.
    margin: '0 auto 1.5rem auto' // Centra la cabecera y agrega espacio inferior.
  },

  // ESTILOS DEL TÍTULO PRINCIPAL.
  title: {
    margin: 0, // Elimina el margen.
    fontSize: '1.6rem', // Tamaño de letra.
    fontWeight: 'bold', // Texto en negrita.
    color: '#f8fafc' // Color del título.
  },

  // ESTILOS DEL SUBTÍTULO.
  subtitle: {
    margin: '4px 0 0 0', // Espacio exterior.
    fontSize: '0.9rem', // Tamaño de letra.
    color: '#94a3b8' // Color gris.
  },

  // ESTILOS DEL BUSCADOR.
  searchInput: {
    width: '100%', // Ocupa todo el ancho disponible.
    padding: '0.7rem 1rem', // Espacio interno.
    backgroundColor: '#0f172a', // Fondo oscuro.
    border: '1px solid #334155', // Borde.
    borderRadius: '8px', // Esquinas redondeadas.
    color: '#fff', // Texto blanco.
    fontSize: '0.9rem', // Tamaño de letra.
    outline: 'none', // Elimina el contorno predeterminado.
    boxSizing: 'border-box' // Controla el tamaño total.
  },

  // ESTILOS DE LA CUADRÍCULA PRINCIPAL.
  grid: {
    display: 'grid', // Activa la organización en cuadrícula.

    // Crea columnas que se adaptan al tamaño de la pantalla.
    // auto-fit ajusta las columnas disponibles.
    // minmax establece un mínimo de 320px y permite crecer.
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',

    gap: '1.5rem', // Espacio entre columnas.
    maxWidth: '1100px', // Ancho máximo.
    margin: '0 auto' // Centra la cuadrícula.
  },

  // ESTILOS DE LAS TARJETAS.
  card: {
    backgroundColor: '#1e293b', // Fondo de las tarjetas.
    borderRadius: '12px', // Redondea las esquinas.
    padding: '1.5rem', // Espacio interno.
    border: '1px solid #334155', // Borde de la tarjeta.
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' // Agrega sombra.
  },

  // ESTILOS DE LOS TÍTULOS DE LAS TARJETAS.
  cardTitle: {
    marginTop: 0, // Elimina el margen superior.
    marginBottom: '1.25rem', // Espacio inferior.
    fontSize: '1.1rem', // Tamaño de letra.
    color: '#e2e8f0' // Color del título.
  },

  // ESTILOS GENERALES DEL FORMULARIO.
  form: {
    display: 'flex', // Activa el diseño flexible.
    flexDirection: 'column', // Organiza los campos verticalmente.
    gap: '1rem' // Espacio entre los campos.
  },

  // ESTILOS DE LAS FILAS DEL FORMULARIO.
  row: {
    display: 'flex', // Coloca los elementos en una fila.
    gap: '0.75rem' // Espacio entre los elementos.
  },

  // ESTILOS DE LOS CAMPOS DE ENTRADA.
  input: {
    padding: '0.75rem', // Espacio interno.
    backgroundColor: '#0f172a', // Fondo oscuro.
    border: '1px solid #475569', // Borde.
    borderRadius: '8px', // Esquinas redondeadas.
    color: '#fff', // Texto blanco.
    fontSize: '0.9rem', // Tamaño de letra.
    outline: 'none', // Quita el contorno predeterminado.
    boxSizing: 'border-box' // Incluye relleno y borde en el tamaño.
  },

  // ESTILOS DEL CAMPO DE DESCRIPCIÓN.
  textarea: {
    padding: '0.75rem', // Espacio interno.
    backgroundColor: '#0f172a', // Fondo oscuro.
    border: '1px solid #475569', // Borde.
    borderRadius: '8px', // Esquinas redondeadas.
    color: '#fff', // Texto blanco.
    fontSize: '0.9rem', // Tamaño de letra.
    outline: 'none', // Elimina el contorno predeterminado.
    resize: 'vertical', // Permite cambiar el tamaño verticalmente.
    boxSizing: 'border-box' // Controla el tamaño total.
  },

  // ESTILOS DEL CONTENEDOR DE BOTONES.
  btnGroup: {
    display: 'flex', // Organiza los botones en una fila.
    gap: '0.75rem', // Espacio entre los botones.
    marginTop: '0.5rem' // Espacio superior.
  },

  // ESTILOS DEL BOTÓN GUARDAR.
  btnSave: {
    backgroundColor: '#10b981', // Fondo verde.
    color: '#fff', // Texto blanco.
    border: 'none', // Sin borde.
    padding: '0.75rem 1.25rem', // Espacio interno.
    borderRadius: '8px', // Esquinas redondeadas.
    fontWeight: 'bold', // Texto en negrita.
    cursor: 'pointer', // Cambia el cursor al pasar por encima.
    flex: 1 // Ocupa el espacio disponible.
  },

  // ESTILOS DEL BOTÓN LIMPIAR.
  btnCancel: {
    backgroundColor: 'transparent', // Fondo transparente.
    color: '#94a3b8', // Texto gris.
    border: '1px solid #475569', // Borde gris.
    padding: '0.75rem 1.25rem', // Espacio interno.
    borderRadius: '8px', // Esquinas redondeadas.
    cursor: 'pointer' // Cambia el cursor.
  },

  // ESTILOS DEL MENSAJE CUANDO NO HAY PRODUCTOS.
  emptyState: {
    display: 'flex', // Activa el diseño flexible.
    flexDirection: 'column', // Organiza los elementos verticalmente.
    alignItems: 'center', // Centra horizontalmente.
    justifyContent: 'center', // Centra verticalmente.
    padding: '2.5rem 1rem', // Espacio interno.
    color: '#94a3b8', // Texto gris.
    textAlign: 'center' // Centra el texto.
  },

  // ESTILOS DEL ICONO DE CAJA.
  iconBox: {
    fontSize: '2rem', // Tamaño del icono.
    marginBottom: '0.5rem' // Espacio inferior.
  },

  // ESTILOS DE LA LISTA DE PRODUCTOS.
  productList: {
    display: 'flex', // Activa el diseño flexible.
    flexDirection: 'column', // Coloca los productos verticalmente.
    gap: '0.75rem', // Espacio entre productos.
    maxHeight: '350px', // Altura máxima de la lista.
    overflowY: 'auto' // Agrega desplazamiento vertical si es necesario.
  },

  // ESTILOS DE CADA PRODUCTO.
  productItem: {
    backgroundColor: '#0f172a', // Fondo oscuro.
    padding: '0.8rem', // Espacio interno.
    borderRadius: '8px', // Esquinas redondeadas.
    border: '1px solid #334155', // Borde.
    display: 'flex', // Organiza los elementos en una fila.
    justifyContent: 'space-between', // Separa los elementos.
    alignItems: 'center' // Alinea verticalmente.
  },

  // ESTILOS DE LA ETIQUETA DE CATEGORÍA.
  badge: {
    backgroundColor: '#1e3a8a', // Fondo azul.
    color: '#93c5fd', // Texto azul claro.
    fontSize: '0.7rem', // Tamaño de letra.
    padding: '2px 6px', // Espacio interno.
    borderRadius: '4px', // Esquinas redondeadas.
    marginLeft: '8px', // Espacio a la izquierda.
    verticalAlign: 'middle' // Alineación vertical.
  },

  // ESTILOS DEL BOTÓN ELIMINAR.
  btnDelete: {
    backgroundColor: 'transparent', // Fondo transparente.
    border: 'none', // Sin borde.
    cursor: 'pointer', // Cambia el cursor.
    fontSize: '1rem', // Tamaño del icono.
    padding: '6px', // Espacio interno.
    borderRadius: '4px' // Esquinas redondeadas.
  }
};

// Exportamos App para poder utilizarlo desde otros archivos.
export default App;