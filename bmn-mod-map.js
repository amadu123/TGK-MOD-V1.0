
var ID_WinterCap = 15;
var ID_FlipperHat = 31;
var ID_MarksmanCap = 1;
var ID_BushGear = 10;
var ID_SoldierHelmet = 6;
var ID_AntiVenomGear = 23;
var ID_MusketeerHat = 32;
var ID_MedicGear = 13;
var ID_BullHelmet = 7;
var ID_EmpHelmet = 22;
var ID_BoosterHat = 12;
var ID_BarbarianArmor = 26;
var ID_BullMask = 46;
var ID_WindmillHat = 14;
var ID_SpikeGear = 11;
var ID_BushidoArmor = 16;
var ID_SamuraiArmor = 20;
var ID_ScavengerGear = 27;
var ID_TankGear = 40;
var ID_TurretGear = 53;

// Keys
var TankGearKey = 90;
var BullHelmetKey = 74;
var SoldierHelmetKey = 71;
var TurretKey = 72;
var BoosterHatKey = 66;
var uneqiup = 16;
var SpikeGearKey = 89;
var EmpKey = 84;
var SamuKey = 80;
var SpikeKey = 86

try {
    document.getElementById("moomooio_728x90_home").style.display = "none";
    $("moomooio728x90_home").parent().css({display: "none"});
} catch (e) {
    console.log("There was an error removing the ads.");
}


var menuChange = document.createElement("div");
menuChange.className = "menuCard";
menuChange.id = "mainSettings";
menuChange.innerHTML = `
<div id="simpleModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn">&times;</span>
            <h2 style="font-size: 17px;">Hat Macro Settings</h2>
        </div>
        <div class="modal-body" style="font-size: 17px;">
            <div class="flexControl">
                <h3 style="color: #2196F3; font-size: 17px;">To unquip a hat press: LEFT SHIFT</h3>
                <h3 class="menuPrompt">Tank Gear: </h3> <input value="${String.fromCharCode(TankGearKey)}" id="tankGear" class="keyPressLow" onkeyup="this.value = this.value.toUpperCase();" maxlength="1" type="text"/>
                <h3 class="menuPrompt">Bull Helmet: </h3> <input value="${String.fromCharCode(BullHelmetKey)}" id="bullHelm" class="keyPressLow" onkeyup="this.value = this.value.toUpperCase();" maxlength="1" type="text"/>
                <h3 class="menuPrompt">Soldier Helmet: </h3> <input value="${String.fromCharCode(SoldierHelmetKey)}" id="soldier" class="keyPressLow"onkeyup="this.value = this.value.toUpperCase();"  maxlength="1" type="text"/>
                <h3 class="menuPrompt">Turret Gear: </h3> <input value="${String.fromCharCode(TurretKey)}" id="turret" class="keyPressLow" maxlength="1" onkeyup="this.value = this.value.toUpperCase();" type="text"/>
                <h3 class="menuPrompt">Booster Hat: </h3> <input value="${String.fromCharCode(BoosterHatKey)}" id="booster" class="keyPressLow" maxlength="1" onkeyup="this.value = this.value.toUpperCase();" type="text"/>
                <h3 class="menuPrompt">Spike Gear: </h3> <input value="${String.fromCharCode(SpikeGearKey)}" id="spikeg" class="keyPressLow" maxlength="1" onkeyup="this.value = this.value.toUpperCase();" type="text"/>
                <h3 class="menuPrompt">Emp Helmet: </h3> <input value="${String.fromCharCode(EmpKey)}" id="emp" class="keyPressLow" onkeyup="this.value = this.value.toUpperCase();" maxlength="1" type="text"/>
                <h3 class="menuPrompt">Samurai Armor: </h3> <input value="${String.fromCharCode(SamuKey)}" id="samu" class="keyPressLow" onkeyup="this.value = this.value.toUpperCase();" maxlength="1" type="text"/>

                <hr>
                <h3 style="font-size: 17px;"> Map Settings </h3>

                <label class="container">Show biomes on the map ?
                    <input type="checkbox" id="myCheck">
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
        <div class="modal-footer">
            <h3 style="font-size: 17px;">Edit and live save your changes !</h3>
            <p>The Hack is made by TGK</p>
        </div>
    </div>
</div>
`
document.body.appendChild(menuChange)


$("#tankGear").on("input", () => {
    var cval = $("#tankGear").val();
    if (cval){
        TankGearKey = cval.toUpperCase();
        TankGearKey = TankGearKey.charCodeAt(0);
        console.log(TankGearKey);
    }
});

$("#bullHelm").on("input", () => {
    var cval = $("#bullHelm").val();
    if (cval){
        BullHelmetKey = cval.toUpperCase();
        BullHelmetKey = BullHelmetKey.charCodeAt(0);
        console.log(BullHelmetKey);
    }
});

$("#soldier").on("input", () => {
    var cval = $("#soldier").val();
    if (cval){
        SoldierHelmetKey = cval.toUpperCase();
        SoldierHelmetKey = SoldierHelmetKey.charCodeAt(0);
        console.log(SoldierHelmetKey);
    }
});

$("#turret").on("input", () => {
    var cval = $("#turret").val();
    if (cval){
        TurretKey = cval.toUpperCase();
        TurretKey = TurretKey.charCodeAt(0);
        console.log(TurretKey);
    }
});



$("#emp").on("input", () => {
    var cval = $("#emp").val();
    if (cval){
        EmpKey = cval.toUpperCase();
        EmpKey = EmpKey.charCodeAt(0);
        console.log(EmpKey);
    }
});

$("#samu").on("input", () => {
    var cval = $("#samu").val();
    if (cval){
        SamuKey = cval.toUpperCase();
        SamuKey = SamuKey.charCodeAt(0);
        console.log(SamuKey);
    }
});

$("#booster").on("input", () => {
    var cval = $("#booster").val();
    if (cval){
        BoosterHatKey = cval.toUpperCase();
        BoosterHatKey = BoosterHatKey.charCodeAt(0);
        console.log(BoosterHatKey);
    }
});

$("#spikeg").on("input", () => {
    var cval = $("#spikeg").val();
    if (cval){
        SpikeGearKey = cval.toUpperCase();
        SpikeGearKey = SpikeGearKey.charCodeAt(0);
        console.log(SpikeGearKey);
    }
});

$("#trap").on("input", () => {
    var cval = $("#trap").val();
    if (cval){
        TrapKey = cval.toUpperCase();
        TrapKey = TrapKey.charCodeAt(0);
        console.log(TrapKey);
    }
});

var styleItem = document.createElement("style");
styleItem.type = "text/css";
styleItem.appendChild(document.createTextNode(`
.keyPressLow {
    margin-left: 8px;
    font-size: 16px;
    margin-right: 8px;
    height: 25px;
    width: 50px;
    background-color: #fcfcfc;
    border-radius: 3.5px;
    border: none;
    text-align: center;
    color: #4A4A4A;
    border: 0.5px solid #f2f2f2;
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
    background: #cf2727;
    padding: 15px;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.modal-body {
    padding: 10px 20px;
    background: #fff;
}

.modal-footer {
    background: #cf2727;
    padding: 10px;
    color: #fff;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.closeBtn {
    color: #ccc;
    float: right;
    font-size: 30px;
    color: #fff;
}

.closeBtn:hover,
.closeBtn:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

/* Customize the label (the container) */
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

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a red background */
.container input:checked ~ .checkmark {
  background-color: #cf2727;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
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
document.head.appendChild(styleItem);


$("#adCard").css({display: "none"});


document.addEventListener('keydown', function(e) {
    if (e.keyCode == uneqiup && document.activeElement.id.toLowerCase() !== 'chatbox'){
        console.log("done")
        storeEquip(0);
    } else if (e.keyCode == 27){
        if (modal.style.display = "none") {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    } else if (e.keyCode == TankGearKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_TankGear);
    } else if (e.keyCode == SoldierHelmetKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_SoldierHelmet);
    } else if (e.keyCode == BullHelmetKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_BullHelmet);
    } else if (e.keyCode == BoosterHatKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_BoosterHat);
    } else if (e.keyCode == EmpKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_EmpHelmet);
            } else if (e.keyCode == SamuKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_SamuraiArmor);
    } else if (e.keyCode == SpikeGearKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_SpikeGear);
    } else if (e.keyCode == TurretKey && document.activeElement.id.toLowerCase() !== 'chatbox'){
        storeEquip(ID_TurretGear);
    }
})

// Get modal element
var modal = document.getElementById("simpleModal");
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

var checkbox = document.querySelector("#myCheck")

checkbox.addEventListener('change', function() {
    if (this.checked) {
        $("#mapDisplay").css({background: `url('https://i.imgur.com/fgFsQJp.png')`});
        console.log('checked')
    } else {
        $("#mapDisplay").css({background: `rgba(0, 0, 0, 0.25)`})
        console.log('unchecked')
    }
})
