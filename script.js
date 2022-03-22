let i_1 = "";
let i_2 = "";
let i_3 = "";
let ii_1 = "";
let ii_2 = "";
let ii_3 = "";
let E_1 = "";
let E_2 = "";
let E_3 = "";
let turn = "O"
let remainingB = 9;
let mensage = document.getElementById("message");

let turnTime = () => {
    if (turn == "X") {
        turn = "O"
    } else {
        turn = "X"
    }
}

let writeMessage = () => {
    turnTime();
    mensage.innerHTML = "Jogador " + turn + " Venceu!!!";
}

let hide = (r) => {
    let paleta = document.getElementById("opacity");
    if (r == true) {
        paleta.removeAttribute("style");
    } else {
        paleta.setAttribute("style", "display:block;");
    }
}

let check = (a, b, c) => {
    return a + b + c == "XXX" || a + b + c == "OOO"
}

function ConfirmXO(d, t) {
    if (d.getAttribute("id") == "1-1") { i_1 = t }
    if (d.getAttribute("id") == "1-2") { i_2 = t }
    if (d.getAttribute("id") == "1-3") { i_3 = t }
    if (d.getAttribute("id") == "2-1") { ii_1 = t }
    if (d.getAttribute("id") == "2-2") { ii_2 = t }
    if (d.getAttribute("id") == "2-3") { ii_3 = t }
    if (d.getAttribute("id") == "3-1") { E_1 = t }
    if (d.getAttribute("id") == "3-2") { E_2 = t }
    if (d.getAttribute("id") == "3-3") { E_3 = t }
    remainingB--;
    return checkWinner();
}

function checkWinner(){
    if (check(i_2, ii_2, E_2) == true) {
        return victory();
    } else if (check(i_1, ii_1, E_1) == true) {
        return victory();
    } else if (check(i_3, ii_3, E_3) == true) {
        return victory();
    } else if (check(E_1, E_2, E_3) == true) {
        return victory();
    } else if (check(ii_1, ii_2, ii_3) == true) {
        return victory();
    } else if (check(i_1, i_2, i_3) == true) {
        return victory();
    } else if (check(i_1, ii_2, E_3) == true) {
        return victory();
    } else if (check(i_3, ii_2, E_1) == true) {
        return victory();
    } else if (remainingB == 0) {
        alert("Deu velha, click em recomçar para jogar Novamente.");
        return draw();
    }
}

function mark(div) {
    let idclass = div.getAttribute("class");
    div.setAttribute("class", idclass + " " + turn);
    div.removeAttribute("onclick");
    let type = turn;
    turnTime();
    ConfirmXO(div, type);
}

function start(div) {
    let idclass = div.getAttribute("class") + " " + "X";
    div.setAttribute("class", idclass);
    let id = div.getAttribute("id");
    let i = 0;
    while (i < 9) {
        let change = document.getElementsByClassName("block")[i];
        if (change.getAttribute("id") == id) {
            change.removeAttribute("onclick");
            i++;
        } else {
            change.setAttribute("onclick", "mark(this)");
            i++;
        }
    }
    let type = "X"
    ConfirmXO(div, type);
}

function draw() {
    let r = false;
    hide(r);
    mensage.innerHTML = "Empate"
}

function victory() {
    let r = false;
    hide(r);
    writeMessage();
}

function reset() {
    let i = 0;
    i_1 = "";
    i_2 = "";
    i_3 = "";
    ii_1 = "";
    ii_2 = "";
    ii_3 = "";
    E_1 = "";
    E_2 = "";
    E_3 = "";
    turn = "O"
    remainingB = 9;
    let r = true;
    hide(r);
    mensage.innerHTML = "";
    while (i < 9) {
        let rst = document.getElementsByClassName("block")[i];
        let id = "block " + rst.getAttribute("id");
        rst.setAttribute("class", id);
        rst.setAttribute("onclick", "start(this)");
        i++;
    }
}