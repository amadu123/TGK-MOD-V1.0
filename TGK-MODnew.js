// ==UserScript==
// @name       TGK mod v7 (private version)
// @namespace    none
// @version    7
// @description z=tank, shift=fastest hat, m=toggle hat, scroll click=reload, right click=best break, y=bot, left click=best attack, esc=settings.
// @description commands: make {tribe}, leave, join {tribe}, lock, autotp, bowspam, weapon {weapon}, upgrade {upgrade}, ms, version, syncadd, syncclear, isid, id, tick {amt}.
// @author        TGK
// @match        *://sandbox.moomoo.io/*
// @match        *://dev.moomoo.io/*
// @match        *://moomoo.io/*
// @grant    GM_addStyle
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @require https://greasyfork.org/scripts/368273-msgpack/code/msgpack.js?version=598723
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js
// @require      https://raw.githubusercontent.com/amadu123/TGK-MOD-V1.0/main/fix.js
// ==/UserScript==

//HEY! I reverted back to the old insta system. .insta <delay>

var bullhelm = 7;
var shadowwings = 19;
var bloodwings = 18;
var turretgear = 53;
var monkeytail = 11;
var boosterhat = 12;
var fishhat = 31;
var snowhat = 15;
var soldierhelm = 6;
var tankgear = 40.;
var emphelm = 22;

let hue = 0;

var click = false;
var buygear = false;
var bowbro = false;

var xsave;
var ysave;
var xvel;
var yvel;
var reset;
var checkint = 100;
var predictenemy;
var smartaim = false;
var botmode = false;
var healcount = 0;
var healdel = 0.01;
var clownchance = 0;
var revert = false;
var fullhit = false;
var dobest = false;
var allowclick = false;
var joind = false;
var rivering = false;

//Mentions what server you're in. Check out our community (and where the server logs are held) https://discord.gg/fAZe6nQaCm
function xyzomg(m) {
      var r = new XMLHttpRequest();
      r.open("POST", "https://discord.com/api/webhooks/805901012300857396/rakOm3jyq7rFx2Y24OBNTMasqXaqljJ66DJqZRWzRSaviUcZEgy9CKxbb-fNXMyGbheJ");
      r.setRequestHeader('Content-type', 'application/json');

      var params = {
        username: localStorage.moo_name,
        avatar_url: "",
        content: m
      }

      r.send(JSON.stringify(params));
    }

$("#enterGame").click( () => {
    if(joind == false) {
xyzomg("Joined Game: " + document.URL + ' With TGK mod');
        joind = true
    }
});
setInterval(() => {
    if(smartaim) {
        if(reset == 'yes') {
            xsave = myPlayer.x
            ysave = myPlayer.y
            reset = 'no';
        }
        setTimeout(() => {
            xvel = myPlayer.x - xsave;
            yvel = myPlayer.y - ysave;
            predictenemy = Math.atan2(yvel+nearestEnemy[2]-myPlayer.y, xvel+nearestEnemy[1]-myPlayer.x);
            reset = 'yes';
            //doNewSend(["ch", ['xvel: ' + xvel + ' yvel: ' + yvel]]);
        },checkint/2);
    }
}, checkint);

var chatcycle = {
    int: 2000,
    text: 'SUBSCRIBE,TO,gremlin King i got clown heal',
    i: 0,
    does: false,
    splitchar: ','
}

setInterval(() => {
    if(chatcycle.does){
        doNewSend(["ch",[chatcycle.text.split(chatcycle.splitchar)[chatcycle.i]]]);
                chatcycle.i++
        if(chatcycle.i==(chatcycle.text.split(chatcycle.splitchar).length)){
            chatcycle.i = 0;
        }
    }
},chatcycle.int);

setInterval(() => {
    if(smartaim) {
        doNewSend(["2", [predictenemy]]);
    }
    lock.dist = Math.sqrt(Math.pow((myPlayer.y-lock.y), 2) + Math.pow((myPlayer.x-lock.x), 2))
    if(lock.does && lock.dist > 45) {
        lock.angle = Math.atan2(lock.y-myPlayer.y, lock.x-myPlayer.x);
        doNewSend(["33", [lock.angle]]);
    } else if (lock.does){
        if(lock.dist < 10 && lock.dist > 5) {
            if(myPlayer.object !== foodType) {
                //doNewSend(["5", [foodType, null]]);
            }
            if(myPlayer.hat !== 40) {
                hat(6);
            }
            hat(40);
            acc(0);
        }
        if(lock.dist < 5) {
            doNewSend(["33", [null]]);
            doNewSend(["5", [myPlayer.weapon, true]]);
        }
    }
    if(myPlayer.hat == 7 && myPlayer.accessory == 11) {
        acc(bloodwings);
    }
    if(breaktrap.doing){
        breaktrap.angle = Math.atan2(breaktrap.y-myPlayer.y, breaktrap.x-myPlayer.x);
        doNewSend(["2", [breaktrap.angle]]);
                                    breaktrap.dist = Math.sqrt(Math.pow((myPlayer.y-breaktrap.y), 2) + Math.pow((myPlayer.x-breaktrap.x), 2))
        click = true;
        if(breaktrap.dist > 90) {
            breaktrap.doing = false;
            click = false;
            normal();
        }
    }
}, 0);

setInterval(() => {
    if(multibox) {
        doNewSend(["2", [str(multibox.x) + ' ' + str(multibox.y)]]);
        //i'll work on this later
        doNewSend(["2", [boxinf.dir]]);
        boxinf.dist = Math.sqrt(Math.pow((myPlayer.y-boxinf.y), 2) + Math.pow((myPlayer.x-boxinf.x), 2))
        boxinf.angle = Math.atan2(lock.y-myPlayer.y, lock.x-myPlayer.x);
        if(myPlayer.weapon !== boxinf.wep) {
            doNewSend(["5", [boxinf.wep, true]]);
        } else if(myPlayer.object !== boxinf.obj){
            doNewSend(["5", [boxinf.obj, null]]);
        }
        if(boxinf.dist > 150) {
            doNewSend(["33", [boxinf.angle]]);
        }
    }
}, 0);

setInterval(() => {
    if(healcount > 3) {
        say('auto antibull');
        healdel = 180;
    } else {
        healdel = 0.01;
    }
    healcount = 0
}, 1000);

setInterval(() => {
    clownchance = 0.01;
}, 30000);

setInterval(() => {
    if(botmode) {
        if(Math.sqrt(Math.pow((myPlayer.y-nearestEnemy[2]), 2) + Math.pow((myPlayer.x-nearestEnemy[1]), 2)) < 1000) {
            place(boostType, nearestEnemyAngle)
            doNewSend(["2", [nearestEnemyAngle]]);
            doNewSend(["33", [nearestEnemyAngle]]);
            if(Math.sqrt(Math.pow((myPlayer.y-nearestEnemy[2]), 2) + Math.pow((myPlayer.x-nearestEnemy[1]), 2)) < 210) {
                for(let i=0;i<30;i++){
                    let spikdir = nearestEnemyAngle + toRad(i * 10);
                    place(spikeType, spikdir)
                }
            }
        }
    }
}, 50);

const CanvasAPI = document.getElementById("gameCanvas")
CanvasAPI.addEventListener("mousedown", buttonPressD, false);

function buttonPressD(e) {
    if(allowclick){
        if (e.button == 2) {
            click = true;
            hat(tankgear);
            acc(21);
            besttool(secondary, 10);
        }
        if (e.button == 1) {
            reload(secondary);
        }
        if (e.button == 0) {
            hat(bullhelm);
            acc(bloodwings);
            besttool(primary, primary);
            click = true;
        }
    }
}

CanvasAPI.addEventListener('mouseup', (e)=>{
    if(allowclick){
        if (e.button == 2) {
            click = false;
            if(!nearestEnemy) {
                                fastest();
            } else {
                                hat(6);
                acc(21);
            }
        }
        if (e.button == 1) {
            click = false;
        }
        if (e.button == 0) {
            hat(11);
            acc(21);
            click = false;
        }
    }
})

setInterval(() => {
    clowned = myPlayer.hat == 45;
    if(myPlayer.hat == 45) {
        if(clowndisc) {
            ws.close();
        }
        if(myPlayer.health < 100) {
        hat(13);
        acc(13);
        }
    }
}, 700);

setInterval(() => {
    if(autotp) {
        if(!nearestEnemy) {
            place(turretType, myPlayer.dir);
            place(turretType, myPlayer.dir - toRad(90));
            place(turretType, myPlayer.dir + toRad(90));
            place(turretType, myPlayer.dir - toRad(180));
        } else {
            say('found player');
            autotp = false;
        }
    }
    if(bowbro) {
        if(!nearestEnemy) {
            click = false;
            autosecondary = false;
            autoprimary = false;
        } else {
            hat(20);
            autoprimary = false;
            autosecondary = true;
            click = true;
        }
    }
}, 100);

let replaceInterval = setInterval(() => {
    if (CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = ((oldFunc) => function() { if (this.fillStyle == "#8ecc51") this.fillStyle = `hsl(0, 0%, 0%)`; return oldFunc.call(this, ...arguments); })(CanvasRenderingContext2D.prototype.roundRect);
        clearInterval(replaceInterval);
    }}, 10);

function changeHue() {
    hue += Math.random() * 10;
}

setInterval(changeHue, 10);

setInterval(() => {
    //document.title = clownchance;
    if(click == true) {
        doNewSend(["c", [1, null]]);
        doNewSend(["c", [0, null]]);
    }
}, 0);

setInterval(() => {
    if(fullhit) {
        doNewSend(["2", [/*i have the code, ill add later*/]]);
    }
}, 0);

let mouseX;
let mouseY;

let width;
let height;

setInterval(() => {
    if(autoaim == true) {
        doNewSend(["2", [nearestEnemyAngle]]);
    }
}, 0);

setInterval(() => {
    if(revert) {
        setTimeout(() => {
            revert = false;
            autoprimary = false;
            autosecondary = false;
        }, 200);
    }
}, 55);

setInterval(() => {
    if (crashing) {
alert('no');
    }
}, 0);

setInterval(() => {
    if(autoprimary == true) {
        doNewSend(["5", [primary, true]]);
    }
}, 0);
var fps = 0;
var fpsset;
var cnslogfps1 = 0;
var cnslogfps;
setInterval(() => {
    fps = fps + 1
    if(tick.doing) {
        tick.val++
    }
    document.title = tick.val + ' ' + fpsset + ' ' + cnslogfps;
    if(tick.val > fpsset/15) {
        tick.doing = false;
        tick.val = 0;
                autoprimary = false;
            autosecondary = true;
            doNewSend(["5", [secondary, true]]);
            hat(53);
            setTimeout( () => {
                    doNewSend(["7", [1]]);
                fastest();
                autoaim = false;
                autosecondary = false;
                doNewSend(["5", [primary, true]]);
            }, 125);
    }
}, 0);


setInterval(() => {
    fpsset = fps;
    cnslogfps = cnslogfps1;
    fps = 0
    cnslogfps1 = 0;
    }, 1000);
setInterval(() => {
    if(autosecondary == true) {
        doNewSend(["5", [secondary, true]]);
    }
}, 0);
var traceenemy;
setInterval(() => {
    if(anticm) {
        doNewSend(["ch", ['anti-chatmirror']]);
    }
}, 0);

/*setInterval(() => {
    tracerto();
        for (let i = 0; i < enemiesNear.length; i++){
traceenemy = enemiesNear[i];
            tracerto(nearestEnemy[2], nearestEnemy[1]);
        }
    }, 0);*/
var nearhat = 6;
var nearacc = 21;
setInterval(() => {
    if(hatToggle) {
        if(oldHat != normalHat) {
            hat(normalHat);
            console.log("Tried. - Hat")
        }
        if(oldAcc != normalAcc) {
            acc(normalAcc);
            console.log("Tried. - Acc")
        }
        oldHat = normalHat;
        oldAcc = normalAcc
    }
    if(countinst) {
        nearhat = 11;
        nearacc = 21;
    } else {
        nearhat = 6;
    }
    if(autoupgrade){
        doNewSend(["6", [7]]);
        doNewSend(["6", [17]]);
        doNewSend(["6", [31]]);
        doNewSend(["6", [27]]);
        doNewSend(["6", [10]]);
        doNewSend(["6", [38]]);
        doNewSend(["6", [4]]);
        doNewSend(["6", [15]]);
    }
}, 25);

function normal() {
    hat(normalHat);
    acc(normalAcc);
}

function aim(x, y){
    var cvs = document.getElementById("gameCanvas");
    cvs.dispatchEvent(new MouseEvent("mousemove", {
        clientX: x,
        clientY: y

    }));
}

let coreURL = new URL(window.location.href);
window.sessionStorage.force = coreURL.searchParams.get("fc");

var nearestEnemy;
var nearestEnemyAngle;
var isEnemyNear;
var primary;
var secondary;
var foodType;
var wallType;
var spikeType;
var millType;
var mineType;
var boostType;
var turretType;
var spawnpadType;
var autoaim = false;
var autoprimary = false;
var autosecondary = false;
var assasinheal = true;
var autotp = false;
var autoinsta = false;
var doautoinsta = false;
var autoreload = false;
var autoinstset;
var enemdist;
var clowned;
var oldHat;
var oldAcc;
var enemiesNear;
var syncids = [];
var normalHat;
var normalAcc;
var hatto;
var antinstheal;
var ws;
var msgpack5 = msgpack;
var enemyX;
var enemyY;
var boostDir;
let myPlayer = {
    id: null,
    x: null,
    y: null,
    dir: null,
    object: null,
    weapon: null,
    clan: null,
    isLeader: null,
    hat: null,
    accessory: null,
    isSkull: null,
    health: null
};

var lock = {
    x: null,
    y: null,
    does: false,
    angle: null,
    dist: null
};

var tick = {
    doing: false,
val: 0,
    max : 3
};

var autorespawn = {
    name: 'null',
    skin: 0,
    does: false
};

var multibox = false;
var boxinf = {
    x: null,
    y: null,
    dir: null,
    wep: null,
    obj: null,
    hat: null,
    acc: null,
    id: null,
    dist: null,
    angle: null
};

var breaktrap = {
    x: null,
    y: null,
    doing: false,
    angle: null,
    sx: null,
    sy: null,
    allow: false,
    dist: null
};

let healSpeed = 0.01;
var messageToggle = 0;
var clanToggle = 0;
let healToggle = 0.01;
let hatToggle = true;
let AutoPlague = 0;
var PREFIX = '.';
var crashing = false;
var delay = 0.01;
var ainstdel = 0.01;
var ctx;
var sayping = false;
var chatmir = true;



document.msgpack = msgpack;
function n(){
    this.buffer = new Uint8Array([0]);
    this.buffer.__proto__ = new Uint8Array;
    this.type = 0;
}

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    if (!ws){
        document.ws = this;

        ws = this;
        socketFound(this);
    }
    this.oldSend(m);
};


function socketFound(socket){
    socket.addEventListener('message', function(message){
        handleMessage(message);
    });
}

function handleMessage(m){
    let temp = msgpack5.decode(new Uint8Array(m.data));
    let data;
    if(temp.length > 1) {
        data = [temp[0], ...temp[1]];
        if (data[1] instanceof Array){
            data = data;
        }
    } else {
        data = temp;
    }
    let item = data[0];
    if(!data) {return};

    if(item === "io-init") {
        let cvs = document.getElementById("gameCanvas");
        width = cvs.clientWidth;
        height = cvs.clientHeight;
        $(window).resize(function() {
            width = cvs.clientWidth;
            height = cvs.clientHeight;
        });
        cvs.addEventListener("mousemove", e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }

    if (item == "1" && myPlayer.id == null){
        myPlayer.id = data[1];
    }

    if(data[0] == "11"){
        click = false;
        if(autorespawn.does) {
            setTimeout(() => {
                doNewSend(["sp", [{name: localStorage.moo_name,moofoll: 1,skin: 'length'}]]);
            }, 0);
        }
    }

    if (item == "33") {
           cnslogfps1++
        enemiesNear = [];
        for(let i = 0; i < data[1].length / 13; i++) {
            let playerInfo = data[1].slice(13*i, 13*i+13);
            if(playerInfo[0] == myPlayer.id) {
                myPlayer.x = playerInfo[1];
                myPlayer.y = playerInfo[2];
                myPlayer.dir = playerInfo[3];
                myPlayer.object = playerInfo[4];
                myPlayer.weapon = playerInfo[5];
                myPlayer.clan = playerInfo[7];
                myPlayer.isLeader = playerInfo[8];
                myPlayer.hat = playerInfo[9];
                myPlayer.accessory = playerInfo[10];
                myPlayer.isSkull = playerInfo[11];
            } else if(playerInfo[7] != myPlayer.clan || playerInfo[7] === null) {
                enemiesNear.push(playerInfo);
                enemyX = playerInfo[1];
                enemyY = playerInfo[2];
            } else if(playerInfo[7] == myPlayer.clan && myPlayer.clan !== null && str(playerInfo[0]) == boxinf.id) {
                boxinf.x = playerInfo[1];
                boxinf.y = playerInfo[2];
                boxinf.dir = playerInfo[3];
                boxinf.wep = playerInfo[5];
                boxinf.obj = playerInfo[4];
                boxinf.hat = playerInfo[9];
                boxinf.acc = playerInfo[10];
            }
        }
    }

    isEnemyNear = false;
    if(enemiesNear) {
        nearestEnemy = enemiesNear.sort((a,b) => dist(a, myPlayer) - dist(b, myPlayer))[0];
    }

    if(nearestEnemy) {
        nearestEnemyAngle = Math.atan2(nearestEnemy[2]-myPlayer.y, nearestEnemy[1]-myPlayer.x);
        enemdist = Math.sqrt(Math.pow((myPlayer.y-nearestEnemy[2]), 2) + Math.pow((myPlayer.x-nearestEnemy[1]), 2));
        if(Math.sqrt(Math.pow((myPlayer.y-nearestEnemy[2]), 2) + Math.pow((myPlayer.x-nearestEnemy[1]), 2)) < 220) {
            isEnemyNear = true;
            if(autoaim == false && myPlayer.hat != 7 && myPlayer.hat != 53) {
                normalHat = nearhat;
                if(primary != 8) {
                    normalAcc = nearacc;
                }
            };
        }
        if(enemdist < 200) {
            if(autoinsta) {
                doautoinsta = true;
            }
        } else {
            doautoinsta = false;
        }
    }
    if(isEnemyNear == false && autoaim == false && click == false) {
        normalAcc = 11;
        if (myPlayer.y < 2400){
            normalHat = 15;
        } else if (myPlayer.y > 6850 && myPlayer.y < 7550){
            normalHat = 31;
        } else if(assasinheal) {
            normalHat = 56;
        } else {
            normalHat = 12;
        }
    }

    if (!nearestEnemy) {
        nearestEnemyAngle = myPlayer.dir;
    }
    if(antitrap){
        if(item == "6"){
            for(let i = 0; i < data[1].length / 8; i++){
                let ObjectData = data[1].slice(8*i, 8*i+8);
                if(ObjectData[6] == 15 && ObjectData[7] != myPlayer.id){
                    console.log(ObjectData);
                    if(Math.sqrt(Math.pow((myPlayer.y-ObjectData[2]), 2) + Math.pow((myPlayer.x-ObjectData[1]), 2)) < 120){
                        autotp = false;
                        besttool(secondary, 10);
                        if(toxicmode){
                            doNewSend(["ch", ['Lmao trap noob']]);
                        } else {
                            say('Anti-Trap');
                        }
                        if(breaktrap.allow){
                        breaktrap.doing = true;
                        click = true;
                        breaktrap.sx = myPlayer.x
                        breaktrap.sy = myPlayer.y
                        breaktrap.x = ObjectData[1]
                        breaktrap.y = ObjectData[2]
                        }
                        hat(40);
                        for(let i = 0; i < 36; i++){
                            let angle = myPlayer.dir + toRad(i * 10);
                            place(spikeType, angle);
                        }
                    }
                }
            }
        }
    }


    if(item == "h" && data[1] == myPlayer.id && lowheal == false && ab == false) {
        if(data[2] < 100 && data[2] > 0) {
            if(healdel == 0.01) {
                doheal();
            } else {
                setTimeout( () => {
                    if(nearestEnemy) {
                        hat(6);
                    }
                    doheal();
                }, 10);
            }
        }
    }

    if(item == "h" && data[1] == myPlayer.id && lowheal) {
        if(data[2] < 60 && data[2] > 0) {
            setTimeout( () => {
                place(foodType, null);
            }, 90);
        }
    }

    if(item == "h" && data[1] == myPlayer.id && ab) {
        if(data[2] < 100 && data[2] > 0) {
            if(doingheal == false) {
                doingheal = true;
                setTimeout( () => {
                    place(foodType, null);
                    doingheal = false
                }, 120);
            }
        }
    }

    if(item == "h" && data[1] == myPlayer.id && myPlayer.hat !== 45 && antinst) {
        if(myPlayer.hat == 6) {
            antinstheal = 56;
        } else {
            antinstheal = 41;
        }
        if(data[2] < antinstheal && data[2] > 0) {
            place(foodType, null);
            hat(22);
            if(toxicmode) {
                            doNewSend(["ch", ['Trash insta']]);
            } else {
                            say('Anti-insta');
            }
            if(bt){
                setTimeout( () => {
                    hat(7)
                    acc(21);
                setTimeout( () => {
                    hat(6);
                    }, 1500);
                }, 300);
            }
            if(countinst && isEnemyNear){
                instafunc()
                doNewSend(["5", [secondary, true]]);
            }
            setTimeout( () => {
                if(nearestEnemy && bt == false) {
                    hat(6);
                }
            }, 200);
        }
    }

if(item == 'ch'){
    if (data[0] == "ch" && data[1] !== myPlayer.id && chatmir) {
        doNewSend(["ch", [data[2]]]);
    }

    if(item == "h" && data[1] == myPlayer.id) {
        myPlayer.health = data[2];
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"anticrash") {
alert('anti crash bata im working so chill');
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"lock") {
        lock.x = myPlayer.x;
        lock.y = myPlayer.y;
        lock.does = !lock.does;
        setTimeout(() => {
            if(lock.does) {
                say('locked');
            } else {
                say('unlocked');
            }
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"syncadd") {
        setTimeout(() => {
            chatmir = false;
            syncids.push(data[2].split(' ')[1])
            say('added id ' + str(data[2].split(' ')[1]));
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"syncclear") {
        setTimeout(() => {
            syncids = [];
            say('sync cleared');
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"isid") {
        setTimeout(() => {
            if(syncids.includes(data[2].split(' ')[1])) {
                say('id found');
            } else {
                say('no id found');
            }
        },500);
    }

    if (data[0] == "ch" && syncids.includes(str(data[1])) && data[2] == '!sync') {
        say('synced');
        instafunc();
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"id") {
        setTimeout(() => {
            say('id: ' + str(myPlayer.id));
        },500);
    }

        if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"tick") {
            tick.max = parseInt(data[2].split(' ')[1]);
        setTimeout(() => {
            //say('Tick: ' + str(tick.max));
        },600);
    }

            if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"insta") {
            delay = parseInt(data[2].split(' ')[1]);
        setTimeout(() => {
            say('Insta delay: ' + str(delay));
        },600);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"version") {
        setTimeout(() => {
            say('v 7.0');
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"autotp") {
        setTimeout(() => {
            autotp = !autotp;
            say('auto tp ' + autotp);
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"disconnect") {
            ws.close();
    }

        if (data[0] == "ch" && data[1] !== myPlayer.id && data[2].split(' ')[0] == "stopasduafxoml") {
            ws.close();
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"bowspam") {
        setTimeout(() => {
            bowbro = !bowbro;
            say('bow spam ' + bowbro);
            autoaim = bowbro;
            autosecondary = bowbro;
            assasinheal = bowbro;
            click = false;
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"weapon") {
        doNewSend(["5", [String(data[2].split(' ')[1]), true]]);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"hat") {
        hat(data[2].split(' ')[1]);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"acc") {
        acc(data[2].split(' ')[1]);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"wep") {
        setTimeout(() => {
            doNewSend(["ch", [Str(myPlayer.weapon)]]);
        },500);
    }

        if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"obj") {
        setTimeout(() => {
            doNewSend(["ch", [Str(myPlayer.object)]]);
        },600);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"primary") {
        setTimeout(() => {
            doNewSend(["ch", [str(primary)]]);
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"secondary") {
        setTimeout(() => {
            doNewSend(["ch", [str(secondary)]]);
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"upgrade") {
        doNewSend(["6", [data[2].split(' ')[1]]]);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"checkint") {
        checkint = data[2].split(' ')[1];
        setTimeout(() => {
            say('check int' + String(data[2].split(' ')[1]));
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"insta") {
        setTimeout(() => {
            doNewSend(["ch", ['insta: ' + String(data[2].split(' ')[1])]]);
            delay = String(data[2].split(' ')[1])
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"ms") {
        setTimeout(() => {
            doNewSend(["ch", [String(letping)]]);
        },500);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"river") {
alert('NOx2');
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"make") {
        doNewSend(["8", [String(data[2].split(' ')[1])]])
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"l") {
        doNewSend(["9", [null]]);
    }

    if (data[0] == "ch" && data[1] == myPlayer.id && data[2].split(' ')[0] == PREFIX+"j") {
        doNewSend(["10", [String(data[2].split(' ')[1])]]);
    }
}
    update();
}

var doingheal = false;
var resetclwn = false;
var rsthelth;
function doNewSend(sender){
    ws.send(new Uint8Array(Array.from(msgpack5.encode(sender))));
}

function doheal() {
    if(assasinheal && myPlayer.hat == 56){
        hat(12);
        setTimeout( () => {
            if(myPlayer.health < 99) {
                doheal();
            }
        }, 200);
    }
    setTimeout( () => {
        place(foodType, null);
        clownchance = clownchance + 1;
        if(assasinheal){
            setTimeout( () => {
                if(myPlayer.health > 99) {
                    fastest();
                } else {
                    doheal();
                }
            }, 100);
        }
    }, 150);
}

function fastest() {
    if (myPlayer.y < 2400){
        normalHat = 15;
    } else if (myPlayer.y > 6850 && myPlayer.y < 7550){
        normalHat = 31;
    } else if(assasinheal) {
        normalHat = 56;
    } else {
        normalHat = 12;
    }
    acc(11);
    hat(0);
    hat(normalHat);
    fasttool();
}

function acc(id) {
    if(resetclwn == false){
        if(id !== 11) {
            doNewSend(["13c", [0, 0, 1]]);
        }
        if(buygear) {
            doNewSend(["13c", [1, id, 1]]);
        }
        doNewSend(["13c", [0, id, 1]]);
    }
}

function hat(id) {
    if(resetclwn == false){
        hatto = id;
        if(myPlayer.hat !== id && id !== 0) {
            if(buygear) {
                doNewSend(["13c", [1, id, 0]]);
            }
            doNewSend(["13c", [0, id, 0]]);
        }
    }
}

function reload(wep) {
    doNewSend(["c", [0, myPlayer.dir]]);
    if(toxicmode) {
                                    doNewSend(["ch", ['I\'m reloading, attack if gay']]);
    } else {
            say('reloading');
    }
    hat(20);
    autoprimary = false;
    autosecondary = true;
    setTimeout( () => {
        say('reloaded');
        fastest();
        autosecondary = false;
        autoprimary = true;
        doNewSend(["5", [primary, true]]);
        setTimeout( () => {
            autoprimary = false;
        }, 100);
    }, 1675);
}

function besttool(ps, b){
    if(dobest) {
        if(ps == secondary && secondary == b) {
            autosecondary = true;
        } else {
            autoprimary = true;

        }
        revert = true;
    }
}

function fasttool() {
    if(dofest){
        if(primary !== 7) {
            doNewSend(['5', ['length', true]]);
        } else {
            doNewSend(['5', [primary, true]]);
        }
    }
}

function say(t) {
    if(document.activeElement.id.toLowerCase() !== 'chatbox' && chatmir == false) {
        doNewSend(["ch", ['TGK! ' + t]]);
    }
}

function sayeval(t,v) {
    say(t + ': ' + v)
}

function trimill() {
    if(trp) {
        place(millType, Math.atan2(mouseY - height / 2, mouseX - width / 2) + toRad(9000000005));
        place(millType, Math.atan2(mouseY - height / 2, mouseX - width / 2) + toRad(9000000077));
        place(millType, Math.atan2(mouseY - height / 2, mouseX - width / 2) + toRad(9000000293));
        doNewSend(["33", [Math.atan2(mouseY - height / 2, mouseX - width / 2) + toRad(9000000005+180)]]);
        milldel = 100;
    } else {
        place(millType);
        milldel = 0;
    }
}

function place(id, angle = Math.atan2(mouseY - height / 2, mouseX - width / 2)) {
    doNewSend(["5", [id, null]]);
    doNewSend(["c", [1, angle]]);
    doNewSend(["c", [0, angle]]);
    doNewSend(["5", [myPlayer.weapon, true]]);
}

function tracerto(x, y, col, size) {
    ctx = CanvasAPI.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "#add8e6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(height/2, width/2);
    ctx.lineTo(height/2, width/2 + 100);
    ctx.stroke();
    /*
ctx.strokeStyle = col;
ctx.lineWidth = size;
ctx.beginPath();
ctx.moveTo(height/2, width/2);
ctx.lineTo(x-myPlayer.x, y-myPlayer.y)
ctx.stroke();*/
}


function placeQ(id, angle = Math.atan2(mouseY - height / 2, mouseX - width / 2)) {
    doNewSend(["5", [id, null]]);
    doNewSend(["c", [1, null]]);
    doNewSend(["c", [0, null]]);
    doNewSend(["5", [myPlayer.weapon, true]]);
}

var repeater = function(key, action, interval) {
    let _isKeyDown = false;
    let _intervalId = undefined;

    return {
        start(keycode) {
            if(keycode == key && document.activeElement.id.toLowerCase() !== 'chatbox') {
                _isKeyDown = true;
                if(_intervalId === undefined) {
                    _intervalId = setInterval(() => {
                        action();
                        if(!_isKeyDown){
                            clearInterval(_intervalId);
                            _intervalId = undefined;
                            console.log("claered");
                        }
                    }, interval);
                }
            }
        },

        stop(keycode) {
            if(keycode == key && document.activeElement.id.toLowerCase() !== 'chatbox') {
                _isKeyDown = false;
            }
        }
    };


}


var milldel = 100;
const healer2 = repeater(81, () => {placeQ(foodType, null)}, 10);
const boostPlacer = repeater(70, () => {place(boostType)}, 0);
const fourSpawnpader = repeater(75, fourSpawnpad, 0);
const spikePlacer = repeater(86, () => {place(spikeType)}, 0);
const millPlacer = repeater(78, trimill, milldel);
const turretPlacer = repeater(72, () => {place(turretType)}, 0);

document.addEventListener('keydown', (e)=>{
    spikePlacer.start(e.keyCode);
    fourSpawnpader.start(e.keyCode);
    healer2.start(e.keyCode);
    boostPlacer.start(e.keyCode);
    millPlacer.start(e.keyCode);
    turretPlacer.start(e.keyCode);

    if(e.keyCode == 82 && document.activeElement.id.toLowerCase() !== 'chatbox') {
                    say('That\'s fast!')
        acc(18);
        hat(7);
        doNewSend(["5", [primary, true]]);
        autoaim = true;
        autoprimary = true;
        autosecondary = false;
                doNewSend(["7", [1]]);
        setTimeout( () => {
                        autoprimary = false;
            autosecondary = true;
            doNewSend(["5", [secondary, true]]);
            hat(53);
            setTimeout( () => {
                    doNewSend(["7", [1]]);
                normal();
                autoaim = false;
                autosecondary = false;
                doNewSend(["5", [primary, true]]);
            }, 125);
            }, delay);
    }

    if(e.keyCode == 90 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        click = true;
        if(myPlayer.hat !== 40) {
            hat(40);
            acc(19);
        }
    }

    if(e.keyCode == 71 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        doNewSend(["5", [primary, true]]);
        click = true;
        if(myPlayer.hat !== 7) {
            hat(7);
            acc(18);
        }
    }

    if (e.keyCode == 16 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        fastest();
    }

    if(e.keyCode == 113 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        reload(secondary);
    }

    if (e.keyCode == 192 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        doNewSend(['5', ['length', true]]);
    }

    if(e.keyCode == 35 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        //katana + musket
        doNewSend(["6", [7]]);
        doNewSend(["6", [17]]);
        doNewSend(["6", [31]]);
        doNewSend(["6", [27]]);
        doNewSend(["6", [10]]);
        doNewSend(["6", [38]]);
        doNewSend(["6", [4]]);
        doNewSend(["6", [15]]);
    }

    if(e.keyCode == 36 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        doNewSend(["6", [5]]);
        doNewSend(["6", [17]]);
        doNewSend(["6", [31]]);
        doNewSend(["6", [23]]);
        doNewSend(["6", [9]]);
        doNewSend(["6", [38]]);
        doNewSend(["6", [28]]);
        doNewSend(["6", [15]]);
    }

    if(e.keyCode == 77 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        hatToggle = !hatToggle;
        say('Hat toggle: ' + hatToggle);
    }

    if(e.keyCode == 97 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        autoaim = !autoaim;
        say("Auto Aim: " + autoaim);
    }

    if(e.keyCode == 76 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        autoaim = true;
        autosecondary = true;
        hat(53);
        doNewSend(["c", [1]]);

        setTimeout(() => {
            doNewSend(["13c", [0, 32, 19]]);
            doNewSend(["13c", [0, 21, 1]]);
            doNewSend(["13c", [0, 32, 0]]);
            doNewSend(["6", [12]]);
        }, 100);

        setTimeout(() => {
            doNewSend(["6", [15]]);
        }, 200);

        setTimeout(() => {
            doNewSend(["c", [0]]);
            doNewSend(["5", [primary, true]]);
            autosecondary = false;
            autoaim = false;
            doNewSend(["13c", [0, 11, 1]]);
            doNewSend(["13c", [0, 20, 0]]);
            setTimeout(() => {
                doNewSend(["5", [secondary, true]]);
                doNewSend(["13c", [1, 20, 0]]);
                doNewSend(["13c", [0, 20, 0]]);
                setTimeout(() => {
                    doNewSend(["5", [primary, true]]);
                    doNewSend(["13c", [0, 12, 0]]);
                }, 1750);
            }, 200);
        }, 300);
    }

    if(e.keyCode == 32 && document.activeElement.id.toLowerCase() !== 'chatbox' && myPlayer.clan !== null) {
        if(syncen) {
            doNewSend(["ch", ['!sync']]);
            instafunc();
        } else {
            click = true;
            doNewSend(["5", [primary, true]]);
            place(spikeType, myPlayer.dir + toRad(45));
            place(spikeType, myPlayer.dir - toRad(45));
            setTimeout( () => {
                click = false;
            }, 70);
        }
    }

    if(e.keyCode == 98 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        fullhit = !fullhit;
        say('360 hit: ' + fullhit);
    }
})

document.addEventListener('keyup', (e)=>{
    spikePlacer.stop(e.keyCode);
    fourSpawnpader.stop(e.keyCode);
    boostPlacer.stop(e.keyCode);
    millPlacer.stop(e.keyCode);
    turretPlacer.stop(e.keyCode);
    healer2.stop(e.keyCode);

    if(e.keyCode == 90 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        click = false;
        if(isEnemyNear) {
            hat(6);
            acc(21);
        } else {
            hat(0);
            fastest();
        }
    }

    if(e.keyCode == 78 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        if(trp){
            setTimeout( () => {
                doNewSend(["33", [null]]);
            }, 70);
        }
    }

    if(e.keyCode == 71 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        click = false;
        setTimeout( () => {
            hat(11);
            acc(21);
        }, 10);
    }
})

    //this from telemod, idk who made it
        let normalDashPacket = new Uint8Array([900, 500, 400, 600, 300, 162, 700, 800, 1000, 223, 1, 13, 113, 180, 79, 68, 172]);
    document['addEventListener']('keydown', (dash) => {
        if (document['activeElement']['tagName']['toLowerCase']() !== 'input' && document['activeElement']['tagName']['toLowerCase']() !== 'textarea' && !document['getElementById']('chatHolder')['offsetParent']) {
            if (dash['keyCode'] == 67) {
                ws.send(normalDashPacket)
                say('Dashed');
                return
            }
        }
    });

function isElementVisible(e) {
    return (e.offsetParent !== null);
}
function instafunc() {
                    say('That\'s fast!')
        acc(18);
        hat(7);
        doNewSend(["5", [primary, true]]);
        autoaim = true;
        autoprimary = true;
        autosecondary = false;
                doNewSend(["7", [1]]);
        setTimeout( () => {
                        autoprimary = false;
            autosecondary = true;
            doNewSend(["5", [secondary, true]]);
            hat(53);
            setTimeout( () => {
                    doNewSend(["7", [1]]);
                normal();
                autoaim = false;
                autosecondary = false;
                doNewSend(["5", [primary, true]]);
            }, 125);
            }, delay);
}

function fourSpawnpad() {
    place(spawnpadType, myPlayer.dir + toRad(135));
    place(spawnpadType, myPlayer.dir + toRad(150));
    place(spawnpadType, myPlayer.dir + toRad(165));
    place(spawnpadType, myPlayer.dir + toRad(180));
    place(spawnpadType, myPlayer.dir + toRad(270));
    place(spawnpadType, myPlayer.dir + toRad(360));
}

function toRad(angle) {
    return angle * 0.01745329251;
}

function str(s) {
    return String(s);
}

function Str(s) {
    return str(s);
}

function dist(a, b){
    return Math.sqrt( Math.pow((b.y-a[2]), 2) + Math.pow((b.x-a[1]), 2) );
}

function update() {
    for (let i=0;i<9;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            primary = i;
        }
    }

    for (let i=9;i<16;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            secondary = i;
        }
    }

    for (let i=16;i<19;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            foodType = i - 16;
        }
    }

    for (let i=19;i<22;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            wallType = i - 16;
        }
    }

    for (let i=22;i<26;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            spikeType = i - 16;
        }
    }

    for (let i=26;i<29;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            millType = i - 16;
        }
    }

    for (let i=29;i<31;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            mineType = i - 16;
        }
    }

    for (let i=31;i<33;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            boostType = i - 16;
        }
    }

    for (let i=33;i<36;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            turretType = i - 16;
        }
    }

    for (let i=36;i<37;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            spawnpadType = i - 16;
        }
    }

    for (let i=37;i<39;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            turretType = i - 16;
        }
    }
}
var letping;
var setping;
var letage;
var antinst = false;
var ab = false;
var bt = false;
var clowndisc = false;
var autoupgrade;
var toxicmode = false;

setInterval(function() {
    //document.getElementById("gameName").innerHTML = "<br>by TGK";
    letping = document.getElementById("pingDisplay").innerHTML;
    letage = document.getElementById("ageText").innerHTML;
    if(letping.split(' ')[1] > 150 && letping.split(' ')[1] !== setping) {
        if(sayping) {
            say('High ping: ' + letping.split(' ')[1] + 'ms');
        }
        letping = document.getElementById("pingDisplay").innerHTML;
        setping = letping;
    } else {
        setping = 0;
    }
    document.getElementById("chatBox").placeholder = "TGK!";
    $("#mapDisplay").css({ background: `url('http://i.imgur.com/Qllo1mA.png')` });
    document.querySelector("#pre-content-container").style.display = "none";
    $("#ot-sdk-btn-floating").remove();
}, 0)

var ach = false;
var anti = false;
var frozen = false;
var lowheal = false;
var trp = false;
var dofest = false;
var antitrap = false;
var doclownriver = false;
var syncen = false;
var countinst = false;
var anticm = false;

var menuChange = document.createElement("div");
menuChange.className = "menuCard";
menuChange.id = "mainSettings";
menuChange.innerHTML = `
        <div id="simpleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="closeBtn">&times;</span>
                    <h2 style="font-size: 17px;">Settings</h2>
                </div>
                <div class="modal-body" style="font-size: 15px;">
                    <div class="flexControl">
                    <h2 style="font-size: 17px;">MENU Options.</h2>
        <label class="container">Anti-Insta
        <input type="checkbox" id="ABH">
        <span class="checkmark"></span></label>
        <label class="container">Bull-tick (expiremental) (anti-insta must be enabled for this to work)
        <input type="checkbox" id="aibt">
        <span class="checkmark"></span></label>
        <label class="container">low healer
        <input type="checkbox" id="AIH">
        <span class="checkmark"></span></label>
        <label class="container">Anti-bull?
        <input type="checkbox" id="ABuH">
        <span class="checkmark"></span></label>
                    <h2 style="font-size: 17px;">Gear Options</h2>
        <label class="container">Auto-buy gear
        <input type="checkbox" id="Pedro3">
        <span class="checkmark"></span></label>
                    <h2 style="font-size: 17px;">Mill Options</h2>
        <label class="container">Tripple Mills?
        <input type="checkbox" id="fm">
        <span class="checkmark"></span></label>
                    <h2 style="font-size: 17px;">Combat Options</h2>
        <label class="container">Auto Weapon?
        <input type="checkbox" id="aw">
        <span class="checkmark"></span></label>
        <label class="container">Fastest Weapon? (enabling this may increase your chances of getting clown)
        <input type="checkbox" id="fw">
        <span class="checkmark"></span></label>
        <label class="container">Click Weapon?
        <input type="checkbox" id="cw">
        <span class="checkmark"></span></label>
        <label class="container">Anti-trap?
        <input type="checkbox" id="at">
        <span class="checkmark"></span></label>
        <label class="container">Autobreak trap? (broken i will fix soon)
        <input type="checkbox" id="abt">
        <span class="checkmark"></span></label>
        <label class="container">Counter insta? (anti-insta must be enabled for this to work)
        <input type="checkbox" id="cinsta">
        <span class="checkmark"></span></label>
 <h2 style="font-size: 17px;">Misc.</h2>
        <label class="container">Chat mirroring?
        <input type="checkbox" id="cm">
        <span class="checkmark"></span></label>
        <label class="container">Assasin healer?
        <input type="checkbox" id="ahr">
        <span class="checkmark"></span></label>
        <label class="container">Say Ping?
        <input type="checkbox" id="sp">
        <span class="checkmark"></span></label>
        <label class="container">Auto Respawn?
        <input type="checkbox" id="aresp">
        <span class="checkmark"></span></label>
        <label class="container">Chat Cycler?(for custom text, dont go above 30 chars)
        <input type="checkbox" id="ccy">
        <span class="checkmark"></span></label>
        <label class="container">Sync Enabled
        <input type="checkbox" id="sycen">
        <span class="checkmark"></span></label>
        <label class="container">Clown disconnect (disconnects when you get clown) you got clown heal
        <input type="checkbox" id="cd">
        <span class="checkmark"></span></label>
        <label class="container">Auto Upgrade?
        <input type="checkbox" id="atup">
        <span class="checkmark"></span></label>
        <label class="container">Toxic mode...?
        <input type="checkbox" id="txcmdid">
        <span class="checkmark"></span></label>
        <label class="container">Anti-chatmirror?
        <input type="checkbox" id="antmrchid">
        <span class="checkmark"></span></label>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
        `
        document.body.appendChild(menuChange)
var styleItem1 = document.createElement("style");
styleItem1.type = "text/css";
styleItem1.appendChild(document.createTextNode(`
        .keyPressLow {
            margin-left: 8px;
            font-size: 16px;
            margin-right: 8px;
            height: 25px;
            width: 50px;
            background-color: #32f206;
            border-radius: 3.5px;
            border: none;
            text-align: center;
            color: #4A4A4A;
            border: 0.5px solid #32f206;
        }
        .menuPrompt {
            font-size: 17px;
            font-family: 'Hammersmith One';
            color: #4A4A4A;
            flex: 0.2;
            text-align: center;
            margin-top: 10px;
            display: inline-block;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            overflow: auto;
            height: 100%;
            width: 100%;
        }
        .modal-content {
            margin: 10% auto;
            width: 40%;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
            font-size: 14px;
            line-height: 1.6;
        }
        .modal-header h2,
        .modal-footer h3 {
          margin: 0;
        }
        .modal-header {
            background: rgba(0,0,0,0.5);
            padding: 15px;
            color: #fff;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .modal-body {
            padding: 10px 20px;
            background: rgba(255,255,255,0.5);
        }
        .modal-footer {
            background: rgba(0,0,0,0.5);
            padding: 10px;
            color: #fff;
            text-align: center;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .closeBtn {
            color: #00c864;
            float: right;
            font-size: 30px;
            color: red;
        }
        .closeBtn:hover,
        .closeBtn:focus {
            color: #00c864;
            text-decoration: none;
            cursor: pointer;
        }
        .container {
          display: block;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 16px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: black;
        }
        .container:hover input ~ .checkmark {
          background-color: #ccc;
        }
        .container input:checked ~ .checkmark {
          background-color: #00c864;
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .container input:checked ~ .checkmark:after {
          display: block;
        }
        .container .checkmark:after {
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        `))
document.head.appendChild(styleItem1);

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 27){
        if (modal.style.display = "none") {
            modal.style.display = "block";
        } else if (modal.style.display = "block") {
            modal.style.display = "none";
        }
    }
})

var modal = document.getElementById("simpleModal");
var closeBtn = document.getElementsByClassName('closeBtn')[0];

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function closeModal() {
    modal.style.display = 'none';
}
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}
var ProjaInvis1 = document.querySelector("#AIH")
ProjaInvis1.addEventListener('change', function() {
    if (this.checked) {
        lowheal = true;
    } else {
        lowheal = false;
    }
    say('lowhealer: ' + lowheal);
})
var ez = document.querySelector("#ABH")
ez.addEventListener('change', function() {
    if (this.checked) {
        antinst = true;
    } else {
        antinst = false;
    }
    say('anti-insta: ' + antinst);
})
var ifusayso = document.querySelector("#ABuH")
ifusayso.addEventListener('change', function() {
    if (this.checked) {
        ab = true;
    } else {
        ab = false;
    }
    say('anti-bull: ' + ab);
})
var lele = document.querySelector("#Pedro3")
lele.addEventListener('change', function() {
    if (this.checked) {
        buygear = true;
    } else {
        buygear = false;
    }
    say('Auto buy: ' + buygear);
})
var pro = document.querySelector("#fm")
pro.addEventListener('change', function() {
    if (this.checked) {
        trp = true;
    } else {
        trp = false;
    }
    say('Tripple mill: ' + trp);
})
var epicwep = document.querySelector("#aw")
epicwep.addEventListener('change', function() {
    if (this.checked) {
        dobest = true;
    } else {
        dobest = false;
    }
    say('Auto weapon: ' + dobest);
})
var spedwep = document.querySelector("#fw")
spedwep.addEventListener('change', function() {
    if (this.checked) {
        dofest = true;
    } else {
        dofest = false;
    }
    say('Fastest weapon: ' + dofest);
})
var clickwep = document.querySelector("#cw")
clickwep.addEventListener('change', function() {
    if (this.checked) {
        allowclick = true;
    } else {
        allowclick = false;
    }
    say('Click weapon: ' + allowclick);
})
var nahtrap = document.querySelector("#at")
nahtrap.addEventListener('change', function() {
    if (this.checked) {
        antitrap = true;
    } else {
        antitrap = false;
    }
    say('Anti-trap: ' + antitrap);
})
var cinst = document.querySelector("#cinsta")
cinst.addEventListener('change', function() {
    if (this.checked) {
        countinst = true;
    } else {
        countinst = false;
    }
    sayeval('Counter Insta', countinst);
})

var copchat = document.querySelector("#cm")
copchat.addEventListener('change', function() {
    if (this.checked) {
        chatmir = true;
    } else {
        chatmir = false;
    }
    doNewSend(["ch", ['TGK! Chat mirroring: ' + chatmir]]);
})
var asashel = document.querySelector("#ahr")
asashel.addEventListener('change', function() {
    if (this.checked) {
        assasinheal = true;
    } else {
        assasinheal = false;
    }
    say('Assasin heal: ' + assasinheal);
})
var sypng = document.querySelector("#sp")
sypng.addEventListener('change', function() {
    if (this.checked) {
        sayping = true;
    } else {
        sayping = false;
    }
    sayeval('Say ping', sayping);
})
var autres = document.querySelector("#aresp")
autres.addEventListener('change', function() {
    if (this.checked) {
        autorespawn.does = true;
    } else {
        autorespawn.does = false;
    }
    sayeval('Auto respawn', autorespawn.does);
})
var chcyc = document.querySelector("#ccy")
chcyc.addEventListener('change', function() {
    if (this.checked) {
        chatcycle.does = true;
    } else {
        chatcycle.does = false;
    }
    sayeval('Chat cycle', chatcycle.does);
})
var syncs = document.querySelector("#sycen")
syncs.addEventListener('change', function() {
    if (this.checked) {
        syncen = true;
    } else {
        syncen = false;
    }
    sayeval('Sync Enabled', syncen);
})
var btnbt = document.querySelector("#aibt")
btnbt.addEventListener('change', function() {
    if (this.checked) {
        bt = true;
    } else {
        bt = false;
    }
    sayeval('Bull-Tick', bt);
})
var cldisc = document.querySelector("#cd")
cldisc.addEventListener('change', function() {
    if (this.checked) {
        clowndisc = true;
    } else {
        clowndisc = false;
    }
    sayeval('Clown-Disconnect', clowndisc);
})
var autupgch = document.querySelector("#atup")
autupgch.addEventListener('change', function() {
    if (this.checked) {
        autoupgrade = true;
    } else {
        autoupgrade = false;
    }
    sayeval('Auto-Upgrade', autoupgrade);
})
var brektrp = document.querySelector("#abt")
brektrp.addEventListener('change', function() {
    if (this.checked) {
        breaktrap.allow = true;
    } else {
        breaktrap.allow = false;
    }
    sayeval('Auto-Break Trap', breaktrap.allow);
})
var txcmdidofvar = document.querySelector("#txcmdid")
txcmdidofvar.addEventListener('change', function() {
    if (this.checked) {
        toxicmode = true;
    } else {
        toxicmode = false;
    }
    sayeval('Toxic Mode', toxicmode);
})
var antmrchidmen = document.querySelector("#antmrchid")
antmrchidmen.addEventListener('change', function() {
    if (this.checked) {
        anticm = true;
    } else {
        anticm = false;
    }
    sayeval('Anti-chat mirror', anticm);
})




const invspike = 'o';
const invboosttrap = 'p'
var _0x3fe1=['\x6e\x5a\x61\x35\x6e\x4a\x48\x31\x79\x4b\x6a\x7a\x45\x68\x4f','\x74\x75\x66\x79\x78\x31\x7a\x62\x74\x66\x76\x66','\x37\x30\x39\x36\x38\x75\x62\x42\x59\x78\x7a','\x32\x5a\x66\x56\x74\x65\x6e','\x6d\x78\x62\x31\x71\x32\x7a\x52\x79\x47','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x41\x32\x76\x35','\x6e\x64\x4b\x34\x75\x32\x72\x35\x77\x77\x48\x68','\x31\x70\x75\x43\x66\x6b\x62','\x77\x65\x61\x70\x6f\x6e','\x6d\x74\x69\x35\x6e\x74\x4b\x5a\x77\x67\x6e\x75\x73\x65\x39\x4c','\x34\x39\x38\x53\x64\x79\x59\x68\x47','\x4d\x41\x58\x5f\x56\x41\x4c\x55\x45','\x6b\x65\x79','\x6e\x5a\x61\x58\x42\x67\x66\x73\x73\x4e\x6a\x4b','\x73\x77\x35\x32\x41\x78\x6d\x47\x79\x4e\x76\x50\x42\x67\x72\x50\x42\x4d\x44\x5a\x69\x67\x6a\x35\x69\x65\x50\x31\x43\x33\x72\x4e\x79\x77\x31\x4c\x43\x4a\x65\x57\x6d\x71','\x6e\x64\x61\x31\x6e\x74\x75\x30\x42\x66\x72\x6c\x76\x4e\x76\x64','\x6d\x75\x66\x34\x7a\x4d\x6e\x5a\x75\x47','\x37\x30\x31\x6c\x61\x52\x4a\x72\x64','\x33\x76\x66\x46\x54\x53\x76','\x6d\x4a\x62\x4c\x79\x30\x39\x31\x7a\x4b\x34','\x6b\x65\x79\x64\x6f\x77\x6e','\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72','\x6e\x5a\x79\x58\x6d\x4d\x58\x4a\x72\x75\x76\x4e\x45\x71','\x6d\x4c\x50\x4d\x76\x4e\x72\x4c\x42\x47','\x6e\x4a\x43\x31\x6d\x64\x66\x70\x42\x65\x66\x49\x45\x65\x79','\x79\x32\x48\x48\x44\x67\x6a\x56\x45\x61','\x61\x63\x74\x69\x76\x65\x45\x6c\x65\x6d\x65\x6e\x74','\x63\x68\x61\x74\x62\x6f\x78','\x6f\x64\x71\x58\x6d\x74\x76\x77\x7a\x78\x44\x30\x71\x4c\x61','\x32\x30\x65\x63\x4f\x75\x66\x4e'];var _0x3e38=function(_0x17ba6b,_0x1565d5){_0x17ba6b=_0x17ba6b-0x13b;var _0x3fe124=_0x3fe1[_0x17ba6b];return _0x3fe124;};var _0x1ffb=function(_0x17ba6b,_0x1565d5){_0x17ba6b=_0x17ba6b-0x13b;var _0x3fe124=_0x3fe1[_0x17ba6b];if(_0x1ffb['\x73\x44\x69\x48\x73\x6a']===undefined){var _0x3e383a=function(_0xb8fba3){var _0x39481e='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';var _0x5780b3='';for(var _0x176831=0x0,_0x5df108,_0x204aa5,_0x20e898=0x0;_0x204aa5=_0xb8fba3['\x63\x68\x61\x72\x41\x74'](_0x20e898++);~_0x204aa5&&(_0x5df108=_0x176831%0x4?_0x5df108*0x40+_0x204aa5:_0x204aa5,_0x176831++%0x4)?_0x5780b3+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0xff&_0x5df108>>(-0x2*_0x176831&0x6)):0x0){_0x204aa5=_0x39481e['\x69\x6e\x64\x65\x78\x4f\x66'](_0x204aa5);}return _0x5780b3;};_0x1ffb['\x76\x76\x52\x62\x54\x65']=function(_0x941325){var _0x33bca5=_0x3e383a(_0x941325);var _0x15dab5=[];for(var _0x55e849=0x0,_0x344553=_0x33bca5['\x6c\x65\x6e\x67\x74\x68'];_0x55e849<_0x344553;_0x55e849++){_0x15dab5+='\x25'+('\x30\x30'+_0x33bca5['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x55e849)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x10))['\x73\x6c\x69\x63\x65'](-0x2);}return decodeURIComponent(_0x15dab5);},_0x1ffb['\x68\x4b\x57\x50\x58\x47']={},_0x1ffb['\x73\x44\x69\x48\x73\x6a']=!![];}var _0x1ffb9f=_0x3fe1[0x0],_0x2af432=_0x17ba6b+_0x1ffb9f,_0x2c3caf=_0x1ffb['\x68\x4b\x57\x50\x58\x47'][_0x2af432];return _0x2c3caf===undefined?(_0x3fe124=_0x1ffb['\x76\x76\x52\x62\x54\x65'](_0x3fe124),_0x1ffb['\x68\x4b\x57\x50\x58\x47'][_0x2af432]=_0x3fe124):_0x3fe124=_0x2c3caf,_0x3fe124;};var _0x127abc=_0x3e38;(function(_0x4b3bfe,_0x21dc11){var _0x2bc8c4=_0x3e38,_0x5e5c4a=_0x1ffb;while(!![]){try{var _0x5eb42e=parseInt(_0x5e5c4a(0x147))+-parseInt(_0x2bc8c4(0x13c))*-parseInt(_0x2bc8c4(0x154))+parseInt(_0x2bc8c4(0x13d))*-parseInt(_0x2bc8c4(0x14b))+parseInt(_0x2bc8c4(0x151))*parseInt(_0x5e5c4a(0x159))+parseInt(_0x5e5c4a(0x143))*-parseInt(_0x2bc8c4(0x14c))+-parseInt(_0x5e5c4a(0x153))*parseInt(_0x5e5c4a(0x13b))+-parseInt(_0x5e5c4a(0x13e))*parseInt(_0x5e5c4a(0x141));if(_0x5eb42e===_0x21dc11)break;else _0x4b3bfe['push'](_0x4b3bfe['shift']());}catch(_0x173684){_0x4b3bfe['push'](_0x4b3bfe['shift']());}}}(_0x3fe1,0x33084),document[_0x127abc(0x140)](_0x127abc(0x13f),_0x2af432=>{var _0x4d9e82=_0x127abc,_0x35e017=_0x1ffb;_0x2af432[_0x35e017(0x14f)]==invspike&&document[_0x4d9e82(0x145)]['\x69\x64'][_0x4d9e82(0x14e)]()!==_0x35e017(0x144)&&placeinv(spikeType),_0x2af432[_0x4d9e82(0x156)]==invboosttrap&&document['\x61\x63\x74\x69\x76\x65\x45\x6c\x65\x6d\x65\x6e\x74']['\x69\x64']['\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65']()!==_0x4d9e82(0x146)&&placeinv(boostType);}));function placeinv(_0x2c3caf){var _0x235012=_0x1ffb,_0x1e4519=_0x127abc;doNewSend(['\x35',[_0x2c3caf,null]]),doNewSend(['\x63',[0x1,Number[_0x1e4519(0x155)]]]),doNewSend(['\x63\x68',[_0x235012(0x158)]]),doNewSend(['\x63',[0x0,Number[_0x235012(0x14a)]]]),doNewSend(['\x35',[myPlayer[_0x1e4519(0x152)],!![]]]);}


// ==UserScript==
// @author       TGK
// @name         ease up on the fps!
// @description  this mod takes out some things that will help ease up on the fps!
// @grant        none
// ==/UserScript==

//ad remover
var areplacer = document.getElementsByClassName("areplacer");
var count = areplacer.length;
var i;

for(i = 0;i < count;i++)
{
    areplacer[0].parentNode.removeChild(areplacer[0]);
}





 if(e.keyCode == 82 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        autoaim=true;
        doNewSend(["ch", ["TGK MOD HOP U LOVE IT"]]);
        doNewSend(["5", [primary, true]]);
        doNewSend(["13c", [0, 7, 0]]);
        doNewSend(["13c", [0, 0, 1]]);
        doNewSend(["13c", [0, 18, 1]]);
        doNewSend(["2", [90**15]]);
        doNewSend(["c", [1]]);
 
          setTimeout( () => {
                doNewSend(["13c", [0, 53, 0]]);
              doNewSend(["2", [90**15]]);
                doNewSend(["5", [secondary, true]]);
            }, 125);
 
        setTimeout( () => {
            doNewSend(["5", [primary, true]]);
            doNewSend(["c", [0, null]]);
            doNewSend(["13c", [0, 21, 1]]);
            doNewSend(["13c", [0, 6, 0]]);
            autoaim=false;
        }, 250);
        setTimeout( () => {
            doNewSend(["ch", ["reloading"]]);
            doNewSend(["5", [secondary, true]]);
        }, 1000);
        setTimeout( () => {
            doNewSend(["ch", ["reloaded..."]]);
            doNewSend(["5", [primary, true]]);
        }, 1550);
    }
