
const word=randomVocabulary();
let levelNumber=1;


// function keyboardListener(){
//     document.addEventListener('keydown', function(event) {
//         const key = event.key; // const {key} = event; ES6+
//         if (key === "Backspace") {
//             // Do something
//             deleteLetter();
//         }
//     });
//     document.addEventListener('keypress',(event)=>{
//         let name=event.key;
//         if (name==="Enter"){
//             checkGuess();
//         }else {
//             insertChar(name);
//         }
//     })
// }
function buttonListener(){
    const keyboard=document.getElementsByClassName("keyboard_letter");
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].addEventListener('click',(event)=>{
            if (event.target.innerHTML==="Enter"){
                        checkGuess();
                    }else if (event.target.innerHTML==="Delete"){
                        deleteLetter();
                    }else {
                         insertChar(event.target.innerHTML);

                    }
        })
    }
}


function insertChar(char){
    const cells=level();
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].getAttribute('data-state')==='empty'){
            cells[i].innerHTML=char;
            cells[i].setAttribute('data-state',char);
            break;
        }
    }
}

function randomVocabulary() {
    document.getElementById('vocabulary');
    const words = ["מקלדת", "מקלחת", "שולחן", "כביסה", "מנעול", "שריפה", "מדפסת",
        "רמקול", "חולצה", "מדבקה","קרפדה","אכזבה","מעטפה",
        "מברשת","משאית","מזרון","מגירה","שמיכה", "חשיבה", "מנורה"]
    let randomIndex = Math.ceil(Math.random() * 19);
    let word=words[randomIndex];
    return word;

}

function level(){
    const level=document.querySelector("div[data-state=\"playing\"]");
    const cells=level.children;
    return cells;
}
function gameLoop(){
alert(word);
buttonListener();
//keyboardListener();

}
function checkLength(){
    const level= document.querySelector("div[data-state=\"playing\"]").children[4];
    if (level.getAttribute('data-state')==='empty'){
        return false;
    }
    return true;
}

function checkGuess(){
    if (checkLength()){
        const wordLetters=word.split("");
        const guessLetters=document.querySelector("div[data-state=\"playing\"]").children;
        let j =0;
        let flag=true;
        for (let i = 0; i < guessLetters.length; i++) {
            if (checkIfLetterExistInWord (guessLetters[j].innerHTML , wordLetters)){
                if (wordLetters[i]===guessLetters[j].innerHTML){
                    guessLetters[j].setAttribute('data-color','green');
                    j++;
                }else {
                    guessLetters[j].setAttribute('data-color','yellow');
                    flag=false;
                    j++;
                }
            } else {
                guessLetters[j].setAttribute('data-color','gray');
                flag=false;
                j++;
            }

        }
        if (flag===false){
            document.querySelector("div[data-state=\"playing\"]").setAttribute('data-state',"finish");
            levelNumber++;
            if (levelNumber>6){
                alert("חלש אחי!");
                document.location.reload();
            }else {
                document.getElementById("row"+levelNumber).setAttribute('data-state',"playing");
            }

        }else {
            alert("ניצחת!");
            document.location.reload();
        }


    }else {
        alert("guess is shorter than five letters")
    }
}
function paintKeyboard(char){
    const keyboard=document.getElementsByClassName("keyboard_letter");
    for (let i = 0; i <keyboard.length ; i++) {
        if (keyboard[i].innerHTML===char);
        keyboard[i].setAttribute('data-color','green');
    }
}


function checkIfLetterExistInWord(letter,wordsLetter){
    let flag = false;
    for (let i =0;  i<wordsLetter.length; i++){
        if (wordsLetter[i]===letter){
            flag=true;
        }
    }
    return flag;

}




function deleteLetter(){
    let y=document.querySelector("div[data-state=\"playing\"]").children;
    for (let i = 0; i < y.length; i++) {
        if (i===4||y[i].getAttribute('data-state')!=='empty'&&y[i+1].getAttribute('data-state')==='empty'){
        y[i].setAttribute('data-state','empty')
        y[i].innerHTML="";
            return;
        }
    }
}


