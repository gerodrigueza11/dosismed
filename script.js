let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Evita que el navegador muestre el banner automático
  event.preventDefault();
  // Guarda el evento para usarlo más tarde
  deferredPrompt = event;
  // Muestra un botón de instalación personalizado
  document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', () => {
  if (deferredPrompt) {
    // Muestra el prompt de instalación
    deferredPrompt.prompt();
    // Espera a que el usuario responda
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó instalar la PWA');
      } else {
        console.log('El usuario rechazó instalar la PWA');
      }
      // Limpia la variable
      deferredPrompt = null;
    });
  }
});
