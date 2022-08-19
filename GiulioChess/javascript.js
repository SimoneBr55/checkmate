let selectAll = document.querySelectorAll('.casella');
let nuovoPezzo = document.querySelectorAll('.pezzo');
let last;

function moove() {
    let lastCasella;
    let lastId;
    let aChiSta;
    let t = 0;
    let click = 0;
    for(let i = 0; i < selectAll.length; i++){
        selectAll[i].addEventListener('click', function selectPiece(){
            if(click == 0) aChiSta = turno(t);
            if (aChiSta == "B") { //turno del bianco
                if (click >= 1) {
                    isLegalMove(nuovoPezzo[i], last);
                    console.log(nuovoPezzo[i])
                    nuovoPezzo[i].innerHTML = last.innerHTML;
                    last.innerHTML = "";
                    last.innerHTML = "";
                    click = 0;
                    t++;
                    changePieceId(event, "B", lastId, lastCasella);
                } else {    //seleziona il pezzo bianco
                    for (let pez of mapPezziBianchi.values()) {
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
            } else { // turno del nero
                if (click >= 1) {
                    console.log(nuovoPezzo[i])
                    nuovoPezzo[i].innerHTML = last.innerHTML;
                    last.innerHTML = "";
                    last.innerHTML = "";
                    click = 0;
                    t++;
                    changePieceId(event, "N", lastId, lastCasella);
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

function isLegalMove(casellaSelezionata, lastPezzo) {
    let piece = searchPezzoBiancoPassato(lastPezzo);
    let b = false;

    switch(piece[0].slice(0, 1)){
        case "p":
            if((parseInt(piece[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1)) || 
            parseInt(piece[1].slice(1)) + 2 == parseInt(casellaSelezionata.id.slice(1))) &&
            searchPezzo(casellaSelezionata) == false) {
                if(parseInt(piece[1].slice(1)) + 1 == parseInt(casellaSelezionata.id.slice(1))) {
                    if(alfabeto.find(piece[0].slice(0, 1))) {
                        
                    }
                }
            }
        break;
    }
}

function searchPezzo(pezzo) {
    let b = false

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
    return b;
}

function searchPezzoBiancoPassato(lastPezzo) {
    let pieceType;
    for (let pez of mapPezziBianchi) {
        if(lastPezzo.id == pez[1]) {
            pieceType = pez;
        }
    }
    return pieceType;
}

function changePieceId(evento, colore, lastId, lastCasella) { //cambia la posizione del pezzo nella mappa 
    let newPezzoK;
    let newPezzoV;
    if(colore == "B") { // bianchi
        for(let pezzo of mapPezziBianchi) {
            try {
                if(lastId == pezzo[1]) {
                    newPezzoV = evento.srcElement.childNodes[1].id;
                    newPezzoK = pezzo[0];
                }
            } catch (error) {}
            try {
                if(lastId == pezzo[1] && evento.srcElement.id != "") {
                    newPezzoV = evento.srcElement.id;
                    newPezzoK = pezzo[0];
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
            } catch (error) {}
            try {
                if(lastId == pezzo[1] && evento.srcElement.id != "") {
                    newPezzoV = evento.srcElement.id;
                    newPezzoK = pezzo[0];
                }
            } catch (error) {}
        }
        mapPezziNeri.set(newPezzoK, newPezzoV);
    }
        lastCasella.className = lastCasella.className.slice(0,14);
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