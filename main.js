let word;
let levelNumber = 1;
const lastLetter=4;
const maxLevel=6;
const semiSecond=500;
const numOfWords=19;

function game(){
    word=randomVocabulary();
    buttonListener();
    keyboardListener();
}

function randomVocabulary() {
    document.getElementById('vocabulary');
    const words = ["מקלדת", "מקלחת", "שולחן", "כביסה", "מנעול", "שריפה", "מדפסת",
        "רמקול", "חולצה", "מדבקה", "קרפדה", "אכזבה", "מעטפה",
        "מברשת", "משאית", "מזרון", "מגירה", "שמיכה", "חשיבה", "מנורה"]
    let randomIndex = Math.ceil(Math.random() * numOfWords);
    let word = words[randomIndex];
    return word;
}
function buttonListener() {
    const keyboard = document.getElementsByClassName("keyboard_letter");
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].addEventListener('click', (event) => {
            if (event.target.innerHTML === "Enter") {
                checkGuess();
            } else if (event.target.innerHTML === "Delete") {
                deleteLetter();
            } else {
                insertChar(event.target.innerHTML);
            }
            keyboard[i].blur();
        });
    }
}
function keyboardListener(){
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === "Backspace") {
            deleteLetter();
        }else if (key==="Enter"){
            checkGuess();
        }
        else if (isHebrew(key)){
            insertChar(key);
        }
    });
}
function isHebrew(char){
    const hebrewLetters="אבגדהוזחטיכלמנסעפצקרשתץףךםן"
    return hebrewLetters.includes(char);
}
function insertChar(char) {
    const cells = level();
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].getAttribute('data-state') === 'empty') {
            cells[i].innerHTML = char;
            cells[i].setAttribute('data-state', char);
            break;
        }
    }
}

function level() {
    const level = document.querySelector("div[data-state=\"playing\"]");
    const cells = level.children;
    return cells;
}
function checkLength(guess) {
    return guess[lastLetter].getAttribute('data-state') !== 'empty';
}

function checkGuess() {
    const guess=document.querySelector("div[data-state=\"playing\"]");
    const guessLetters = guess.children;
    if (checkLength(guessLetters)) {
        const wordLetters = word.split("");
        let tempGuessLetters = [];
        let tempWordLetters = [];
        let flag = true;
        for (let i = 0; i < wordLetters.length; i++) {
            if (guessLetters[i].innerHTML=== wordLetters[i]){
                let greenButton=getButton(guessLetters[i],"green");
                greenButton.setAttribute('data-color','green');
            }else {
                tempWordLetters.push(wordLetters[i]);
                tempGuessLetters.push(guessLetters[i]);
            }
        }
       if (tempGuessLetters.length>0) {
            for (let i = 0; i < tempGuessLetters.length; i++) {
                if (checkIfLetterExistInWord(tempGuessLetters[i].innerHTML, tempWordLetters)) {
                    let yellowButton=getButton(tempGuessLetters[i],"yellow");
                    if (!isPainted(yellowButton,"green"))
                    yellowButton.setAttribute('data-color','yellow');
                    flag = false;
                    tempWordLetters=removeIndexFromArray(tempWordLetters,tempGuessLetters[i].innerHTML);
                } else {

                    let grayButton=getButton(tempGuessLetters[i],"gray");
                    if (!isPainted(grayButton,"green")&&!isPainted(grayButton,"yellow"))
                    grayButton.setAttribute('data-color','gray');
                    flag = false;
                }
            }
        }
        if (flag === false) {
            guess.setAttribute('data-state', "finish");
            levelNumber++;
            if (levelNumber > maxLevel) {
                alertResult("חלש אחי!");

            } else {
                document.getElementById("row" + levelNumber).setAttribute('data-state', "playing");
            }

        } else {
            alertResult("סחתיין!");
        }
    } else {
        alert("הניחוש קצר מ-5 אותיות!")
    }
}
function getButton(element,color){
    element.setAttribute('data-color', color);
    const buttons=document.getElementsByTagName("button");
    let button=null;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML===element.innerHTML){
            button=buttons[i];
        }
    }
    return button;

}

function checkIfLetterExistInWord(letter, wordsLetter) {
    let flag = false;
    for (let i = 0; i < wordsLetter.length; i++) {
        if (wordsLetter[i] === letter) {
            flag = true;
        }
    }
    return flag;

}

function deleteLetter() {
    let row = document.querySelector("div[data-state=\"playing\"]").children;
    for (let i = 0; i < row.length; i++) {
        if (i === lastLetter || row[i].getAttribute('data-state') !== 'empty' && row[i + 1].getAttribute('data-state') === 'empty') {
            row[i].setAttribute('data-state', 'empty')
            row[i].innerHTML = "";
            return;
        }
    }
}

function isPainted(button,buttonColor){
    let flag = false;
   let color = button.getAttribute('data-color');
    if (color===buttonColor){
        flag=true;
    }
    return flag;

}

function removeIndexFromArray(array,index){
    let newArray=new Array();
    let flag=false;
    for (let i = 0; i < array.length; i++) {
        if (array[i]!==index|| flag){
            newArray.push(array[i]);

        }else {
            flag=true;

        }
    }
    return newArray;
}
function alertResult(print){
    setTimeout(()=>{

        alert(print+" "+"המילה היא:  "+word );
        document.location.reload();
    },semiSecond);
}