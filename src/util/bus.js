function checkFilter(category, title, checked) {

    let titleIndex = this[category].indexOf(title);

    let removeCategoryOfNull = titleIndex >= 0 ?
        this[category].splice(titleIndex, 1) :
        null;

    checked
        ?
        this[category].push(title) :
        removeCategoryOfNull;
}

export { checkFilter };
