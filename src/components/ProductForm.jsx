// Importamos useState y useEffect desde React
// useState permite guardar y modificar información.
// useEffect permite ejecutar acciones cuando cambia un dato.
import { useState, useEffect } from 'react';

// Creamos el componente ProductForm.
// Recibe tres propiedades:
// productoInicial: contiene los datos del producto que vamos a editar.
// onGuardar: función que envía los datos para guardar.
// onCancelar: función que cancela el formulario.
function ProductForm({ productoInicial, onGuardar, onCancelar }) {

  // useState crea una variable llamada form.
  // Dentro guardamos los datos que el usuario escribirá.
  // setForm sirve para actualizar esos datos.
  const [form, setForm] = useState({
    nombre: '',       // Guarda el nombre del producto.
    categoria: '',    // Guarda la categoría del producto.
    descripcion: '',  // Guarda la descripción del producto.
    cantidad: '',     // Guarda la cantidad de productos.
    precio: ''        // Guarda el precio del producto.
  });

  // useEffect ejecuta este código cuando cambia productoInicial.
  // Sirve para cargar los datos de un producto que queremos editar.
  useEffect(() => {

    // Verificamos si existe un producto seleccionado.
    if (productoInicial) {

      // setForm actualiza los campos con los datos del producto.
      setForm({
        nombre: productoInicial.nombre || '', 
        // Si tiene nombre, lo muestra; si no, deja el campo vacío.

        categoria: productoInicial.categoria || '',
        // Carga la categoría del producto.

        descripcion: productoInicial.descripcion || '',
        // Carga la descripción del producto.

        cantidad: productoInicial.cantidad ?? '',
        // Carga la cantidad. Si es null o undefined, deja el campo vacío.

        precio: productoInicial.precio ?? ''
        // Carga el precio. Si no existe, deja el campo vacío.
      });
    }
  }, [productoInicial]); 
  // Los corchetes indican que el efecto se ejecuta cuando cambia productoInicial.

  // Creamos una función para detectar los cambios en los campos.
  const manejarCambio = (e) => {

    // e representa el evento que ocurre cuando escribimos.
    // target identifica el campo donde estamos escribiendo.
    // name obtiene el nombre del campo y value obtiene el dato ingresado.
    const { name, value } = e.target;

    // Actualizamos los datos del formulario.
    setForm(prev => ({

      // ...prev conserva los datos que ya estaban guardados.
      ...prev,

      // [name] identifica qué campo estamos modificando.
      // value guarda el nuevo dato que escribió el usuario.
      [name]: value
    }));
  };

  // Creamos una función que se ejecuta al enviar el formulario.
  const manejarEnvio = (e) => {

    // Evita que el formulario recargue la página automáticamente.
    e.preventDefault();

    // Verificamos que los campos obligatorios tengan información.
    if (
      !form.nombre.trim() || // Comprueba que el nombre no esté vacío.
      !form.categoria.trim() || // Comprueba que la categoría no esté vacía.
      form.cantidad === '' || // Comprueba que se haya ingresado una cantidad.
      form.precio === '' // Comprueba que se haya ingresado un precio.
    ) {

      // Muestra una alerta si falta completar algún campo.
      alert('Completa todos los campos obligatorios');

      // return detiene la función para que no continúe guardando.
      return;
    }

    // Number convierte los datos a números.
    // Verificamos que la cantidad y el precio no sean negativos.
    if (Number(form.cantidad) < 0 || Number(form.precio) < 0) {

      // Muestra un mensaje si se ingresó un número negativo.
      alert('La cantidad y el precio no pueden ser negativos');

      // Detiene el proceso si encuentra un valor negativo.
      return;
    }

    // onGuardar envía los datos del formulario al componente principal.
    onGuardar({

      // ...form copia todos los datos del formulario.
      ...form,

      // Number convierte la cantidad de texto a número.
      cantidad: Number(form.cantidad),

      // Number convierte el precio de texto a número.
      precio: Number(form.precio)
    });
  };

  // return muestra en pantalla el contenido del formulario.
  return (

    // form crea un formulario.
    // onSubmit ejecuta manejarEnvio cuando enviamos los datos.
    <form onSubmit={manejarEnvio}>

      {/* Muestra un título según la acción que estamos realizando.
          Si existe productoInicial, muestra Editar producto.
          Si no existe, muestra Agregar producto. */}
      <h2>{productoInicial ? 'Editar producto' : 'Agregar producto'}</h2>

      {/* input crea un campo para ingresar información.
          name identifica el campo.
          placeholder muestra un texto de ayuda.
          value muestra el dato guardado en form.
          onChange detecta cuando el usuario escribe.
          required indica que el campo es obligatorio. */}
      <input
        name="nombre"
        placeholder="Nombre del producto"
        value={form.nombre}
        onChange={manejarCambio}
        required
      />

      {/* Campo para ingresar la categoría del producto.
          Tiene las mismas propiedades que el campo anterior. */}
      <input
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={manejarCambio}
        required
      />

      {/* textarea crea un espacio más grande para escribir
          una descripción del producto. */}
      <textarea
        name="descripcion"
        placeholder="Descripción del producto"
        value={form.descripcion}
        onChange={manejarCambio}
      />

      {/* Campo para ingresar la cantidad.
          type="number" permite ingresar números.
          min="0" establece que el valor mínimo sea cero.
          required indica que es obligatorio. */}
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        min="0"
        value={form.cantidad}
        onChange={manejarCambio}
        required
      />

      {/* Campo para ingresar el precio.
          type="number" permite ingresar números.
          min="0" evita valores menores que cero.
          step="0.01" permite ingresar decimales de dos cifras. */}
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        min="0"
        step="0.01"
        value={form.precio}
        onChange={manejarCambio}
        required
      />

      {/* Botón para enviar el formulario.
          type="submit" indica que ejecutará manejarEnvio.
          El texto cambia dependiendo de si agregamos o editamos. */}
      <button type="submit">
        {productoInicial ? 'Actualizar producto' : 'Guardar producto'}
      </button>

      {/* Botón para cancelar.
          type="button" evita que se envíe el formulario.
          onClick ejecuta la función onCancelar cuando hacemos clic. */}
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>

    </form>
  );
}

// export default permite utilizar este componente
// en otros archivos del proyecto.
export default ProductForm;