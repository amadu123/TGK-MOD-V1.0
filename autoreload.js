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
