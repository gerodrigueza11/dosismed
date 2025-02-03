let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Evita que el navegador muestre el banner automático de instalación
    event.preventDefault();
    // Guarda el evento para usarlo más tarde
    deferredPrompt = event;
    // Habilita el botón de instalación
    document.getElementById('installButton').disabled = false;
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
            // Deshabilita el botón después de la instalación
            document.getElementById('installButton').disabled = true;
        });
    } else {
        console.log('El evento beforeinstallprompt no se ha disparado aún.');
    }
});

// Deshabilita el botón al cargar la página
document.getElementById('installButton').disabled = true;
