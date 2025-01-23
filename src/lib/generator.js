export const genIcon = (obj) => {
    let svgString = "<" + obj.tag;
    if (obj.tag === "svg") {
        svgString += ' xmlns="http://www.w3.org/2000/svg"';
    }
    for (let attr in obj.attr) {
        svgString += " " + attr + '="' + obj.attr[attr] + '"';
    }
    svgString += ">";
    if (obj.child) {
        for (let child of obj.child) {
            svgString += genIcon(child); // Llamada recursiva para manejar objetos anidados
        }
    }
    svgString += "</" + obj.tag + ">";
    return svgString;
};
