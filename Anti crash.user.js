// ==UserScript==
// @name       Anti crash
// @namespace    amadu123.github.io
// @version    1.01
// @description Anti crash (only works for you)
// @author       hackPD
// @match        *://sandbox.moomoo.io/*
// @match        *://dev.moomoo.io/*
// @match        *://moomoo.io/*
// @grant    none
// @require https://greasyfork.org/scripts/423602-msgpack/code/msgpack.js
// ==/UserScript==

class ws2 extends WebSocket {
    constructor(){
        super(...arguments);

        this.staticSend = this.send;

        this.send = function(m){
            try{
                msgpack.decode(new Uint8Array(m));
            } catch (error){
                console.log("intercepted dash packet, disconnecting");
                return this.close();
            }
            this.staticSend(m);
        }
    }
}


WebSocket = ws2;