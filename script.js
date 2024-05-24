document.addEventListener('DOMContentLoaded', () => {
    const frutaForm = document.getElementById('frutaForm');
    const frutasContainer = document.getElementById('frutasContainer');
    const toggleModeButton = document.getElementById('toggleMode');
    const body = document.body;
  
    const apiURL = 'http://localhost:5000/api/frutas';
  
    let editIndex = null;
  
    // Obtener y mostrar las frutas
    const obtenerFrutas = async () => {
      const response = await fetch(apiURL);
      const frutas = await response.json();
      frutasContainer.innerHTML = '';
      frutas.forEach((fruta) => {
        const frutaDiv = document.createElement('div');
        frutaDiv.classList.add('fruta');
        const imgElement = document.createElement('img');
        imgElement.src = fruta.imagen;
        imgElement.alt = fruta.nombre;
        imgElement.onerror = () => {
          imgElement.src = 'https://via.placeholder.com/600x400';  // Imagen por defecto
          console.error(`Error al cargar la imagen de ${fruta.nombre}`);
        };
        frutaDiv.innerHTML = `
          <h3>${fruta.nombre}</h3>
          <p>$${fruta.precio}</p>
          <button onclick="editarFruta('${fruta._id}')">Editar</button>
          <button onclick="eliminarFruta('${fruta._id}')">Eliminar</button>
        `;
        frutaDiv.insertBefore(imgElement, frutaDiv.firstChild);
        frutasContainer.appendChild(frutaDiv);
      });
    };
  
    // Crear o actualizar fruta
    frutaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      const imagen = document.getElementById('imagen').value;
  
      const frutaData = { nombre, precio, imagen };
  
      if (editIndex === null) {
        // Crear nueva fruta
        await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(frutaData),
        });
      } else {
        // Actualizar fruta
        await fetch(`${apiURL}/${editIndex}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(frutaData),
        });
        editIndex = null;
      }
  
      frutaForm.reset();
      obtenerFrutas();
    });
  
    // Editar fruta
    window.editarFruta = async (id) => {
      const response = await fetch(`${apiURL}/${id}`);
      const fruta = await response.json();
      document.getElementById('frutaId').value = id;
      document.getElementById('nombre').value = fruta.nombre;
      document.getElementById('precio').value = fruta.precio;
      document.getElementById('imagen').value = fruta.imagen;
      editIndex = id;
    };
  
    // Eliminar fruta
    window.eliminarFruta = async (id) => {
      await fetch(`${apiURL}/${id}`, {
        method: 'DELETE',
      });
      obtenerFrutas();
    };
  
    // Alternar modo claro/oscuro
    toggleModeButton.addEventListener('click', () => {
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleModeButton.textContent = 'Modo Claro';
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleModeButton.textContent = 'Modo Oscuro';
      }
    });
  
    obtenerFrutas();
  });
  