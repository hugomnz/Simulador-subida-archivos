// Función que construye y devuelve una promesa para simular la subida de archivo
function PromesaSubida() {
    return new Promise(function simulador(resolve, reject) {
      // Generar tiempo aleatorio entre 2 y 5 segundos
      const tiempo_de_subida = Math.floor(Math.random() * 3000) + 2000;
  
      // Decidir si la operación tiene éxito o falla (75% éxito)
      const exito_de_subida = Math.random() > 0.25;
  
      // Simular la latencia de red
      setTimeout(() => {
        if (exito_de_subida) {
          resolve(tiempo_de_subida); // Resuelve con el tiempo transcurrido
        } else {
          reject("🚨 Error al subir el archivo. Inténtelo de nuevo."); // Rechaza con mensaje de error
        }
      }, tiempo_de_subida);
    });
  }
  
  // Espera a que el DOM esté completamente cargado
  document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("boton");
    const status = document.getElementById("status");
  
    // Al hacer clic en el botón
    boton.addEventListener("click", () => {
      // Desactiva el botón
      boton.disabled = true;
  
      // Muestra mensaje de progreso con animación
      status.textContent = "🚧 Subiendo archivo...";
      status.className = "status-progreso";
  
      // Llamada a la promesa
      PromesaSubida()
        .then(tiempo_de_subida => {
          const segundos = (tiempo_de_subida / 1000).toFixed(2); // Convertir ms a segundos
          status.textContent = `✅ Archivo subido correctamente en ${segundos} segundos.`;
          status.className = "status-exito";
          boton.disabled = false; // Reactivar el botón
        })
        .catch(error => {
          status.textContent = error;
          status.className = "status-error";
          boton.disabled = false; // Reactivar el botón
        });
    });
  });
  