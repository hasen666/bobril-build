var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
function hyphenateStyle(s) {
    if (s === "cssFloat")
        return "float";
    return s.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
}
function inlineStyleToCssDeclaration(style) {
    var res = "";
    for (var key in style) {
        var v = style[key];
        if (v === undefined)
            continue;
        res += hyphenateStyle(key) + ":" + (v === "" ? '""' : v) + ";";
    }
    res = res.slice(0, -1);
    return res;
}
console.log(inlineStyleToCssDeclaration({ a: 1, b: 2 }));
//# sourceMappingURL=main.js.map