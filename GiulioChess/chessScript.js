let mapPezziBianchi = new Map([
    ["torreB1", "a1"],
    ["torreB2", "h1"],
    ["cavalloB1", "b1"],
    ["cavalloB2", "g1"],
    ["alfiereB1", "c1"],
    ["alfiereB2", "f1"],
    ["donnaB", "d1"],  
    ["reB", "e1"],
    ["pB1", "a2"],
    ["pB2", "b2"],
    ["pB3", "c2"],
    ["pB4", "d2"],
    ["pB5", "e2"],
    ["pB6", "f2"],
    ["pB7", "g2"],
    ["pB8", "h2"]
]);

let mapPezziNeri = new Map([
    ["torreN1", "a8"],
    ["torreN2", "h8"],
    ["cavalloN1", "b8"],
    ["cavalloN2", "g8"],
    ["alfiereN1", "c8"],
    ["alfiereN2", "f8"],
    ["donnaN", "d8"],
    ["reN", "e8"],
    ["pN1", "a7"],
    ["pN2", "b7"],
    ["pN3", "c7"],
    ["pN4", "d7"],
    ["pN5", "e7"],
    ["pN6", "f7"],
    ["pN7", "g7"],
    ["pN8", "h7"]
]);

let mapPezzi = new Map([
   ["B", mapPezziBianchi],
   ["N", mapPezziNeri] 
]);

let alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h"];

function start() { // disegno i pezzi

    //neri
    document.getElementById(mapPezzi.get("N").get("torreN2")).innerHTML = "&#x265C;";
    document.getElementById(mapPezzi.get("N").get("cavalloN1")).innerHTML = "&#x265E;";
    document.getElementById(mapPezzi.get("N").get("cavalloN2")).innerHTML = "&#x265E;";
    document.getElementById(mapPezzi.get("N").get("torreN1")).innerHTML = "&#x265C;";
    document.getElementById(mapPezzi.get("N").get("alfiereN1")).innerHTML = "&#x265D;";
    document.getElementById(mapPezzi.get("N").get("alfiereN2")).innerHTML = "&#x265D;";
    document.getElementById(mapPezzi.get("N").get("donnaN")).innerHTML = "&#x265B;";
    document.getElementById(mapPezzi.get("N").get("reN")).innerHTML = "&#x265A;";
    document.getElementById(mapPezzi.get("N").get("pN1")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN2")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN3")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN4")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN5")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN6")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN7")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("N").get("pN8")).innerHTML = "&#x265F;";

    //bianchi
    document.getElementById(mapPezzi.get("B").get("torreB1")).innerHTML = "&#x2656;";
    document.getElementById(mapPezzi.get("B").get("torreB2")).innerHTML = "&#x2656;";
    document.getElementById(mapPezzi.get("B").get("cavalloB1")).innerHTML = "&#x2658;";
    document.getElementById(mapPezzi.get("B").get("cavalloB2")).innerHTML = "&#x2658;";
    document.getElementById(mapPezzi.get("B").get("alfiereB1")).innerHTML = "&#x2657;";
    document.getElementById(mapPezzi.get("B").get("alfiereB2")).innerHTML = "&#x2657;";
    document.getElementById(mapPezzi.get("B").get("donnaB")).innerHTML = "&#x2655;";
    document.getElementById(mapPezzi.get("B").get("reB")).innerHTML = "&#x2654;";
    document.getElementById(mapPezzi.get("B").get("pB1")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB2")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB3")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB4")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB5")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB6")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB7")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("B").get("pB8")).innerHTML = "&#x2659;";
}
