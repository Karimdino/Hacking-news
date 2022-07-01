/* * * * * * * * * * * * * * * * * * * * * * *
 * Allgemein
 * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Die globale Variable "what" notiert, welche Menüinhalt 
 * zuletzt abgerufen wurde, damit beim Suchen, der Suchbegriff 
 * im selben Content durchgeführt und aktualisiert wird.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let what = 0;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Die Einträge werden beim Einfügen auf die Seite mit
 * einem Zähler durchnummieriert
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let counter = 0;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Dieser Array erhält die Menge der geladenen Einträge und
 * wird für den Seitenwechsel verwendet
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let entries = [];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Sobald ein Menüpunkt angeklickt wird, so werden die 
 * möglichen Formatierungen aller Menüpunkte zurückgesetzt und
 * die Formatierung der aktuellen Menüpunkt festgesetzt, sodass
 * jederzeit bekannt ist, auf welchem Content man sich gerade
 * befindet.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function switch_menu_item( id )
{
    // Setzt den Zähler wieder auf 0
    counter = 0;
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Den Inhalt wird erstmal ausgeblendet
    if ( main )
        main.style.display = "none";
    // Der Loader wird verbunden
    const loader = document.querySelector("#loader");
    // Der Loader wird eingeblendet
    if ( loader )
        loader.style.display = "block";
    // *** //
    const menuNEW = document.getElementById("new");
    const menuPAST = document.getElementById("past");
    const menuCOMMENT = document.getElementById("comment");
    const menuASK = document.getElementById("ask");

    const menuCURRENT = document.getElementById(id);

    if ( menuNEW && menuPAST && menuCOMMENT && menuASK )
    {

        menuNEW.style.backgroundColor = "";
        menuNEW.style.color = "";

        menuPAST.style.backgroundColor = "";
        menuPAST.style.color = "";

        menuCOMMENT.style.backgroundColor = "";
        menuCOMMENT.style.color = "";

        menuASK.style.backgroundColor = "";
        menuASK.style.color = "";

    }

    if ( menuCURRENT )
    {

        menuCURRENT.style.backgroundColor = "rgba(23, 23, 23, 0.9)";
        menuCURRENT.style.color = "#ffffff";

    }

}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Rene
 * * * * * * * * * * * * * * * * * * * * * * */

// Ladet den Inhalt von "NEW"

function menu_new(filter = "")
{
    // Markieren den Tab "NEW"
    what = 1;
    // *** //
    switch_menu_item("new");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=story" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
                // *** //
                initPagination();
          }
    );
}

// Ladet den Inhalt von "PAST"

function menu_past(filter = "")
{
    // Markieren den Tab "PAST"
    what = 2;
    // *** //
    switch_menu_item("past");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=front_page" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
                // *** //
                initPagination();
          }
    );
}

// Ladet den Inhalt von "COMMENT"

function menu_comment(filter = "")
{
    // Markieren den Tab "COMMENT"
    what = 3;
    // *** //
    switch_menu_item("comment");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search?query=bar&tags=comment" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType2( peace );
                // *** //
                initPagination();
          }
    );
}

// Ladet den Inhalt von "ASK"

function menu_ask(filter = "")
{
    // Markieren den Tab "ASK"
    what = 4;
    // *** //
    switch_menu_item("ask");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=ask_hn" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
                // *** //
                initPagination();
          }
    );
}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Karim
 * * * * * * * * * * * * * * * * * * * * * * */

// Diese Funktion wird beim Drücken der Entertaste
// im Suchfeld und beim Klicken auf den "Find" 
// Button ausgeführt, ladet denselben Inhalt
// nach dem Suchbegriff gefiltert.

function filterResult( event )
{

    // Der eingegegebene Wert wird in die Variable
    // "filter" ausgelesen
    let filter = "&query=" + event.target.value;

    // Je nach dem im welchem Menüpunkt wir 
    // uns befinden, wir rufen den betroffenen
    // Menüfunktion erneut auf und übergeben ihm
    // den Suchbegriff, um den Inhalt entsprechend
    // zu filtern.
    switch ( what )
    {
        case 1: menu_new( filter ); break;
        case 2: menu_past( filter ); break;
        case 3: menu_comment( filter ); break;
        case 4: menu_ask( filter ); break;
    }

    // Der Inhalt des Eingabefelds wird geleert
    event.target.value = "";

}

// Diese Funktion schließt das Dialogfenster

function closeExternalSite ()
{
    const popupbox = document.querySelector(".external");
    const button = document.querySelector(".external #exbutton");
    // *** //
    if ( popupbox && button )
        popupbox.style.display = "none";
}

// Diese Funktion ladet das Dialogfenster mit einem Inhalt

function popupExternalSite ( key )
{
    const popupbox = document.querySelector(".external");
    const title = document.querySelector(".external #extitle");
    const content = document.querySelector(".external #excontent");
    // *** //
    if ( popupbox && title && content )
    {
        let url = ""; let typeOfContent = 0;
        // *** //
        switch ( key )
        {
            case 'guidelines':
                title.innerText = "Welcome to our GuideLines";
                url = "https://news.ycombinator.com/newsguidelines.html";
                break;
            case 'faq':
                title.innerText = "Frequently Asked Questions";
                url = "https://news.ycombinator.com/newsfaq.html";
                break;
            case 'lists':
                title.innerText = "Some Lists :-)";
                url = "https://news.ycombinator.com/lists";
                break;
            case 'api':
                title.innerText = "The Application Programming Interface";
                url = "https://github.com/HackerNews/API";
                break;
            case 'security':
                title.innerText = "Some Information About Security Issues";
                url = "https://news.ycombinator.com/security.html";
                break;
            case 'legal':
                title.innerText = "Legal Information";
                url = "http://www.ycombinator.com/legal/";
                break;
            case 'applytoyc':
                title.innerText = "Apply To YC";
                url = "http://www.ycombinator.com/apply/";
                break;
            case 'contact':
                title.innerText = "You wanna contact us?";
                typeOfContent = 1;
                break;
        }
        // *** //
        switch ( typeOfContent )
        {
            case 0:
                content.innerHTML = `<iframe src="${url}" height="400" width="100%"></iframe>`;
                break;
            case 1:
                content.innerHTML = "<div style='text-align:center;margin-top:100px;color:red;'>We are currently unavailable :-) Sorry</div>";
                break;
        }
        // *** //
        popupbox.style.display = "block";
    }
}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Abdülaziz
 * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt für das erste Verwenden beim Laden einer Content
 * die Seitennavigation und blendet entsprechend Elemente aus
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function initPagination ()
{
    let pages = 0; let pager = 0;
    // *** //
    entries = [];
    // *** //
    entries.push( [] );
    // *** //
    for ( let next = 1; next < counter + 1; next++ )
    {
        let entry = document.getElementById(`entry_${next}`);
        // *** //
        if ( entry )
        {
            entries[pages].push(entry);
            // *** //
            if ( next < 10 )
                entry.style.display = "block";
            else
                entry.style.display = "none";
            // *** //
            pager++;
            // *** //
            if (pager == 10 )
            {
                pages++;
                pager = 0;
                entries.push( [] );
            }
        }
    }
    // *** //
    const pagination = document.getElementById(`pagination`);
    // *** //
    if ( pagination )
    {
        pagination.innerHTML = "";
        // *** //
        if ( pages === 0 )
            pagination.style.display = "none";
        else
        {
            pagination.style.display = "block";
            // *** //
            for ( let next = 0; next < pages; next++ )
                pagination.innerHTML += `<button onclick = "nextPage(${next})">${next + 1}</button>`;
        }
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Blendet die vorherige Liste aus und blendet die nächste
 * Seite ein
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function nextPage( paginationNumber )
{
    for ( let next = 0; next < entries[paginationNumber].length; next++ )
    {
        if ( paginationNumber > 0 )
        {
            let entryOld = entries[paginationNumber - 1][next];
            // *** //
            if ( entryOld )
                entryOld.style.display = "none";
        }
        // *** //
        let entryNew = entries[paginationNumber][next];
        // *** //
        if ( entryNew )
            entryNew.style.display = "block";
    }
    // *** //
    window.scrollTo(0,0);
}

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
 * Gibt einen HTMl-Coe zurück wenn es einen Story gibt
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function giveStory( story_id, story_text, story_title, story_url )
{
    if ( story_id != null && story_title != null && story_text != null )
    {
        let url = "";
        // *** //
        if ( story_url != null )
            url = `<a href="${story_url}" target = "_blank">Weiter lesen...</a>`;
        // *** //
        return '<div class = "layout_5">' +
        `<h1>${story_title}</h1>` +
        `${story_text}` +
        `<hr>` +
        `<div class = "alignright">` +
        `StoryId: ${story_id}` +
        `  |  ${url}` +
        `</div>` +
        '</div>';
    }
    else return "";
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ1 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType1( { url, author, created_at, title, num_comments, comment_text, points, story_id, story_text, story_title, story_url } )
{
    let kommentar = ""; let kommentartyp = null; let punktetyp = null; let a1 = ""; let a2 = "";
    // *** //
    if ( num_comments > 0 )
    {
        kommentartyp = "comment1";
        // *** //
        if ( comment_text === null )
        {
            kommentar =
            '<div class = "layout_4">' +
            `<i>Das Kommentarfeld ist leer</i>` +
            '</div>';
        }
        else
        {
            kommentar =
            '<div class = "layout_4">' +
            `${comment_text}` +
            '</div>';    
        }
    }
    else kommentartyp = "comment2";
    // *** //
    if ( points > 0 )
        punktetyp = "comment1";
    else
        punktetyp = "comment2";
    // *** //
    if ( url != null )
    {
        a1 = `<a href="${url}" target = "_blank">`;
        a2 = '</a>';
    }
    // *** //
    let story = giveStory( story_id, story_text, story_title, story_url );
    // *** //
    counter++;
    // *** //
    streamIn( `<div id = "entry_${counter}">` + a1 +
            `<div class = "layout_1"><div class = "counter">${counter}</div>` +
            `<div class = "author"><b>von</b> ${author}</div>`  +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>`  +
            '</div>'  +
            '<div class = "layout_2">'  +
            `<div class = "headline">${title}</div>` +
            story +
            `<span class = "${kommentartyp}">Kommentare: ${num_comments}</span> | <span class="${punktetyp}">Aufrufe: ${points}</span>` +
            kommentar +
            `</div>` +
            a2 + '</div>' );
    // Der Loader wird verbunden
    const loader = document.querySelector("#loader");
    // Der Loader wird ausgeblendet
    if ( loader )
        loader.style.display = "none";
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Den Inhalt wird angezeigt
    if ( main )
        main.style.display = "block";
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ2 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType2( { url, author, created_at, comment_text, story_id, story_text, story_title, story_url } )
{
    let a1 = ""; let a2 = "";
    // *** //
    let story = giveStory( story_id, story_text, story_title, story_url );
    // *** //
    if ( url != null )
    {
        a1 = `<a href="${url}" target = "_blank">`;
        a2 = '</a>';
    }
    // *** //
    counter++;
    // *** //
    streamIn( `<div id = "entry_${counter}">` + a1 +
            `<div class = "layout_1"><div class = "counter">${counter}</div>` +
            `<div class = "author"><b>von</b> ${author}</div>` +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>` +
            '</div>' +
            story +
            '<div class = "layout_3">' +
            `${comment_text}` +
            '</div>' +
            a2 + '</div>' );
    // Der Loader wird verbunden
    const loader = document.querySelector("#loader");
    // Der Loader wird ausgeblendet
    if ( loader )
        loader.style.display = "none";
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Den Inhalt wird angezeigt
    if ( main )
        main.style.display = "block";
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Macht den Inhalt vom MAIN-Tag vollständig leeren, damit ein
 * neuer Inhalt in den MAIN-Tag geladen werden kann und holt 
 * das JSON-Objekt von einer URL ab und leitet es an eine
 * Callback-Funktion weiter.
 * url -> Die Webseite von dem was ausgelesen wird
 * cbk -> Ist die Callbackfunktion die das Ergebnis erhält
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

