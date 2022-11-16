
const word=randomVocabulary();
let levell=1;


function keyboardListener(cells){
    document.addEventListener('keypress',(event)=>{
        let name=event.key;
        if (name!=="Enter")
        insertChar(name,cells);
    })
}
function buttonListener(cells){
    let keyboard = document.getElementById('keyboard')
    keyboard.addEventListener('click', (event) => {
        let isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        if (event.target.innerHTML!=="Enter"&&event.target.innerHTML!=="Delete")
        insertChar(event.target.innerHTML,cells);
    })
}


function insertChar(char,cells){
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].getAttribute('data-state')==='empty'){
            cells[i].innerHTML=char;
            cells[i].setAttribute('data-state',char);
            return;
        }
    }
}

function randomVocabulary() {
    document.getElementById('vocabulary');
    const words = ["מקלדת", "מקלחת", "שולחן", "כביסה", "מנעול", "בקבוק", "מדפסת",
        "רמקול", "חולצה", "מדבקה","קרפדה","דולפין","אשדוד",
        "מברשת","משאית","מזרון","מגירה","שמיכה", "לפטופ", "מנורה"]
    let randomIndex = Math.ceil(Math.random() * 19);
    let word=words[randomIndex];
    return word;

}

function level(){
    const level=document.querySelector("div[data-state=\"playing\"]");
    const cells=level.children;
    alert(cells.length);
    keyboardListener(cells);
    buttonListener(cells);

}
function gameLoop(){
alert(word);
    level();

}
function checkLength(){
    const level=document.querySelector("div[data-state=\"playing\"]").children[4];
    if (level.getAttribute('data-state')==='empty'){
        return false;
    }
    return true;
}

function checkGuess(){
    if (checkLength()){
        const wordLetters=word.split("");
        const guessLetters=document.querySelector("div[data-state=\"playing\"]").children;
        let flag=true;
        for (let i = 0; i < wordLetters.length; i++) {
            if (wordLetters[i]!==guessLetters[i].innerHTML){
                flag=false;
            }
        }
        if (flag===false){
            document.querySelector("div[data-state=\"playing\"]").setAttribute('data-state',"finish");
            levell++;
            document.getElementById("row"+levell).setAttribute('data-state',"playing");
            level()
        }
        alert(flag);
    }
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


