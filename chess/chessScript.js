let mapPezzi = new Map([
    ["torreB1", "a1"],    ["torreN1", "a8"],
    ["torreB2", "h1"],    ["torreN2", "h8"],
    ["cavalloB1", "b1"],  ["cavalloN1", "b8"],
    ["cavalloB2", "g1"],  ["cavalloN2", "g8"],
    ["alfiereB1", "c1"],  ["alfiereN1", "c8"],
    ["alfiereB2", "f1"],  ["alfiereN2", "f8"],
    ["donnaB", "d1"],     ["donnaN", "d8"],
    ["reB", "e1"],        ["reN", "e8"],
    ["pB1", "a2"],        ["pN1", "a7"],
    ["pB2", "b2"],        ["pN2", "b7"],
    ["pB3", "c2"],        ["pN3", "c7"],
    ["pB4", "d2"],        ["pN4", "d7"],
    ["pB5", "e2"],        ["pN5", "e7"],
    ["pB6", "f2"],        ["pN6", "f7"],
    ["pB7", "g2"],        ["pN7", "g7"],
    ["pB8", "h2"],        ["pN8", "h7"]
]);

function start() { // disegno i pezzi

    //neri
    document.getElementById(mapPezzi.get("torreN2")).innerHTML = "&#x265C;";
    document.getElementById(mapPezzi.get("cavalloN1")).innerHTML = "&#x265E;";
    document.getElementById(mapPezzi.get("cavalloN2")).innerHTML = "&#x265E;";
    document.getElementById(mapPezzi.get("torreN1")).innerHTML = "&#x265C;";
    document.getElementById(mapPezzi.get("alfiereN1")).innerHTML = "&#x265D;";
    document.getElementById(mapPezzi.get("alfiereN2")).innerHTML = "&#x265D;";
    document.getElementById(mapPezzi.get("donnaN")).innerHTML = "&#x265B;";
    document.getElementById(mapPezzi.get("reN")).innerHTML = "&#x265A;";
    document.getElementById(mapPezzi.get("pN1")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN2")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN3")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN4")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN5")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN6")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN7")).innerHTML = "&#x265F;";
    document.getElementById(mapPezzi.get("pN8")).innerHTML = "&#x265F;";

    //bianchi
    document.getElementById(mapPezzi.get("torreB1")).innerHTML = "&#x2656;";
    document.getElementById(mapPezzi.get("torreB2")).innerHTML = "&#x2656;";
    document.getElementById(mapPezzi.get("cavalloB1")).innerHTML = "&#x2658;";
    document.getElementById(mapPezzi.get("cavalloB2")).innerHTML = "&#x2658;";
    document.getElementById(mapPezzi.get("alfiereB1")).innerHTML = "&#x2657;";
    document.getElementById(mapPezzi.get("alfiereB2")).innerHTML = "&#x2657;";
    document.getElementById(mapPezzi.get("donnaB")).innerHTML = "&#x2655;";
    document.getElementById(mapPezzi.get("reB")).innerHTML = "&#x2654;";
    document.getElementById(mapPezzi.get("pB1")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB2")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB3")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB4")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB5")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB6")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB7")).innerHTML = "&#x2659;";
    document.getElementById(mapPezzi.get("pB8")).innerHTML = "&#x2659;";
}
