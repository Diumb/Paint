let addEventsMethods = {
    addEvents(elements, event, func) {
        elements.forEach(item => {
            item?.addEventListener(event, func);
        });
    }
}

export { addEventsMethods };