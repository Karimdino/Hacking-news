/* * * * * * * * * * * * * * * * * * * * * * *
 * Allgemein
 * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * *
 * Rene
 * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * *
 * Karim
 * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * *
 * Abdülaziz
 * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Die globale Variable "what" notiert, welche Menüinhalt 
 * zuletzt abgerufen wurde, damit beim Suchen, der Suchbegriff 
 * im selben Content durchgeführt und aktualisiert wird.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let what = 0;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Fügt einen neuen Eintrag in den MAIN-Tag unter BODY-Tag
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function streamIn( value )
{
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Den Inhalt um einen weiteren Eintrag erweitern
    if ( main )
        main.innerHTML += '<div class = "resitem">' + value + '</div>';
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ1 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType1( { url, author, created_at, title } )
{
    streamIn( `<a href="${url}" target = "_blank">`  +
            '<div class = "layout_1">'  +
            `<div class = "author"><b>Von</b> ${author}</div>`  +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>`  +
            '</div>'  +
            '<div class = "layout_2">'  +
            `<div class = "headline">${title}</div>` +
            '</div>' +
            '</a>' );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ2 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType2( { url, author, created_at, comment_text } )
{
    streamIn( `<a href="${url}" target = "_blank">` +
            '<div class = "layout_1">' +
            `<div class = "author"><b>Von</b> ${author}</div>` +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>` +
            '</div>' +
            '<div class = "layout_3">' +
            `${comment_text}` +
            '</div>' +
            '</a>' );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Macht den Inhalt vom MAIN-Tag vollständig leeren, damit ein
 * neuer Inhalt in den MAIN-Tag geladen werden kann und holt 
 * das JSON-Objekt von einer URL ab und leitet es an eine
 * Callback-Funktion weiter.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function grap(url, cbk)
{
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Inhalt des Elements leeren
    if ( main )
        main.innerHTML = "";
    // Anfrage an die URL wenden...
    fetch(url).then(res => 
            // Die Antwort in ein JSON umwandeln und an Funktion weiterreichen
            res.json()).then((out) => 
                    // Beim Erfolg, Callback-Funktion aurufen
                    cbk(out)).catch(err => 
                            // Andernfalls Fehler auf der Konsole ausgeben
                            console.error(err));
}

