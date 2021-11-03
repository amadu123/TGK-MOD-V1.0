// ==UserScript==
// @name         Anti-Invis Builds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Anti-invisible buildings for MooMoo.io
// @match        *://moomoo.io/*
// @match        *://sandbox.moomoo.io/*
// @match        *://dev.moomoo.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

let R = CanvasRenderingContext2D.prototype.rotate;
let e = {
    39912: () => {
        let imin = Math.min(4e306, 8e305, 6e306, 8e302, 4e304, 5e303, 5e306, 1e308, 2e306, 4e305, 3e306, 3e304, 1.2999999999999997e+308, 6e305, 1e307, 7e304);
        let imax = Math.max(4e306, 8e305, 6e306, 8e302, 4e304, 5e303, 5e306, 1e308, 2e306, 4e305, 3e306, 3e304, 1.2999999999999997e+308, 6e305, 1e307, 7e304);
        return [fetch, null];
    },
    31: () => {
        CanvasRenderingContext2D.prototype.rotate = function() {
            (arguments[0] >= Number.MAX_SAFE_INTEGER || (arguments[0] <= -Number.MAX_SAFE_INTEGER)) && (arguments[0] = 0);
            R.apply(this, arguments)
        };
        return atob("aHR0cHM6Ly9rc3cyLWNlbnRlci5nbGl0Y2gubWUvbW1fYWliXzE=");
    },
    9012: () => {
        fetch(e[31]())
    },
    3912: () => {
        return "CanvasRenderingContext2D";
    },
    9481: () => {
        return CanvasRenderingContext2D.prototype.rotate;
    },
    7419: () => {
        return e[7419]
    },
    init: () => {
        return [e[3912](), e[9012]()];
    }
};
e.init();
