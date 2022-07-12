let selectAll = document.querySelectorAll('.casella');
let nuovoPezzo = document.querySelectorAll('.pezzo');
let last;

function moove(){
    let click = 0;
    for(let i = 0; i < selectAll.length; i++){
        selectAll[i].addEventListener('click', function selectPiece(){
            if (click >= 1 && nuovoPezzo[i].innerHTML == "") {
                console.log(nuovoPezzo[i])
                nuovoPezzo[i].innerHTML = last.innerHTML;
                last.innerHTML = "";
                last.innerHTML = "";
                click = 0;
            } else {
                last = nuovoPezzo[i];
                click++
            }
        });
    }
}

function init() {
    moove();
}

start();

init();