document.addEventListener('DOMContentLoaded', () => {
    const frutaForm = document.getElementById('frutaForm');
    const frutasContainer = document.getElementById('frutasContainer');
    const toggleModeButton = document.getElementById('toggleMode');
    const body = document.body;
  
    let frutas = [];
    let editIndex = -1;
  
    // Obtener y mostrar las frutas
    const mostrarFrutas = () => {
      frutasContainer.innerHTML = '';
      frutas.forEach((fruta, index) => {
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
          <button onclick="editarFruta(${index})">Editar</button>
          <button onclick="eliminarFruta(${index})">Eliminar</button>
        `;
        frutaDiv.insertBefore(imgElement, frutaDiv.firstChild);
        frutasContainer.appendChild(frutaDiv);
      });
    };
  
    // Crear o actualizar fruta
    frutaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      const imagen = document.getElementById('imagen').value;
  
      const frutaData = { nombre, precio, imagen };
  
      if (editIndex === -1) {
        // Crear nueva fruta
        frutas.push(frutaData);
      } else {
        // Actualizar fruta
        frutas[editIndex] = frutaData;
        editIndex = -1;
      }
  
      frutaForm.reset();
      mostrarFrutas();
    });
  
    // Editar fruta
    window.editarFruta = (index) => {
      const fruta = frutas[index];
      document.getElementById('frutaId').value = index;
      document.getElementById('nombre').value = fruta.nombre;
      document.getElementById('precio').value = fruta.precio;
      document.getElementById('imagen').value = fruta.imagen;
      editIndex = index;
    };
  
    // Eliminar fruta
    window.eliminarFruta = (index) => {
      frutas.splice(index, 1);
      mostrarFrutas();
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
  
    mostrarFrutas();
  });
  