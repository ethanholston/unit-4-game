//Variables
var chars = [{
    hp: 100,
    ap: 8,
    cp: 20,
    img: "<img src='assets/images/sakura.png'/>"
},
{
    hp: 125,
    ap: 7,
    cp: 8,
    img: "<img src='assets/images/sagat.png'/>"
},
{
    hp: 110,
    ap: 10,
    cp: 12,
    img: "<img src='assets/images/ryu.png'/>"
},
{
    hp: 115,
    ap: 9,
    cp: 16,
    img: "<img src='assets/images/abigail.png'/>"
}];

var oppChosenBool;
var charChosenBool; //boolean to keep subsequent functions from being called until character is chosen
var charChosen; //hold the object of the character chosen
var currentDef; //used in attack sequence to hold the object of the current defender 
var charAP; //current attack power of the character chosen
var apBase; //base attack power of player character used to increment AP
var charHP; //current HP of character chosen
var defCP; //current counter power of the defender
var defHP; //current hp of defender
var defenders = []; //array to hold all 3 defender objects
var defenderAlive;
var playerAlive;
var gameOver;

//Functions

//setup game by putting all char imgs at top of page.
function gameSetup(){
    $("#char-a").html(chars[0].img);
    $("#char-b").html(chars[1].img);
    $("#char-c").html(chars[2].img);
    $("#char-d").html(chars[3].img);
    charChosenBool = false;
    playerAlive = true;
    defenderAlive = true;
}

//charater selection. set charChosen to the selected char, set charAP, apBase, charHP to charChosen attributes. set defenders array.
function charSelection(){
    $("#char-a").on("click", function(){
        charChosen = chars[0];
        charAP = charChosen.ap;
        apBase = charChosen.ap;
        charHP = charChosen.hp;
        defenders = [chars[1], chars[2], chars[3]];
        setHTML();
    });
    $("#char-b").on("click", function(){
        charChosen = chars[1];
        charAP = charChosen.ap;
        apBase = charChosen.ap;
        charHP = charChosen.hp;
        defenders = [chars[0], chars[2], chars[3]];
        setHTML();
    });
    $("#char-c").on("click", function(){
        charChosen = chars[2];
        charAP = charChosen.ap;
        apBase = charChosen.ap;
        charHP = charChosen.hp;
        defenders = [chars[0], chars[1], chars[3]];
        setHTML();
    });
    $("#char-d").on("click", function(){
        charChosen = chars[3];
        charAP = charChosen.ap;
        apBase = charChosen.ap;
        charHP = charChosen.hp;
        defenders = [chars[0], chars[1], chars[2]];
        setHTML();
    });
}

//updates the HTML to move chars after selection
function setHTML(){
    $("#player").html(charChosen.img);
    $("#defender-1").html(defenders[0].img);
    $("#defender-2").html(defenders[1].img);
    $("#defender-3").html(defenders[2].img);
    $(".char").html("");

}

//moves selected defender to defender area and copies defender object into currentDef
function chooseOpp(){
    oppChosenBool = false;
    $("#defender-1").on("click", function(){
        $("#defender").html(defenders[0].img);
        $("#defender-1").html("");
        currentDef = defenders[0];
    });
    $("#defender-2").on("click", function(){
        $("#defender").html(defenders[1].img);
        $("#defender-2").html("");
        currentDef = defenders[1];
    });
    $("#defender-3").on("click", function(){
        $("#defender").html(defenders[2].img);
        $("#defender-3").html("");
        currentDef = defenders[2];
    });
}

//set HP and CP for the current defender
function attackSetup(){
    $(".defenders").on("click", function(){
        console.log(currentDef);
        console.log(defenders);
        console.log(chars);
        defHP = currentDef.hp;
        defCP = currentDef.cp;
        attack();
    });

} 

//
function attack(){
    $("#attackBTN").on("click", function(){
        if(defHP > 0 && charHP > 0){
            defHP -= charAP;
            charAP += apBase;
            console.log(charAP);
            charHP -= defCP;
            console.log("DefHP" + defHP + "charHP" + charHP);
            if(defHP <= 0){
                $("#defender").html("");
                var x = defenders.indexOf(currentDef);
                if(x >=0 ){
                defenders[x] = "";
                }
                console.log(defenders);
            }
            if(charHP <= 0){
                alert("Game Over");
                gameOver = true;
            }
            // if
        }
    });
}
function gamePlay(){
    gameSetup();
    charSelection();
    chooseOpp();
    attackSetup();
}



//Gameplay
gamePlay();


