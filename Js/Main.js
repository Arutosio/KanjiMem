// NON FUNZIONA import UtilityClass from "https://arutosio.com/Js/UtilityClass.js";
import IndexManager from "./IndexManager.js";
import UtilityClass from "./UtilityClass.js";
import HtmlBuilder from "./HtmlBuilder.js";
import Kanji from "./Kanji.js";

// Variabili di Istanze
var htmlBuilder;
var kanji;

// Var Notifications
var toastLiveNotificationContainer;
var toastLiveNotification;
var toastLiveNotificationTitle;
var toastLiveNotificationMSG;

var kanjiFileNames = ["Kanji_chikamichi_1", "Kanji_Number_Hiragana_pronunce", "Kanji_Numeri", "Kanji_NumeriOver", "Kanji_Prova", "testKanjiSoloKunYomi", "testKanjiSoloOnYomi"]

document.addEventListener('DOMContentLoaded', async function(event) {
    htmlBuilder = new HtmlBuilder("../Views");
    kanji = new Kanji(htmlBuilder, ShowToast);

    await StartUp();
    await kanji.Run();
});

//CREAZIONE DI TUTTO IL CONTENUTO HTML
async function StartUp() {
    kanji.kanjiListJson = await UtilityClass.GetJsonFilesFromFolder("Kanji_Json", kanjiFileNames);
    let htmlSectionsKanji = await htmlBuilder.CreateSectionKanjiView(kanji.kanjiListJson);
    IndexManager.ReplaceHtmlContent("sKanji", htmlSectionsKanji);

    let htmlFooter = await htmlBuilder.CreateFooterViewById("iFooter");
    IndexManager.ReplaceHtmlContent("iFooter", htmlFooter);

    // NotificationCenter
    toastLiveNotificationContainer = document.querySelector('#toastLiveNotificationContainer');
    toastLiveNotification = toastLiveNotificationContainer.querySelector('#toastLiveNotification');
    toastLiveNotificationTitle = toastLiveNotification.querySelector('#toastLiveNotificationTitle');
    toastLiveNotificationMSG = toastLiveNotificationContainer.querySelector('#toastLiveNotificationMSG');
}

//Funzione per mostrare il toast automaticamente
function ShowToast(title, msg) {
    if(title) {
        toastLiveNotificationTitle.textContent = title;
    }
    if(msg) {
        toastLiveNotificationMSG.textContent = msg;
    }
    toastLiveNotification.classList.add('show'); // Apri il toast
    const toast = new bootstrap.Toast(toastLiveNotification);
    toast.show();
}