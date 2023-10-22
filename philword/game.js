var mas2 = [
   ["Кто изображен на фотографии? А", "аристотель"],
   ["Кто изображен на фотографии? Д", "демокрит"],
   ["Кто изображен на фотографии? Г", "гераклит"],
   ["Кто изображен на фотографии? П", "платон"],
    ["Кто изображен на фотографии? С", "сократ"],
    ["Как меня зовут?", "максим"],
    ]
var score, current, question, answer;
var alph = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ","ф","ы","в","а","п","р","о","л","д","ж","э","я","ч","с","м","и","т","ь","б","ю"]
var ar = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ","ф","ы","в","а","п","р","о","л","д","ж","э","я","ч","с","м","и","т","ь","б","ю"]
var end = false;

function arrayDoubRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand][1];
}
function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand][0];
}

function selectPhoto () {
    let photo = arrayDoubRandElement(mas2)
    answer = photo
    let x;
    for (let i=0; i < mas2.length; i++){
        if(mas2[i][1] == answer){
            x = i
        }
    }
    question = mas2[x][0]
    mas2.splice(x,1)
}

function GenerateQuestion () {
    document.getElementById("question").innerText =  question;
}

function GenerateImg () {
    if (answer != "максим"){
        let widthDiv = 200
        let Image = "/Img/"+answer+".jpg"
        let item = $("<div></div>")
        item.addClass("elementImg")
        item.attr('id', 'elementImg')
        item.css("height", widthDiv+"px")
        item.css("width", widthDiv+"px")
        item.css("background-image", 'url('+Image+')')
        item.css("background-size", ' contain')
        item.css("background-repeat",' no-repeat')
        
        $("#mainImage").append(item);
    }
}

function GenerateStr () {
    let widthDiv = 15
    for (let i=0; i < answer.length; i++){
        let item = $("<input>")
        item.addClass("elementStr"+i)
        item.attr('id', 'elementStr'+i)
        item.css("width", widthDiv+"px")
        $("#answ").append(item);
    }
}

function GenerateKeyboard () {
    let widthDiv = 20
    let key = $("<div></div>")
    key.addClass("key")
    key.attr('id', 'key')
    $("#keyboard").append(key);
    for (let i=0; i < alph.length; i++){
        let item = $("<input>")
        let item2 = $("<br>")
        item.addClass("elementKey"+alph[i])
        item.attr('id', 'elementKey'+alph[i])
        item.attr('type', 'button')
        item.attr('value', alph[i])
        item.attr('onclick', `defin("${alph[i]}")`)
        item.css("width", widthDiv+"px")
        if (alph[i] == "ъ" || alph[i] == "э"){
            $("#key").append(item2)
        }
        $("#key").append(item);
    }
}

function GenerateScore () {
    document.getElementById("score").innerText = "Счет: Всего - " + score + ".   Текущий - " + current;
}

function defin(letter) {
    let tru = false
    for (let i=0; i < answer.length; i++){
        if (answer[i] == letter){
            $("#elementStr"+i).attr('value', letter);
            tru = true
        }
    }
    if (tru){
        $("#elementKey"+letter).css("background", "#73A353");
    }else{
        if (current > 0){
            current -= 10
        }
        document.getElementById("score").textContent = "Счет: Всего - " + score + ".   Текущий - " + current;
        $("#elementKey"+letter).css("background", "red");
    }
}

function removePhoto() {
    let element = document.getElementsByClassName("elementImg");
    while(element.length) {
        element[0].parentNode.removeChild(element[0]);
    }
    for (let i=0; i < answer.length; i++){
        let element2 = document.getElementsByClassName("elementStr"+i);
        while(element2.length) {
            element2[0].parentNode.removeChild(element2[0]);
        }
    }
}

function removeKeyboard() {
    let element = document.getElementsByClassName("key");
    while(element.length) {
        element[0].parentNode.removeChild(element[0]);
    }
}

function right () {
   
    score += current
    current = 100
    document.getElementById("score").textContent = "Счет: Всего - " + score + ".   Текущий - " + current;
    ar = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ","ф","ы","в","а","п","р","о","л","д","ж","э","я","ч","с","м","и","т","ь","б","ю"]
    let ans = ""
    for (let i=0; i < answer.length; i++){
        let answ = document.querySelector('.elementStr'+i).value;
        ans += answ
    }
    if (ans == answer){
        if (mas2.length > 0){
            removePhoto();
            removeKeyboard();
            selectPhoto();
            GenerateKeyboard();
            GenerateImg();
            GenerateQuestion();
            GenerateStr();
        }else{
            document.getElementById("txt").innerText =  "Поздравляем, вы набрали - " + score + " очков!!!";
            $('.imdiz-overlay').css({'visibility': 'visible', 'opacity': 1});
		    $('.imdiz-modal').css({'visibility': 'visible', 'opacity': 1});
            
            $('.imdiz-close').click(function(){
                $('.imdiz-overlay').css({'visibility': 'hidden', 'opacity': 0});
                $('.imdiz-modal').css({'visibility': 'hidden', 'opacity': 0});
            });
        }
    }else{
        alert("введите ответ")
    }
}

function butHelp () {
    let widthDiv = 60  
    let item = $("<input>")
    item.addClass("buttonHelp")
    item.attr('id', 'buttonHelp')
    item.attr('type', 'button')
    item.attr('value', "помощь")
    item.attr('onclick', `help()`)
    item.css("width", widthDiv+"px")
    $("#buttonHelp").append(item);
    
}

function help () {
    if (current > 50){
        current -= 50
    }else{
        current = 0
    }
    document.getElementById("score").textContent = "Счет: Всего - " + score + ".   Текущий - " + current;
    for (let i=0; i < answer.length; i++){
        if (ar.indexOf(answer[i]) != -1){
            ar.splice(ar.indexOf(answer[i]), 1)
        }
    }
    for (let i=0; i < 16; i++){
        let item = arrayRandElement(ar)
        $("#elementKey"+item).css("opacity", 0);
    }
}

function restart(){
    location.reload();
}

$( document ).ready(function() {
    score = 0;
    current = 100;
    GenerateScore();
    selectPhoto();
    GenerateImg();
    GenerateStr();
    GenerateQuestion();
    GenerateKeyboard();
    butHelp();
});

