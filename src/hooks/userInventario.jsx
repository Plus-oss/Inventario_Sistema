// Importamos useState para guardar los productos y useEffect para ejecutar acciones cuando cambian
import { useState, useEffect } from 'react';
// Importamos uuidv4 para generar identificadores únicos para cada producto
import { v4 as uuidv4 } from 'uuid';

// Creamos una clave para identificar dónde se guardarán los productos en el navegador
const STORAGE_KEY = 'inventario-productos';
// Creamos el hook personalizado para administrar el inventario
export function useInventario() {

  // Creamos una lista de productos y cargamos los datos guardados en el navegador
  const [productos, setProductos] = useState(() => {
    try {
      // Obtenemos los productos almacenados en localStorage
      const guardados = localStorage.getItem(STORAGE_KEY);

      // Si existen productos guardados, los convertimos a formato JSON
      // Si no existen, devolvemos una lista vacía
      return guardados ? JSON.parse(guardados) : [];

    } catch (error) {
      // Muestra un error en la consola si no se pueden cargar los productos
      console.error('Error al cargar productos:', error);

      // Devuelve una lista vacía si ocurre algún problema
      return [];
    }
  });

  // Se ejecuta cada vez que cambia la lista de productos
  useEffect(() => {

    // Guarda los productos en localStorage convirtiéndolos a texto JSON
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(productos)
    );

  }, [productos]); // Detecta los cambios en productos

  // Función para agregar un producto nuevo al inventario
  const agregarProducto = (nuevo) => {

    // Agrega el nuevo producto sin eliminar los anteriores
    setProductos((prev) => [
      ...prev,
      {
        ...nuevo,

        // Genera un ID único para identificar el producto
        id: uuidv4()
      }
    ]);
  };

  // Función para editar un producto existente
  const editarProducto = (id, datosActualizados) => {

    // Recorre la lista y busca el producto que queremos modificar
    setProductos((prev) =>
      prev.map((p) =>

        // Si encuentra el mismo ID, actualiza sus datos
        p.id === id
          ? { ...p, ...datosActualizados }

          // Si no coincide, mantiene el producto sin cambios
          : p
      )
    );
  };

  // Función para eliminar un producto del inventario
  const eliminarProducto = (id) => {

    // Crea una nueva lista sin el producto que tenga ese ID
    setProductos((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // Devolvemos la lista y las funciones para utilizarlas en otros componentes
  return {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto
  };
} 