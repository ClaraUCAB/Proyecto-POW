function onIconClicked(route) {
    document.getElementById('current-app-iframe').src = route;
}

// Registramos cada uno de los iconos
const icons = document.querySelectorAll('.app-icon');
icons.forEach(icon => {
    icon.addEventListener('click', function() {
        onIconClicked(`/${icon.id}`);
    });
});

