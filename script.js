//variables principales :

var fps = 25;

persoSize = 32;

let nbPixMove = 5

let otherMap = false;

let tabBoxes = [
    { x: 0, y: 0, w: 397, h: 200 },
    { x: 461, y: 0, w: 1203, h: 200 },
    { x: 193, y: 200, w: 175, h: 198 },
    { x: 460, y: 200, w: 524, h: 200 },
    { x: 1075, y: 200, w: 350, h: 141 },
    { x: 1425, y: 200, w: 175, h: 540 },
    { x: 620, y: 475, w: 805, h: 295 },
    { x: 430, y: 590, w: 190, h: 150 },
    { x: 305, y: 622, w: 125, h: 118 },
    { x: 260, y: 440, w: 135, h: 101 },
    { x: 0, y: 300, w: 147, h: 440 },
    { x: 0, y: 200, w: 190, h: 100 },
    { x: 175, y: 410, w: 85, h: 83 },
    { x: 466, y: 448, w: 61, h: 93 },
    { x: 557, y: 431, w: 68, h: 77 },
    { x: 752, y: 447, w: 164, h: 29 },
    { x: 1025, y: 287, w: 51, h: 60 },
    { x: 238, y: 559, w: 66, h: 181 },
    { x: 211, y: 608, w: 27, h: 132 },
    { x: 180, y: 543, w: 31, h: 197 },
    { x: 148, y: 512, w: 32, h: 228 },
    { x: 385, y: 282, w: 14, h: 26 },
    { x: 385, y: 347, w: 14, h: 26 },
    { x: 433, y: 448, w: 4, h: 30 },
    { x: 433, y: 512, w: 4, h: 30 },
    { x: 555, y: 511, w: 4, h: 30 },
    { x: 979, y: 199, w: 72, h: 70 },
    { x: 1030, y: 367, w: 144, h: 28 },
    { x: 1174, y: 367, w: 53, h: 60 },
    { x: 1227, y: 399, w: 139, h: 28 },
    { x: 1366, y: 399, w: 63, h: 60 },
    { x: 1298, y: 341, w: 77, h: 25 },
    { x: 1327, y: 366, w: 17, h: 13 }
];

//special animate()
let interval;
let x_time = 0;
var walk = false;
function animate(direction) {
    x_time = 0;
    clearInterval(interval);
    interval = setInterval(function () {
        //console.log(x);
        animeSprite(getTabCoords(direction))
        move(direction)
        x_time++;
        if (x_time > 600) clearInterval(interval);
    }, fps);
}


/**
 * 
 * @param {*} evt 
 */
document.onkeydown = (evt) => {
    var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;

    if (keyCode == 37) { //alert("gauche") 
        if (!walk) {
            walk = true;
            animate("O")
        }
    }
    if (keyCode == 38) { //alert("haut") 
        if (!walk) {
            walk = true;
            animate("N")
        }
    }
    if (keyCode == 39) { //alert("droite")
        if (!walk) {
            walk = true;
            animate("E")
        }
    }
    if (keyCode == 40) { //alert("bas")
        if (!walk) {
            walk = true;
            animate("S")
        }
    }
}


document.onkeyup = function () {
    walk = false;
    clearInterval(interval)

}


/**
 * @description renvoi un tab de coords avec 4 X (en tab[0][1][2][3]) et 1 Y (en tab[4])
 * @param {string} direction = S ||  E ||  O || N 
 * @returns un tableau de taille 5 avec les 4 premieres entrees pour la coordX et le tab[4] (5eme entree) avec le Y
 */
function getTabCoords(direction) {
    let tabdirections = [
        { x: 0 },
        { x: -persoSize },
        { x: -(persoSize * 2) },
        { x: -(persoSize * 3) }
        //on rajoute une 5eme colone pour le y 
    ];
    if (direction == "S") {
        var elmt = {};
        elmt['x'] = 0
        tabdirections.push(elmt)
    }
    if (direction == "O") {
        var elmt = {};
        elmt['x'] = -persoSize
        tabdirections.push(elmt)
    }
    if (direction == "E") {
        var elmt = {};
        elmt['x'] = -(persoSize * 2)
        tabdirections.push(elmt)
    }
    if (direction == "N") {
        var elmt = {};
        elmt['x'] = -(persoSize * 3)
        tabdirections.push(elmt)
    }
    return tabdirections
}


/**
 * @description selon le tab de directions, affiche successivement 4 images en boucle (anime l'image)
 */
let numCoord = 0;
function animeSprite(tab) {
    displayFrame(tab[numCoord].x, tab[4].x)
    numCoord++;
    if (numCoord == 4)
        numCoord = 0
}

/**
 * @description affiche une frame (l'image fixe) placée en fonction des x,y
 * @param {int} x l'abscissse
 * @param {int} y l'ordonnee
 */
function displayFrame(x, y) {
    //document.querySelector("#image").style.top = x;

    document.querySelector("#image").style.left = x + "px";

    document.getElementById("image").style.top = y + "px";

}

/**
 * @description déplace "le personnage" en fonction de sa direction (et verif l'effet de bord)
 * @param {string} direction 
 */
function move(direction) {
    let xPerso = getValueOfPx(document.getElementById("position").style.marginLeft);
    let yPerso = getValueOfPx(document.getElementById("position").style.marginTop);

    changeMap(xPerso, yPerso);

    let topValue = getValueOfPx(document.getElementById("position").style.marginTop);
    let leftValue = getValueOfPx(document.getElementById("position").style.marginLeft);

    if (direction == "N") {
        if (!isAHit(xPerso, (yPerso - nbPixMove)))
            document.getElementById("position").style.marginTop = (topValue - nbPixMove) + "px";
    }
    if (direction == "S") {
        if (!isAHit(xPerso, (yPerso + nbPixMove)))
            document.getElementById("position").style.marginTop = (topValue + nbPixMove) + "px";;
    }
    if (direction == "E") {
        if (!isAHit((xPerso + nbPixMove), yPerso))
            document.querySelector("#position").style.marginLeft = (leftValue + nbPixMove) + "px";
    }
    if (direction == "O") {
        if (!isAHit((xPerso - nbPixMove), yPerso))
            document.querySelector("#position").style.marginLeft = (leftValue - nbPixMove) + "px";
    }

}


function isHitBox(xPerso, yPerso, xBox, yBox, wBox, hBox) {
    //les -10,+10, -4, et +22  sont la pour preciser (réduire) la hitbox du perso
    if ((xBox <= (xPerso + persoSize - 10)) && ((xPerso + 10) <= (xBox + wBox))) {
        if ((yBox <= (yPerso + persoSize - 4)) && ((yPerso + 28) <= (yBox + hBox))) {
            console.log("Bloqué !")
            return true
        }
    }
    return false
}


function isAHit(xPerso, yPerso) {
    if (otherMap)
        return false
    for (let i = 0; i < tabBoxes.length; i++) {
        if (isHitBox(xPerso, yPerso, tabBoxes[i].x, tabBoxes[i].y, tabBoxes[i].w, tabBoxes[i].h))
            return true
    }
    return false
}

function getValueOfPx(pxValue) {
    return parseInt(pxValue.slice(0, -2));
}


function changeMap(xPerso, yPerso) {
    //map apocalypse
    if ((397 <= (xPerso + persoSize - 10)) && ((xPerso + 10) <= 461)) {
        if (((yPerso + 28) <= 0)) {
            otherMap = true;
            document.querySelector("#position").style.marginTop = 740 + "px";
            document.querySelector("body").style.backgroundImage = "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Ffd%2F7d%2Fbc%2Ffd7dbc9d7041e5f28e159cec46d53c18.jpg&f=1&nofb=1')"
            document.querySelector("body").style.backgroundRepeat = "repeat";
        }
    }
    //map pokemon
    if (isHitBox(xPerso, yPerso, 849, 283, 19, 18)) {
        otherMap = false;
        document.querySelector("#position").style.marginTop = 200 + "px";
        document.querySelector("#position").style.marginLeft = 410 + "px";
        document.querySelector("body").style.backgroundImage = "url('https://www.pokebip.com/membres/galeries/1232/1232906066072134700.png')";
        document.querySelector("body").style.backgroundRepeat = "no-repeat";
    }
    /*if (depace botborder) {
        bacground color -> darkgreen
            position(margin top -> en haut)
        image  URL poketown
            otherMap = false;
        }*/
}
/*
function changeMap() {


    if (depace Topborder) {
    bacground color -> dark brown
        position(margin top -> en bas)
    image new URL -> https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Ffd%2F7d%2Fbc%2Ffd7dbc9d7041e5f28e159cec46d53c18.jpg&f=1&nofb=1
     image repeat
    otherMap = true;
    }

}*/

// pour obtenir des coords sur l'ecran en passant la souris


/*
function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
}

document.onmousemove = function (e) {
    var mousecoords = getMousePos(e);
    console.log("x:" + mousecoords.x)
    console.log("y:" + mousecoords.y)
};
*/