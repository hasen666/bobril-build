"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathUtils = require("./pathUtils");
const pathPlatformDependent = require("path");
const path = pathPlatformDependent.posix; // This works everywhere, just use forward slashes
const fs = require("fs");
require('bluebird');
const simpleHelpers_1 = require("./simpleHelpers");
function tslibSource() {
    return `var __extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

var __extends = function (d, b) {
    __extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var __rest = function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

var __decorate = function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var __metadata = function (metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
};

var __awaiter = function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __generator = function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
`;
}
exports.tslibSource = tslibSource;
function systemJsPath() {
    return path.join(pathUtils.dirOfNodeModule('systemjs'), 'dist');
}
exports.systemJsPath = systemJsPath;
function systemJsFiles() {
    return ['system.js', 'system-polyfills.js'];
}
exports.systemJsFiles = systemJsFiles;
function loaderJsPath() {
    return __dirname.replace(/\\/g, "/");
}
exports.loaderJsPath = loaderJsPath;
function loaderJsFiles() {
    return ["loader.js"];
}
exports.loaderJsFiles = loaderJsFiles;
function numeralJsPath() {
    return pathUtils.dirOfNodeModule('numeral');
}
exports.numeralJsPath = numeralJsPath;
function numeralJsFiles() {
    return ['numeral.js'];
}
exports.numeralJsFiles = numeralJsFiles;
function momentJsPath() {
    return pathUtils.dirOfNodeModule('moment');
}
exports.momentJsPath = momentJsPath;
function momentJsFiles() {
    return ['moment.js'];
}
exports.momentJsFiles = momentJsFiles;
function linkCss(project) {
    return project.cssToLink.map(n => `<link rel="stylesheet" href="${n}">`).join("");
}
function systemJsBasedIndexHtml(project) {
    let title = project.htmlTitle || 'Bobril Application';
    let moduleNames = Object.keys(project.moduleMap);
    let moduleMap = Object.create(null);
    for (let i = 0; i < moduleNames.length; i++) {
        let name = moduleNames[i];
        if (project.moduleMap[name].internalModule)
            continue;
        moduleMap[name] = project.moduleMap[name].jsFile;
    }
    return `<!DOCTYPE html><html>
    <head>
        <meta charset="utf-8">${project.htmlHeadExpanded}
        <title>${title}</title>${linkCss(project)}
    </head>
    <body>${g11nInit(project)}
        <script type="text/javascript" src="system.js" charset="utf-8"></script>
        <script type="text/javascript">
            ${simpleHelpers_1.globalDefines(project.defines)}
            System.config({
                baseURL: '/',
                defaultJSExtensions: true,
                map: ${JSON.stringify(moduleMap)}
            });
            System.import('${project.mainJsFile}');
        </script>
    </body>
</html>
`;
}
exports.systemJsBasedIndexHtml = systemJsBasedIndexHtml;
function g11nInit(project) {
    if (!project.localize && !project.bundlePng)
        return "";
    let res = "<script>";
    if (project.localize) {
        res += `function g11nPath(s){return "./${project.outputSubDir ? (project.outputSubDir + "/") : ""}"+s+".js"};`;
        if (project.defaultLanguage) {
            res += `var g11nLoc="${project.defaultLanguage}";`;
        }
    }
    if (project.bundlePng) {
        res += `var bobrilBPath="${project.bundlePng}"`;
    }
    res += "</script>";
    return res;
}
function bundleBasedIndexHtml(project) {
    let title = project.htmlTitle || 'Bobril Application';
    return `<!DOCTYPE html><html><head><meta charset="utf-8">${project.htmlHeadExpanded}<title>${title}</title>${linkCss(project)}</head><body>${g11nInit(project)}<script type="text/javascript" src="${project.bundleJs || "bundle.js"}" charset="utf-8"></script></body></html>`;
}
exports.bundleBasedIndexHtml = bundleBasedIndexHtml;
function examplesListIndexHtml(fileNames, project) {
    let testList = "";
    for (let i = 0; i < fileNames.length; i++) {
        testList += `<li><a href="${fileNames[i]}">` + path.basename(fileNames[i], ".html") + '</a></li>';
    }
    let title = project.htmlTitle || 'Bobril Application';
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">${project.htmlHeadExpanded}
            <title>${title}</title>${linkCss(project)}
        </head>
        <body>
        <ul>${testList}</ul>
        </body>
    </html>`;
}
exports.examplesListIndexHtml = examplesListIndexHtml;
function getModuleMap(project) {
    let moduleNames = Object.keys(project.moduleMap);
    let moduleMap = Object.create(null);
    for (let i = 0; i < moduleNames.length; i++) {
        let name = moduleNames[i];
        if (project.moduleMap[name].internalModule)
            continue;
        moduleMap[name] = path.join(project.realRootRel, project.moduleMap[name].jsFile.replace(/\.js$/i, ""));
    }
    return `R.map = ${JSON.stringify(moduleMap)};`;
}
exports.getModuleMap = getModuleMap;
function requireBobril(project) {
    if (project.commonJsTemp[project.realRootRel + "node_modules/bobril/index.js"]) {
        return `R.r('${project.realRootRel}node_modules/bobril/index')
        `;
    }
    if (project.commonJsTemp[project.realRootRel + "node_modules/bobriln/index.js"]) {
        return `R.r('${project.realRootRel}node_modules/bobriln/index')
        `;
    }
    return "";
}
let liveReloadCode = "";
function setupLivereload(project) {
    if (!project.liveReloadEnabled)
        return "";
    if (liveReloadCode == "") {
        liveReloadCode = fs.readFileSync(path.join(__dirname, "liveReload.js"), "utf-8");
    }
    return `<script type="text/javascript">${liveReloadCode.replace(/##Idx##/, project.liveReloadIdx.toString())}</script>`;
}
function fastBundleBasedIndexHtml(project) {
    let title = project.htmlTitle || 'Bobril Application';
    let loaderjs = (project.outputSubDir ? project.outputSubDir + "/" : "") + "loader.js";
    return `<!DOCTYPE html><html>
    <head>
        <meta charset="utf-8">${project.htmlHeadExpanded}
        <title>${title}</title>${linkCss(project)}
    </head>
    <body>${g11nInit(project)}${setupLivereload(project)}
        <script type="text/javascript" src="${loaderjs}" charset="utf-8"></script>
        <script type="text/javascript">
            ${simpleHelpers_1.globalDefines(project.defines)}
            ${getModuleMap(project)}
        </script>
        <script type="text/javascript" src="${project.bundleJs || "bundle.js"}" charset="utf-8"></script>
        <script type="text/javascript">
            ${requireBobril(project)}R.r('${project.realRootRel}${project.mainJsFile.replace(/\.js$/i, "")}');
        </script>
    </body>
</html>
`;
}
exports.fastBundleBasedIndexHtml = fastBundleBasedIndexHtml;
function fastBundleBasedTestHtml(project) {
    let title = 'Jasmine Test';
    let reqSpec = project.mainSpec.filter(v => !/\.d.ts$/i.test(v)).map(v => `R.r('${project.realRootRel}${v.replace(/\.tsx?$/i, "")}');`).join(' ');
    return `<!DOCTYPE html><html>
    <head>
        <meta charset="utf-8">${project.htmlHeadExpanded}
        <title>${title}</title>${linkCss(project)}
    </head>
    <body>${g11nInit(project)}
        <script type="text/javascript" src="bb/special/jasmine-core.js" charset="utf-8"></script>
        <script type="text/javascript" src="bb/special/jasmine-boot.js" charset="utf-8"></script>
        <script type="text/javascript" src="bb/special/loader.js" charset="utf-8"></script>
        <script type="text/javascript">
            ${simpleHelpers_1.globalDefines(project.defines)}
            ${getModuleMap(project)}
        </script>
        <script type="text/javascript" src="${project.bundleJs || "bundle.js"}" charset="utf-8"></script>
        <script type="text/javascript">
            ${requireBobril(project)}${reqSpec}
        </script>
    </body>
</html>
`;
}
exports.fastBundleBasedTestHtml = fastBundleBasedTestHtml;
function writeDir(write, dir, files) {
    for (let i = 0; i < files.length; i++) {
        let f = files[i];
        write(f, fs.readFileSync(path.join(dir, f)));
    }
}
function updateIndexHtml(project) {
    let newIndexHtml;
    if (project.totalBundle) {
        newIndexHtml = bundleBasedIndexHtml(project);
    }
    else if (project.fastBundle) {
        if (project.mainExamples.length <= 1) {
            newIndexHtml = fastBundleBasedIndexHtml(project);
        }
        else {
            let fileNames = [];
            for (let i = 0; i < project.mainExamples.length; i++) {
                let examplePath = project.mainExamples[i];
                let fileName = path.basename(examplePath).replace(/\.tsx?$/, '.html');
                project.mainJsFile = examplePath.replace(/\.tsx?$/, '.js');
                let content = fastBundleBasedIndexHtml(project);
                project.writeFileCallback(fileName, new Buffer(content));
                fileNames.push(fileName);
            }
            newIndexHtml = examplesListIndexHtml(fileNames, project);
        }
    }
    else {
        newIndexHtml = systemJsBasedIndexHtml(project);
    }
    if (newIndexHtml !== project.lastwrittenIndexHtml) {
        project.writeFileCallback('index.html', new Buffer(newIndexHtml));
        project.lastwrittenIndexHtml = newIndexHtml;
    }
}
exports.updateIndexHtml = updateIndexHtml;
function updateTestHtml(project) {
    let newIndexHtml;
    newIndexHtml = fastBundleBasedTestHtml(project);
    project.writeFileCallback('test.html', new Buffer(newIndexHtml));
}
exports.updateTestHtml = updateTestHtml;
function findLocaleFile(filePath, locale, ext) {
    let improved = false;
    while (true) {
        if (fs.existsSync(path.join(filePath, locale + ext))) {
            return path.join(filePath, locale + ext);
        }
        if (improved)
            throw new Error('Improvement to ' + locale + ' failed');
        let dashPos = locale.lastIndexOf('-');
        if (dashPos < 0)
            return null;
        locale = locale.substr(0, dashPos);
    }
}
const pluralFns = require('make-plural');
function getLanguageFromLocale(locale) {
    let idx = locale.indexOf('-');
    if (idx >= 0)
        return locale.substr(0, idx);
    return locale;
}
function writeTranslationFile(g11nVersion, locale, translationMessages, filename, write) {
    let resbufs = [];
    if (locale === 'en' || /^en-us/i.test(locale)) {
        // English is always included
    }
    else {
        if (g11nVersion < 3) {
            let fn = findLocaleFile(path.join(numeralJsPath(), 'min', 'languages'), locale, '.min.js');
            if (fn) {
                resbufs.push(fs.readFileSync(fn));
                resbufs.push(new Buffer('\n', 'utf-8'));
            }
        }
        let fn = findLocaleFile(path.join(momentJsPath(), 'locale'), locale, '.js');
        if (fn) {
            resbufs.push(fs.readFileSync(fn));
            resbufs.push(new Buffer('\n', 'utf-8'));
        }
    }
    resbufs.push(new Buffer('bobrilRegisterTranslations(\'' + locale + '\',[', 'utf-8'));
    let pluralFn = pluralFns[getLanguageFromLocale(locale)];
    if (pluralFn) {
        resbufs.push(new Buffer(pluralFn.toString(), 'utf-8'));
    }
    else {
        resbufs.push(new Buffer('function(){return\'other\';}', 'utf-8'));
    }
    if (g11nVersion >= 3) {
        let fn = findLocaleFile(path.join(numeralJsPath(), 'min', 'languages'), locale, '.min.js');
        let td = ",";
        let dd = ".";
        if (fn) {
            let c = fs.readFileSync(fn, "utf-8");
            let m = /thousands:"(.)",decimal:"(.)"/.exec(c);
            if (m != null) {
                td = m[1];
                dd = m[2];
            }
        }
        resbufs.push(new Buffer(`,"${td}","${dd}"`, 'utf-8'));
    }
    resbufs.push(new Buffer('],', 'utf-8'));
    resbufs.push(new Buffer(JSON.stringify(translationMessages), 'utf-8'));
    resbufs.push(new Buffer(')', 'utf-8'));
    write(filename, Buffer.concat(resbufs));
}
exports.writeTranslationFile = writeTranslationFile;
function writeDirFromCompilationCache(cc, write, dir, files, prependDestPath) {
    for (let i = 0; i < files.length; i++) {
        let f = files[i];
        cc.copyToProjectIfChanged(f, dir, (prependDestPath || "") + f, write);
    }
}
function updateSystemJsByCC(cc, write) {
    writeDirFromCompilationCache(cc, write, systemJsPath(), systemJsFiles());
}
exports.updateSystemJsByCC = updateSystemJsByCC;
function updateLoaderJsByCC(cc, write, prependDestPath) {
    writeDirFromCompilationCache(cc, write, loaderJsPath(), loaderJsFiles(), prependDestPath);
}
exports.updateLoaderJsByCC = updateLoaderJsByCC;
//# sourceMappingURL=bobrilDepsHelpers.js.map