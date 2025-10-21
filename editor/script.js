class TextEditor {
    constructor() {
        this.textArea = document.getElementById('text-area');
        this.charCount = document.getElementById('char-count');
        this.wordCount = document.getElementById('word-count');
        this.lineCount = document.getElementById('line-count');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateAll();
    }
    
    setupEventListeners() {
        this.textArea.addEventListener('input', () => this.updateAll());
        this.textArea.addEventListener('click', () => this.updateCursorPosition());
        this.textArea.addEventListener('keyup', () => this.updateCursorPosition());
        this.textArea.addEventListener('scroll', () => this.syncScroll());
        
        document.getElementById('btn-new').addEventListener('click', () => this.newDocument());
        document.getElementById('btn-save').addEventListener('click', () => this.saveDocument());
        document.getElementById('btn-open').addEventListener('click', () => this.openDocument());
    }
    
    updateAll() {
        this.updateCounters();
        this.updateCursorPosition();
    }
    
    
    updateCounters() {
        const text = this.textArea.value;
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        
        this.charCount.textContent = `${chars} caracteres`;
        this.wordCount.textContent = `${words} palabras`;
    }
    
    updateCursorPosition() {
        const text = this.textArea.value;
        const cursorPos = this.textArea.selectionStart;
        
        const textUntilCursor = text.substring(0, cursorPos);
        const lines = textUntilCursor.split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        
        this.lineCount.textContent = `Línea ${line}, Columna ${column}`;
    }
    

    
    newDocument() {
        if (!this.textArea.value || confirm('¿Crear nuevo documento? Se perderán los cambios no guardados.')) {
            this.textArea.value = '';
            this.updateAll();
        }
    }
    
    saveDocument() {
        const content = this.textArea.value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.txt';
        a.click();
        
        URL.revokeObjectURL(url);
        
        this.showMessage('Documento guardado exitosamente');
    }
    
    openDocument() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.md,.js,.html,.css,.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.textArea.value = event.target.result;
                    this.updateAll();
                    this.showMessage(`Archivo "${file.name}" cargado exitosamente`);
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    }
    
    formatText(command) {
        document.execCommand(command, false, null);
        this.textArea.focus();
    }
    
    showMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
}

// Inicializar el editor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TextEditor();
});