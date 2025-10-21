function onHistoryBackButtonClicked() {
    document.getElementById('page-iframe').contentWindow.history.back();
}

function onHistoryForwardButtonClicked() {
    document.getElementById('page-iframe').contentWindow.history.forward();
}

function onReloadButtonClicked() {
    document.getElementById('page-iframe').contentWindow.location.reload();
}

function onSearchButtonClicked() {
    console.log("[DEBUG] Search button clicked!");

    let iframe = document.getElementById("page-iframe");
    let input = document.getElementById("searchbar-input");

    // Cambiamos la página embedida en el iframe
    iframe.src = input.value;

    // FIX:: For some reason iframe's title isn't being updated in time
    // Need a proper way to change the browser's name when the iframe changes

    // Cambiamos el título del navegador
    let updatedIframe = document.getElementById("page-iframe");
    let iframeDocument = updatedIframe.contentWindow.document || updatedIframe.contentDocument;
    let title = iframeDocument.title;
    
    if (title !== "")
        document.title = `Furryfox Browser - ${title}`;
    else
        document.title = "Furryfox Browser";

    console.log("[DEBUG] Switching page to " + input.value);
}

