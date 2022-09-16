//MANCA: fineGioco      BUG: i pezzi possono muoversi anche se il proprio re dopo la mossa rimane sotto scacco;

let selectAll = document.querySelectorAll('.casella');
let nuovoPezzo = document.querySelectorAll('.pezzo');
let last;
let t = 0;
let click = 0;

function moove() { //core del codice, un ciclo 'infinito' che termina solo alla fine del gioco
    let pezzoPrecedenteColoreOpposto;
    let legale = false;
    let lastCasella;
    let lastId;
    let aChiSta;
    let onlyMove = false;
    for(let i = 0; i < selectAll.length; i++) {
        selectAll[i].addEventListener('click', function selectPiece() {
            //if(isCheck(aChiSta)) onlyMove = true;  se è scacco solo il re può muoversi oppure un pezzo può mettersi in mezzo
            if(click == 0) aChiSta = turno(t);
            if (aChiSta == "B") {   // turno del bianco
                if (click >= 1) {
                    if(onlyMove) {
                        if(canBlock(nuovoPezzo[i], pezzoPrecedenteColoreOpposto) && canEscape(nuovoPezzo[i], last)) {
                            debugger
                            eseguiMossa(nuovoPezzo[i], last);
                            changePieceId(event, "B", lastId, lastCasella);
                            lastCasella.className = lastCasella.className.slice(0, 14);
                            onlyMove = false;
                        } else {
                            click = 0;
                            lastCasella.className = lastCasella.className.slice(0, 14);
                            onlyMove = false;
                        }
                    } else {
                        legale = isLegalMove(nuovoPezzo[i], last, "B");
                        if(legale) changePieceId(event, "B", lastId, lastCasella);
                        lastCasella.className = lastCasella.className.slice(0, 14);
                    }
                } else {    //seleziona il pezzo bianco
                    for (let pez of mapPezziBianchi.values()) {
                        try {
                            if(event.srcElement.childNodes[1].id == pez) {
                                lastId = pez
                                click++;
                                event.target.className = event.target.className + " selected";
                                lastCasella = event.target;
                            }
                        } catch(e) {}
                        try {
                            if(event.srcElement.id == pez) {
                                lastId = pez
                                click++;
                                event.currentTarget.className = event.currentTarget.className + " selected";
                                lastCasella = event.currentTarget;
                            }
                        } catch(e) {}
                    }
                    last = nuovoPezzo[i];
                }
            } else { // turno del nero
                if (click >= 1) {
                    legale = isLegalMove(nuovoPezzo[i], last, "N");
                    if(legale) changePieceId(event, "N", lastId, lastCasella);
                    lastCasella.className = lastCasella.className.slice(0, 14);
                    if(isCheck(nonAChiSta(aChiSta))) {
                        onlyMove = true;
                        //canEscape();
                        //canBlock();
                        // se entrambe sono vere avviene fineGioco
                    }
                    pezzoPrecedenteColoreOpposto = nuovoPezzo[i];
                } else {    //seleziona il pezzo nero
                    for (let pez of mapPezziNeri.values()) {
                        try{
                            if(event.srcElement.childNodes[1].id == pez) {
                                lastId = pez
                                click++;
                                event.target.className = event.target.className + " selected";
                                lastCasella = event.target;
                            }
                        } catch(e) {}
                        try{
                            if(event.srcElement.id == pez) {
                                lastId = pez
                                click++;
                                event.currentTarget.className = event.currentTarget.className + " selected";
                                lastCasella = event.currentTarget;
                            }
                        } catch(e) {}
                    }
                    last = nuovoPezzo[i];
                }
            }
        });
    }
}

function nonAChiSta(colore) {
    let col = Object.assign(colore)
    if(colore == "B") col = "N";
    else col = "B";
    return col;
}

function canEscape(casellaSelezionata, pezzo) {
    let b = false;
    if(fromPezToMap(pezzo)[0].slice(0, 1) == "r" &&
    kingMoovement(casellaSelezionata, pezzo)) {
        b = true;
    }
    return b;
}

function canBlock(casellaSelezionata, pezzoColoreOpposto) {
    let b = false;
    if(movimentoOrizzontale(pezzoColoreOpposto, casellaSelezionata) ||
    movimentoObliquo(pezzoColoreOpposto, casellaSelezionata) ||
    movimentoVerticale(pezzoColoreOpposto, casellaSelezionata)) {
        b = true;
    }
    return b;
}

function isCheck(colore) { // Controlla se il re è sotto scacco
    let b = false;
    if(colore == "B") {
        let king = document.getElementById(mapPezziBianchi.get("reB"))
        if(isMenaced(king, colore)) {
            debugger
            b = true
        }
    }
    return b;
}

// Gestisce il tipo di pezzo selezionato, si occupa del riconoscimento e delle regole di movimento.
function isLegalMove(casellaSelezionata, lastPezzo, colore) {
    if(colore == "B") piece = searchPezzoBiancoPassato(lastPezzo, "B");
    else piece = searchPezzoBiancoPassato(lastPezzo, "N") 
    let b = false;
    switch(piece[0].slice(0, 1)) {
        case "p":
            if(piece[0].slice(1, 2) == "B") { // regole del pedone bianco
                let casellaInMezzo = Object.assign({}, casellaSelezionata);
                casellaInMezzo.id = casellaSelezionata.id.slice(0, 1) + 
                (parseInt(casellaSelezionata.id.slice(1)) - 1).toString();
    
                let casel = piece[1].slice(0, 1)
                let n = alfabeto.indexOf(casel);
    
                if(((parseInt(piece[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1)) &&
                searchPezzo(casellaSelezionata, "all") == false) || 
                (parseInt(piece[1].slice(1)) + 2 == parseInt(casellaSelezionata.id.slice(1)) &&
                piece[1].slice(1) == "2") &&
                !searchPezzo(casellaInMezzo, "all")) &&
                alfabeto[n] == casellaSelezionata.id.slice(0, 1)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else if(parseInt(piece[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1))) {
                    let d = n + 1;
                    let s = n - 1;
                    if(d <= 7 || s >= 0) {
                        if((casellaSelezionata.id.slice(0, 1) == alfabeto[d] || 
                        casellaSelezionata.id.slice(0, 1) == alfabeto[s]) &&
                        searchPezzo(casellaSelezionata, "N") == true) {
                            eseguiMossa(casellaSelezionata, lastPezzo);
                            b = true;
                        } else {
                            click = 0;
                        }
                    }
                } else {
                    click = 0;
                }
            }
            if(piece[0].slice(1, 2) == "N") { // regole del pedone nero
                let casellaInMezzo = Object.assign({}, casellaSelezionata);
                casellaInMezzo.id = casellaSelezionata.id.slice(0, 1) + 
                (parseInt(casellaSelezionata.id.slice(1)) + 1).toString();
    
                let casel = piece[1].slice(0, 1)
                let n = alfabeto.indexOf(casel);
    
                if(((parseInt(piece[1].slice(1)) - 1 == parseInt(casellaSelezionata.id.slice(1)) &&
                searchPezzo(casellaSelezionata, "all") == false) || 
                (parseInt(piece[1].slice(1)) - 2 == parseInt(casellaSelezionata.id.slice(1)) &&
                piece[1].slice(1) == "7") &&
                !searchPezzo(casellaInMezzo, "all")) &&
                alfabeto[n] == casellaSelezionata.id.slice(0, 1)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else if(parseInt(piece[1].slice(1)) - 1 == parseInt(casellaSelezionata.id.slice(1))) {
                    let d = n + 1;
                    let s = n - 1;
                    if(d <= 7 || s >= 0) {
                        if((casellaSelezionata.id.slice(0, 1) == alfabeto[d] || 
                        casellaSelezionata.id.slice(0, 1) == alfabeto[s]) &&
                        searchPezzo(casellaSelezionata, "B") == true) {
                            eseguiMossa(casellaSelezionata, lastPezzo);
                            b = true;
                        } else {
                            click = 0;
                            b = false;
                        }
                    }
                } else {
                    click = 0;
                    b = false;
                }
            }
            break;
            case "c": // Regole del cavallo
                if(cavalloMovement(piece, casellaSelezionata) && nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                        b = true
                } else {
                        click = 0;
                        b = false;
                }
            break;
            case "t": // Regole della torre
                if(movimentoVerticale(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else if(movimentoOrizzontale(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else {
                    click = 0;
                    b = false;
                }
            break;
            case "a": // Regole alfiere
                if(movimentoObliquo(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else {
                    click = 0;
                    b = false;
                }
            break;
            case "d": //Regole donna
                if(movimentoVerticale(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else if(movimentoOrizzontale(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else if(movimentoObliquo(lastPezzo, casellaSelezionata) &&
                nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)){
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                }
                else {
                    click = 0;
                    b = false;
                }
            break;
            case "r": // Regole re
                if(kingMoovement(casellaSelezionata, lastPezzo) && nonPuoiMangiareTuoiAmici(casellaSelezionata, lastPezzo)) {
                    eseguiMossa(casellaSelezionata, lastPezzo);
                    b = true;
                } else {
                    click = 0;
                    b = false;
                }
            break;
    }
    return b;
}

// Funzione richiamata per non riscrivere il codice due volte per la funzione "isMenaced"
function bigSwitch(casellaSelezionata, pez, colore) {
    let b = false;
    let pezzo = document.getElementById(pez[1]);
    switch(pez[0].slice(0, 1)) {
        case "a":
        let diagonali = calcolaDiagonaliLibere(pezzo);
            for(let i = 0; i < diagonali.length; i++) {
                if (casellaSelezionata.id == diagonali[i]){
                    b = true;
                    debugger
                }
            }
        break;
        case "t":
            if(movimentoVerticale(pezzo, casellaSelezionata)
            || movimentoOrizzontale(pezzo, casellaSelezionata)) {
                b = true;
                debugger
            }
        break;
        case "d":
            if(movimentoVerticale(pezzo, casellaSelezionata)
            || movimentoOrizzontale(pezzo, casellaSelezionata)
            || movimentoObliquo(pezzo, casellaSelezionata)) {
                debugger
                b = true;
            }
        break;
        case "c":
            if(cavalloMovement(pez, casellaSelezionata)) {
                b = true;
                debugger
            }
        break;
        case "p":
            if(minaccePedone(pez, casellaSelezionata, colore)){
                b = true;
                debugger
            }
        break;
        case "r":
            if(movimentoKing(pez, casellaSelezionata)) {
                b = true;
                debugger
            }
        break;
    }
    return b;
}

function isMenaced(casellaSelezionata, colore) {  //controlla se la casella è 'minacciata' da qualche pezzo
    let b = false;
    if(colore == "B") {
        for(let pez of mapPezziNeri) {
            if(bigSwitch(casellaSelezionata, pez, colore)) {
                b = true;
            } 
        }
    } else {
        for(let pez of mapPezziBianchi) {
            if(bigSwitch(casellaSelezionata, pez, colore)) {
                b = true;
            } 
        }
    }
    return b;
}

function movimentoKing(pez, casellaSelezionata) { //le caselle in cui potrebbe andare il re
    let b = false;
    let casel = pez[1].slice(0, 1);
    let n = alfabeto.indexOf(casel);
    if(parseInt(pez[1].slice(1)) - 1 == parseInt(casellaSelezionata.id.slice(1)) ||
    parseInt(pez[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1)) ||
    parseInt(pez[1].slice(1)) == parseInt(casellaSelezionata.id.slice(1))) {
        let d = n + 1;
        let s = n - 1;
        if(d <= 7 || s >= 0) {
            if(casellaSelezionata.id.slice(0, 1) == alfabeto[d] || 
            casellaSelezionata.id.slice(0, 1) == alfabeto[s] ||
            casellaSelezionata.id.slice(0, 1) == alfabeto[n]) {
                b = true;
            }
        }
    }
    return b;
}

function kingMoovement(casellaSelezionata, lastPezzo) { // Vero movimento del re
    let i = movimentoKing(fromPezToMap(lastPezzo), casellaSelezionata)
    let b = false;
    if(!isMenaced(casellaSelezionata, colorePezzo(lastPezzo)) && movimentoKing(fromPezToMap(lastPezzo), casellaSelezionata)) {
        b = true;
    }
    return b
}

function fromPezToMap(piece) { //funzione che prende un pezzo in entrata e re
    let coppia = [];
    for(let pez of mapPezziBianchi) {
        if(pez[1] == piece.id) {
            coppia.push(pez[0]);
        }
    }
    for(let pez of mapPezziNeri) {
        if(pez[1] == piece.id) {
            coppia.push(pez[0]);
        }
    }
    coppia.push(piece.id);
    return coppia;
}

function isCasellaFree(id) { //controlla se in una casella vi è un pezzo
    let bool = true;
    for(let pez of mapPezziBianchi.values()) {
        if(id == pez) {
            bool = false;
        }
    }
    for(let pez of mapPezziNeri.values()) {
        if(id == pez) {
            bool = false;
        }
    }
    return bool;
}

function cavalloMovement(pez, casellaSelezionata) { 
    let b = false 
    let casel = pez[1].slice(0, 1);
    let n = alfabeto.indexOf(casel);
    if((parseInt(pez[1].slice(1)) + 2 == parseInt(casellaSelezionata.id.slice(1)) ||
    parseInt(pez[1].slice(1)) - 2 == parseInt(casellaSelezionata.id.slice(1))) && 
    (alfabeto[n + 1] == casellaSelezionata.id.slice(0, 1) ||
    alfabeto[n - 1] == casellaSelezionata.id.slice(0, 1)) ||
    (alfabeto[n + 2] == casellaSelezionata.id.slice(0, 1) ||
    alfabeto[n - 2] == casellaSelezionata.id.slice(0, 1)) &&
    (parseInt(pez[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1)) ||
    parseInt(pez[1].slice(1)) - 1 == parseInt(casellaSelezionata.id.slice(1))))
        b = true;
    return b;
}

function movimentoObliquo(piece, nuovoPezzo) {
    let bool = false;
    let diagonali = calcolaDiagonaliLibere(piece);
    for(let d of diagonali) {
        if(nuovoPezzo.id == d) {
            bool = true;
        }
    }
    return bool;
}

function movimentoOrizzontale(piece, nuovoPezzo) {
    let bool = false;
    let casellaSelezionata = nuovoPezzo.id.slice(0, 1);
    let posizione = piece.id.slice(0, 1);
    let n1 = alfabeto.indexOf(casellaSelezionata);
    let n2 = alfabeto.indexOf(posizione);
    let controllo = 1;
    if(piece.id.slice(1) == nuovoPezzo.id.slice(1)) {
        if(n1 > n2) {
            for(let i = n2 + 1; i < n1; i++) {
                let casellaInMezzo = Object.assign({}, piece);
                casellaInMezzo.id = (alfabeto[n2 + controllo]) + piece.id.slice(1);
                if(casellaInMezzo.id.slice(1) != casellaSelezionata && !searchPezzo(casellaInMezzo, "all")) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
                controllo++;
            }
            let c = n2 + 1;
            if(!bool && c == n1) bool = true;
        } else {
            for(let i = n2 - 1; i > n1; i--) {
                let casellaInMezzo = Object.assign({}, piece);
                casellaInMezzo.id = (alfabeto[n2 - controllo]) + piece.id.slice(1);
                if(casellaInMezzo.id.slice(1) != casellaSelezionata && !searchPezzo(casellaInMezzo, "all")) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
                controllo++;
            }
            let c = n2 - 1;
            if(!bool && c == n1) bool = true;
        }
    }
    return bool;
}

function movimentoVerticale(piece, nuovoPezzo) {
    let bool = false;
    let casellaSelezionata = parseInt(nuovoPezzo.id.slice(1));
    let posizione = parseInt(piece.id.slice(1));
    let controllo = 1;
    if(piece.id.slice(0, 1) == nuovoPezzo.id.slice(0, 1)) {        
        if(casellaSelezionata > posizione) {
            for(let i = posizione + 1; i < casellaSelezionata; i++) {
                let casellaInMezzo = Object.assign({}, piece);
                    casellaInMezzo.id = piece.id.slice(0, 1) +
                    (parseInt(piece.id.slice(1)) + controllo).toString();
                if(casellaInMezzo.id.slice(1) != casellaSelezionata && !searchPezzo(casellaInMezzo, "all") && 
                piece.id.slice(0, 1) == nuovoPezzo.id.slice(0, 1)) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
                controllo++;
            }
            let c = posizione + 1;
            if(!bool && c == casellaSelezionata) bool = true;
        } else {
            for(let i = posizione - 1; i > casellaSelezionata; i--) {
                let casellaInMezzo = Object.assign({}, piece);
                    casellaInMezzo.id = piece.id.slice(0, 1) +
                    (parseInt(piece.id.slice(1)) - controllo).toString();
                if(casellaInMezzo.id.slice(1) != casellaSelezionata && !searchPezzo(casellaInMezzo, "all")) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
                controllo++;
            }
            let c = posizione - 1;
            if(!bool && c == casellaSelezionata) bool = true;
        }
    }
    return bool;
}

function calcolaDiagonaliLibere(piece) { // calcola le diagonali di un pezzo in una determinata posizione
    let array = [];
    let n = alfabeto.indexOf(piece.id.slice(0, 1));
    let aumento = 1;

    for(let i = n + 1; i < 8; i++) {
        if(((parseInt(piece.id.slice(1)) + aumento) <= 8 && 
        (parseInt(piece.id.slice(1)) + aumento) > 0) && 
        isCasellaFree(alfabeto[i] + (parseInt(piece.id.slice(1)) + aumento).toString())) 
            array.push((alfabeto[i] + (parseInt(piece.id.slice(1)) + aumento).toString()));
        else {
            array.push((alfabeto[i] + (parseInt(piece.id.slice(1)) + aumento).toString()));
            break;
        }
        aumento++;
    }
    aumento = 1;
    for(let i = n + 1; i < 8; i++) {
        if(((parseInt(piece.id.slice(1)) - aumento) <= 8 && 
        (parseInt(piece.id.slice(1)) - aumento) > 0) && 
        isCasellaFree(alfabeto[i] + (parseInt(piece.id.slice(1)) - aumento).toString()))
            array.push((alfabeto[i] + (parseInt(piece.id.slice(1)) - aumento).toString()));
        else {
            array.push((alfabeto[i] + (parseInt(piece.id.slice(1)) - aumento).toString()));
            break; 
        }
        aumento++;
    }
    aumento = 1;
    for(let k = n - 1; k >= 0; k--) {
        if(((parseInt(piece.id.slice(1)) + aumento) <= 8 && 
        (parseInt(piece.id.slice(1)) + aumento) > 0) && 
        isCasellaFree(alfabeto[k] + (parseInt(piece.id.slice(1)) + aumento).toString()))
            array.push((alfabeto[k] + (parseInt(piece.id.slice(1)) + aumento).toString()));
        else {
            array.push((alfabeto[k] + (parseInt(piece.id.slice(1)) + aumento).toString()));
            break;
        }
        aumento++;
    }
    aumento = 1;
    for(let k = n - 1; k >= 0; k--) {
        if(((parseInt(piece.id.slice(1)) - aumento) <= 8 && 
        (parseInt(piece.id.slice(1)) - aumento) > 0) &&
        isCasellaFree(alfabeto[k] + (parseInt(piece.id.slice(1)) - aumento).toString())) 
            array.push((alfabeto[k] + (parseInt(piece.id.slice(1)) - aumento).toString()));
        else {
            array.push((alfabeto[k] + (parseInt(piece.id.slice(1)) - aumento).toString()));
            break;
        }
        aumento++;
    }
    return array;
}

// ritorna true se un pezzo finisce sulle caselle minacciate da un pedone, altrimenti false
function minaccePedone(piece, casellaSelezionata, colore) { 
    let b = false;
    let casel = piece[1].slice(0, 1)
    let n = alfabeto.indexOf(casel);
    if(colore == "B") {
        if(parseInt(piece[1].slice(1)) - 1 == parseInt(casellaSelezionata.id.slice(1))){
            let d = n + 1;
            let s = n - 1;
            if(d <= 7 || s >= 0) {
                if(casellaSelezionata.id.slice(0, 1) == alfabeto[d] || 
                casellaSelezionata.id.slice(0, 1) == alfabeto[s]) {
                    b = true;
                }
            }
        } 
    } else {
        if(parseInt(piece[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1))){
            let d = n + 1;
            let s = n - 1;
            if(d <= 7 || s >= 0) {
                if(casellaSelezionata.id.slice(0, 1) == alfabeto[d] || 
                casellaSelezionata.id.slice(0, 1) == alfabeto[s]) {
                    b = true;
                }
            }
        }
    }
    return b;
}

//esegue la mossa
function eseguiMossa(newPiece, last) {
    newPiece.innerHTML = last.innerHTML;
    last.innerHTML = "";
    last.innerHTML = "";
    click = 0;
    t++;
}

function colorePezzo(pezzo) { // ritorna il colore del pezzo selezionato
    let colore = "nullo";
    for(let pez of mapPezziBianchi.values()) {
        if(pezzo.id == pez) {
            colore = "B";
        }
    }
    for(let pez of mapPezziNeri.values()) {
        if(pezzo.id == pez) {
            colore = "N";
        }
    }
    return colore;
}

function nonPuoiMangiareTuoiAmici(casellaSelezionata, piece) {
    let b = false;
    if(((colorePezzo(casellaSelezionata) == "N" && colorePezzo(piece) == "B") ||
    (colorePezzo(casellaSelezionata) == "B" && colorePezzo(piece) == "N")) ||
    colorePezzo(casellaSelezionata) == "nullo") b = true;
    return b;
}

function searchPezzo(pezzo, tipo) { // controlla se un è presente un pezzo in una determinata posizione all'interno delle mappe
    let b = false; 
    switch (tipo) {
        case "all":
            for(let pez of mapPezziBianchi) {
                if(pez[1] == pezzo.id) {
                    b = true;
                }
            }
            for(let pez of mapPezziNeri) {
                if(pez[1] == pezzo.id) {
                    b = true
                }
            }
        break;
        case "N":
            for(let pez of mapPezziNeri) {
                if(pez[1] == pezzo.id) {
                    b = true
                }
            }
        break;
        case "B":
            for(let pez of mapPezziBianchi) {
                if(pez[1] == pezzo.id) {
                    b = true;
                }
            }
        break;
    }
    return b;
}

function searchPezzoBiancoPassato(lastPezzo, colore) {
    let pieceType;
    if(colore == "B") {
        for (let pez of mapPezziBianchi) {
            if(lastPezzo.id == pez[1]) {
                pieceType = pez;
            }
        }
    }
    else {
        for(let pez of mapPezziNeri) {
            if(lastPezzo.id == pez[1]) {
                pieceType = pez;
            }
        }
    }
    return pieceType;
}

function changePieceId(evento, colore, lastId) { //cambia la posizione del pezzo nella mappa
    let newPezzoK;
    let newPezzoV;
    if(colore == "B") { // bianchi
        for(let pezzo of mapPezziBianchi) {
            try {
                if(lastId == pezzo[1]) {
                    newPezzoV = evento.srcElement.childNodes[1].id;
                    newPezzoK = pezzo[0];
                }
                if(searchPezzo(evento.srcElement.childNodes[1], "N")) {
                    for(let pez of mapPezziNeri) {
                        if(pez[1] == evento.srcElement.childNodes[1].id) {
                            mapPezziNeri.delete(pez[0])
                        }
                    }
                }
            } catch (error) {}
            try {
                if(lastId == pezzo[1] && evento.srcElement.id != "") {
                    newPezzoV = evento.srcElement.id;
                    newPezzoK = pezzo[0];
                }
                if(searchPezzo(evento.srcElement, "N")) {
                    for(let pez of mapPezziNeri) {
                        if(pez[1] == evento.srcElement.id) {
                            mapPezziNeri.delete(pez[0])
                        }
                    }
                }
            } catch (error) {}
        }
        mapPezziBianchi.set(newPezzoK, newPezzoV);
    } else { // neri
        for(let pezzo of mapPezziNeri) {
            try {
                if(lastId == pezzo[1]) {
                    newPezzoV = evento.srcElement.childNodes[1].id;
                    newPezzoK = pezzo[0];
                }
                if(searchPezzo(evento.srcElement.childNodes[1], "B")) {
                    for(let pez of mapPezziBianchi) {
                        if(pez[1] == evento.srcElement.childNodes[1].id) {
                            mapPezziBianchi.delete(pez[0])
                        }
                    }
                }
            } catch (error) {}
            try {
                if(lastId == pezzo[1] && evento.srcElement.id != "") {
                    newPezzoV = evento.srcElement.id;
                    newPezzoK = pezzo[0];
                }
                if(searchPezzo(evento.srcElement, "B")) {
                    for(let pez of mapPezziBianchi) {
                        if(pez[1] == evento.srcElement.id) {
                            mapPezziBianchi.delete(pez[0])
                        }
                    }
                }
            } catch (error) {}
        }
        mapPezziNeri.set(newPezzoK, newPezzoV);
    }
}

function turno(t) {
    let aChiSta;
    if(t === 0 || t % 2 == 0) {
        aChiSta = "B";
    } else {
        aChiSta = "N";
    }
    return aChiSta;
}

function init() {
    moove();
}

start();
init();