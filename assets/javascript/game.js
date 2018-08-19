//Variables
const chars = [{
    name: "Sakura",
    hp: 300,
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
var gameOver;

//Functions

//setup game by putting all char imgs at top of page.
function gameSetup(){
    opponentSelected;
    charChosen; //hold the object of the character chosen
    currentDef; //used in attack sequence to hold the object of the current defender 
    apBase; //base attack power of player character used to increment AP
    defenders = [];
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
}

//charater selection. set charChosen to the selected char, set charAP, apBase, charHP to charChosen attributes. set defenders array.
$("#char-a").on("click", function(){
    charChosen = chars[0];
    apBase = charChosen.ap;
    defenders = [chars[1], chars[2], chars[3]];
    charSelect();
});
$("#char-b").on("click", function(){
    charChosen = chars[1];
    apBase = charChosen.ap;
    defenders = [chars[0], chars[2], chars[3]];
    charSelect();
});
$("#char-c").on("click", function(){
    charChosen = chars[2];
    apBase = charChosen.ap;
    defenders = [chars[0], chars[1], chars[3]];
    charSelect();
});
$("#char-d").on("click", function(){
    charChosen = chars[3];
    apBase = charChosen.ap;
    defenders = [chars[0], chars[1], chars[2]];
    charSelect();
});

//updates the HTML to move chars after selection
function charSelect(){
    setHtml("player");
    setHtml("def1");
    setHtml("def2");
    setHtml("def3");
    $(".char-container").detach();
    oppSelect();
}

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
            $("#player-img").html("<span class='char-hp' id='player-hp'></span>" + charChosen.img);
            $("#player-name").text(charChosen.name);
            $("#player-hp").text(charChosen.hp);
            break;
        // case "new":
        //     $("body").prepend("<span class='char-container'><span id='char-a-name' class='char-name'></span><span id='char-a'><span class='char-hp' id='char-a-hp'></span></span></span><span class='char-container'><span id='char-b-name' class='char-name'></span><span id='char-b'><span class='char-hp' id='char-b-hp'></span></span></span><span class='char-container'><span id='char-c-name' class='char-name'></span><span id='char-c'><span class='char-hp' id='char-c-hp'></span></span></span><span class='char-container'><span id='char-d-name' class='char-name'></span><span id='char-d'><span class='char-hp' id='char-d-hp'></span></span></span>")
        //     break;
    }
    
}

//moves selected defender to defender area and copies defender object into currentDef
function oppSelect(){
    $("#defender-1").on("click", function(){
        currentDef = defenders[0];
        setHtml("def");
        $("#defender-1").detach();
        $("#defender-2").off('click');
        $("#defender-3").off('click');
        $("#attack1").empty();
        $("#attack2").empty();
        opponentSelected = true;
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
    });
}

//set HP and CP for the current defender
$("#attackBTN").on("click", function(){
    if(opponentSelected == true){    
        if(currentDef.hp > 0 && charChosen.hp > 0){
            currentDef.hp -= charChosen.ap;
            charChosen.hp -= currentDef.cp;
            $("#attack1").text("You attacked " + currentDef.name + " for " + charChosen.ap + " damage");
            $("#attack2").text(currentDef.name + " attacked you back for " + currentDef.cp + " damage"); 
            if(currentDef.hp <= 0){
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
            if(charChosen.hp <= 0){
                alert("Game Over");
                gameOver = true;
            }
            if(defenders[0] == "" && defenders[1] == "" && defenders[2] == ""){
                $("#attack1").text("You won! Press restart to play again");
                $("#attack2").html();
            }

        }
        charChosen.ap += apBase;
        $("#player-hp").text(charChosen.hp);
        $("#defender-hp").text(currentDef.hp);
        
        
    }
});

// $("#restart").on("click", function(){
//     setHtml("new")
//     gameSetup();

// });

function gamePlay(){
    gameSetup();
    // attackSetup();
}

//Gameplay
gamePlay();


