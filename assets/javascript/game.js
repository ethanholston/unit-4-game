//Variables

//set character attributes
const chars = [{
    name: "Sakura",
    hp: 120,
    ap: 8,
    cp: 20,
    img: "<img class='char-img' src='assets/images/sakura.png'/>"

},
{
    name: "Sagat",
    hp: 125,
    ap: 7,
    cp: 8,
    img: "<img class='char-img' src='assets/images/sagat.png'/>",
},
{
    name: "Ryu",
    hp: 110,
    ap: 10,
    cp: 12,
    img: "<img class='char-img' src='assets/images/ryu.png'/>"

},
{
    name: "Abigail",
    hp: 115,
    ap: 9,
    cp: 16,
    img: "<img class='char-img' src='assets/images/abigail.png'/>"

}];

var opponentSelected;
var charChosen; //hold the object of the character chosen
var currentDef; //used in attack sequence to hold the object of the current defender 
var apBase; //base attack power of player character used to increment AP
var defenders = []; //array to hold all 3 defender objects
var defHP; //var to store defender HP in order to not have to modify chars objects and preserve values to be called during restart
var charHP; //var to hold HP - same reason as defHP
var charAP; //var to hold char attack power - same reason

//Functions

//setup game by putting all char imgs at top of page. set char name, hp. 
function gameSetup(){
    $("#char-a").html("<span class='char-hp' id='char-a-hp'></span>" + chars[0].img);
    $("#char-a-name").text(chars[0].name);
    $("#char-a-hp").text(chars[0].hp);
    $("#char-b").html("<span class='char-hp' id='char-b-hp'></span>" + chars[1].img);
    $("#char-b-name").text(chars[1].name);
    $("#char-b-hp").text(chars[1].hp);
    $("#char-c").html("<span class='char-hp' id='char-c-hp'></span>" + chars[2].img);
    $("#char-c-name").text(chars[2].name);
    $("#char-c-hp").text(chars[2].hp);
    $("#char-d").html("<span class='char-hp' id='char-d-hp'></span>" + chars[3].img);
    $("#char-d-name").text(chars[3].name);
    $("#char-d-hp").text(chars[3].hp);
    $("#defender-name").empty(); //only necessary after restart. empties defender container
    $("#defender-img").empty();
    $("#restart").empty(); //clear restart button after restart
    $("#attack1").empty(); //clear attack notifications
    $("#attack2").empty();
}

//charater selection. set charChosen to the selected char, set defenders array. call charSelect() to update HTML
$(document).on("click", "#char-a", function(){
    charChosen = chars[0];
    setCharAttr();
    defenders = [chars[1], chars[2], chars[3]];
    charSelect();
});
$(document).on("click", "#char-b", function(){
    charChosen = chars[1];
    setCharAttr();
    defenders = [chars[0], chars[2], chars[3]];
    charSelect();
});
$(document).on("click", "#char-c", function(){
    charChosen = chars[2];
    setCharAttr();
    defenders = [chars[0], chars[1], chars[3]];
    charSelect();
});
$(document).on("click", "#char-d", function(){
    charChosen = chars[3];
    setCharAttr();
    defenders = [chars[0], chars[1], chars[2]];
    charSelect();
});

//copies the attr of the chosen char into vars that can be modified during gameplay
function setCharAttr(){
    apBase = charChosen.ap;
    charHP = charChosen.hp;
    charAP = charChosen.ap;
}

//updates the HTML to move chars after selection
function charSelect(){
    setHtml("player");
    setHtml("def1");
    setHtml("def2");
    setHtml("def3");
    $(".char-container").detach();
    $("#enemies").text("Choose an opponent");
    oppSelect();
}

//called during various steps of the game to update html. 
function setHtml(arg){
    switch(arg){
        case "def1":  
            $("#defender-1-img").html("<span class='char-hp' id='defender-1-hp'></span>" + defenders[0].img);
            $("#defender-1-name").text(defenders[0].name);
            $("#defender-1-hp").text(defenders[0].hp);
            break;
        case "def2":
            $("#defender-2-img").html("<span class='char-hp' id='defender-2-hp'></span>" + defenders[1].img);
            $("#defender-2-name").text(defenders[1].name);
            $("#defender-2-hp").text(defenders[1].hp);
            break;
        case "def3":
            $("#defender-3-img").html("<span class='char-hp' id='defender-3-hp'></span>" + defenders[2].img);
            $("#defender-3-name").text(defenders[2].name);
            $("#defender-3-hp").text(defenders[2].hp);
            break;
        case "def":
            $("#defender-img").html("<span class='char-hp' id='defender-hp'></span>" + currentDef.img);
            $("#defender-name").text(currentDef.name);
            $("#defender-hp").text(currentDef.hp);
            break;
        case "player":
            $("#chooseChar").empty(); //clears Choose character notification from screen
            $("#your-character").html("Your character <br>")
            $("#player-img").html("<span class='char-hp' id='player-hp'></span>" + charChosen.img);
            $("#player-name").text(charChosen.name);
            $("#player-hp").text(charChosen.hp);
            break;
        case "new": //replaces .char-container html that was detached during previous game
            $("body").prepend("<span class='char-container'><span id='char-a-name' class='char-name'></span><span id='char-a'><span class='char-hp' id='char-a-hp'></span></span></span><span class='char-container'><span id='char-b-name' class='char-name'></span><span id='char-b'><span class='char-hp' id='char-b-hp'></span></span></span><span class='char-container'><span id='char-c-name' class='char-name'></span><span id='char-c'><span class='char-hp' id='char-c-hp'></span></span></span><span class='char-container'><span id='char-d-name' class='char-name'></span><span id='char-d'><span class='char-hp' id='char-d-hp'></span></span></span>")
            $("#player-name").html("");
            $("#player-img").html("");
            break;
        case "defCont": //replaces .defender-container html that was detached during previous game
            $("#defender-container").html("<span class='defenders' id='defender-1'><span id='defender-1-name' class='char-name'></span><span id='defender-1-img'><span class='char-hp' id='defender-1-hp'></span></span></span><span class='defenders' id='defender-2'><span id='defender-2-name' class='char-name'></span><span id='defender-2-img'><span class='char-hp' id='defender-2-hp'></span></span></span><span class='defenders' id='defender-3'><span id='defender-3-name' class='char-name'></span><span id='defender-3-img'><span class='char-hp' id='defender-3-hp'></span></span></span>")
            break;
    }
    
}

//moves selected defender to defender area and copies defender object into currentDef
function oppSelect(){
    $("#defender-1").on("click", function(){
        currentDef = defenders[0];
        setHtml("def");
        $("#defender-1").detach(); //removes defender image from opponenet selection area
        $("#defender-2").off('click'); //turns off click listener on other opponents
        $("#defender-3").off('click');
        $("#attack1").empty(); //clears any previous attack notifications
        $("#attack2").empty();
        opponentSelected = true; //activate attack button 
        defHP = defenders[0].hp; //set hp and ap for new defender
        defAP = defenders[0].cp;
    });
    $("#defender-2").click(function(){
        currentDef = defenders[1];
        setHtml("def"); 
        $("#defender-1").off('click');
        $("#defender-3").off('click');
        $("#defender-2").detach();
        $("#attack1").empty();
        $("#attack2").empty();
        opponentSelected = true;
        defHP = defenders[1].hp;
        defAP = defenders[1].cp;
    });
    $("#defender-3").on("click", function(){
        currentDef = defenders[2];
        setHtml("def"); 
        $("#defender-1").off('click');
        $("#defender-2").off('click');
        $("#defender-3").detach();
        $("#attack1").empty();
        $("#attack2").empty();
        opponentSelected = true;
        defHP = defenders[2].hp;
        defAP = defenders[2].cp;
    });
}

//set HP and CP for the current defender
$("#attackBTN").on("click", function(){
    if(opponentSelected == true){    
        if(defHP > 0 && charHP > 0){
            defHP -= charAP;
            charHP -= currentDef.cp;
            $("#attack1").text("You attacked " + currentDef.name + " for " + charAP + " damage");
            $("#attack2").text(currentDef.name + " attacked you back for " + currentDef.cp + " damage"); 
            if(defHP <= 0){
                $("#defender-name").html("");
                $("#defender-img").html("");
                var x = defenders.indexOf(currentDef);
                defenders[x] = "";
                console.log(defenders);
                opponentSelected = false;
                $("#attack1").text("You eliminated " + currentDef.name);
                $("#attack2").text("Choose a new opponent");
                oppSelect();
            }
            if(charHP <= 0){
                $("#attack1").text("You were defeated. Press restart to play again");
                $("#attack2").empty();
                $("#restart").html("<button>Restart</button>");
            }
            if(defenders[0] == "" && defenders[1] == "" && defenders[2] == ""){
                $("#attack1").text("You won! Press restart to play again");
                $("#attack2").empty();
                $("#restart").html("<button>Restart</button>");
            }

        }
        charAP += apBase;
        $("#player-hp").text(charHP);
        $("#defender-hp").text(defHP);
        
        
    }
});

$(document).on("click", "#restart", function(){
    setHtml("new");
    setHtml("defCont");
    gameSetup();

});

gameSetup();


