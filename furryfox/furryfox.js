function onSearchButtonClicked() {
    console.log("[DEBUG] Search button clicked!");

    let iframe = document.getElementById("page-iframe");
    let input = document.getElementById("searchbar-input");

    iframe.src = input.value;

    console.log("[DEBUG] Switching page to " + input.value);
}

