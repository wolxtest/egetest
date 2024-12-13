const soruListesi = [
    new Soru("1-Hangisi sıvıların ölçüm birimidir", { a: "Kilogram", b: "Litre", c: "Santimetre", d: "Metre"}, "b"),
    new Soru("2-Hangi mevsimde kar yağar?", { a: "Yaz", b: "Sonbahar", c: "İlkbahar", d: "Kış" }, "d"),
    new Soru("3-Bir haftada kaç gün vardır?", { a: "7", b: "5", c: "3", d: "1" }, "a"),
    new Soru("4-Türkiye'nin başkenti neresidir?", { a: "İstanbul", b: "Ankara", c: "İzmir", d: "Antalya" }, "b"),
    new Soru("5-Aşağıdakilerden hangisi Pınar'ın lakabıdır?", { a: "Büşto", b: "Kaya Kadın", c: "Pamuk Anne", d: "Demir Leydi Seda" }, "d"),
    new Soru("6-Bir hayvan türü olup uçamayan kuş hangisidir?", { a: "Penguen", b: "Karga", c: "Serçe", d: "Güvercin" }, "a"),
    new Soru("7-Süt hangi hayvandan elde edilir?", { a: "Koyun", b: "Tavuk", c: "İnek", d: "Balık" }, "c"),
    new Soru("8-Atatürk’ün doğum yeri neresidir?", { a: "İstanbul", b: "Selanik", c: "Ankara", d: "İzmir" }, "b"),
    new Soru("9-Bir yıl kaç aydan oluşur?", { a: "10", b: "11", c: "12", d: "13" }, "c"),
    new Soru("10-Kırmızı ışık yandığında trafikte ne yapmalıyız?", { a: "Durmalıyız", b: "Geçmeliyiz", c: "Zıplamalıyız", d: "Yavaşlamalıyız" }, "a")
    
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function(){
    startTimer(10);
    startTimerLine();
    ui.btnNext.classList.remove("show");
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length);
});

ui.btnNext.addEventListener("click", function() {
    if(quiz.sorular.length != quiz.soruIndex) {
        ui.btnNext.classList.remove("show");
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length);
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }

});

function optionSelected(e){
clearInterval(counter);
clearInterval(counterLine);
ui.btnNext.classList.add("show");
let selectedElement = e.target;

if(selectedElement.nodeName == "SPAN"){
    selectedElement = selectedElement.parentElement;
}

const cevap = e.target.textContent[0];
const soru = quiz.soruGetir();
if (soru.cevabiKontrolEt(cevap)){
    quiz.dogruCevapSayisi +=1;
    selectedElement.classList.add("correct");
    selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);

}else{
    selectedElement.classList.add("incorrect");
    selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);

}
quiz.soruIndex += 1;
ui.disableAllOption();
}

ui.btnQuit.addEventListener("click", function(){
window.location.reload();
});
ui.btnReplay.addEventListener("click", function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    //start buton
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");

});
let counter;
function startTimer(time){
    counter = setInterval(timer,1000);

    function timer(){
        ui.timeSecond.textContent = time;
        time--;

        if(time<0){
            clearInterval(counter)
            ui.timeText.textContent = "Süre Bitti"
            ui.disableAllOption();
            quiz.soruIndex += 1;
            ui.btnNext.classList.add("show");
        }
    }


}
let counterLine;
function startTimerLine(){
    let line_width=0;

    counterLine = setInterval(timer,20);

    function timer(){
        line_width +=1;
        ui.timeLine.style.width = line_width +"px";

        if(line_width>549){
            clearInterval(counterLine);
        }
    }
}



