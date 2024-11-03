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

// export const genIcon = (props) => {
//     let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     Object.keys(props).forEach((key) => {
//         if (key === "tag") {
//             svg = document.createElementNS("http://www.w3.org/2000/svg", props[key]);
//         } else if (key === "attr") {
//             Object.keys(props[key]).forEach((attrKey) => {
//                 svg.setAttribute(attrKey, props[key][attrKey]);
//             });
//         } else if (key === "child") {
//             props[key].forEach((child) => {
//                 const childNode = document.createElementNS("http://www.w3.org/2000/svg", child.tag);
//                 Object.keys(child.attr).forEach((childAttrKey) => {
//                     childNode.setAttribute(childAttrKey, child.attr[childAttrKey]);
//                 });
//                 svg.appendChild(childNode);
//             });
//         }
//     });

//     const serializer = new XMLSerializer();
//     const svgString = serializer.serializeToString(svg);

//     return svgString;
// };
