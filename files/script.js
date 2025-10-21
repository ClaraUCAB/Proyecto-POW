document.addEventListener('DOMContentLoaded', function() {
    const fileItems = document.querySelectorAll('.file-item');
    const fileInfo = document.getElementById('fileInfo');
    const infoName = document.getElementById('infoName');
    const infoType = document.getElementById('infoType');
    const infoSize = document.getElementById('infoSize');
    const infoModified = document.getElementById('infoModified');
    
    fileItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obtener información del archivo
            const name = this.getAttribute('data-name');
            const type = this.getAttribute('data-type');
            const size = this.getAttribute('data-size');
            const modified = this.getAttribute('data-modified');
            
            // Actualizar la información en el panel
            infoName.textContent = `Nombre: ${name}`;
            infoType.textContent = `Tipo: ${getTypeDescription(type)}`;
            infoSize.textContent = `Tamaño: ${size}`;
            infoModified.textContent = `Modificado: ${modified}`;
            
            // Mostrar el panel de información
            fileInfo.classList.add('active');
            
            // Remover la clase activa de todos los elementos
            fileItems.forEach(el => el.classList.remove('active'));
            
            // Agregar la clase activa al elemento actual
            this.classList.add('active');
        });
    });
    
    // wea para obtener descripción del tipo de archivo
    function getTypeDescription(type) {
        const types = {
            'folder': 'Carpeta',
            'document': 'Documento',
            'music': 'Archivo de música',
            'image': 'Imagen'
        };
        
        return types[type] || 'Archivo';
    }
    
    // Cerrar el panel de información
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.file-item') && !e.target.closest('.file-info')) {
            fileInfo.classList.remove('active');
            fileItems.forEach(el => el.classList.remove('active'));
        }
    });
    
    //barra lateral
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            sidebarLinks.forEach(el => el.classList.remove('active'));
            
            // Agregar clase activa al enlace actual
            this.classList.add('active');
            
            // Aquí podrías agregar lógica para cambiar el contenido según la ubicación seleccionada
            console.log(`Navegando a: ${this.textContent}`);
        });
    });
});