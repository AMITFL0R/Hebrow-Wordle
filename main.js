function keyboardListener(cells){
    document.addEventListener('keypress',(event)=>{
        let name=event.key;
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
    alert(word)
}

function level(levelNumber){
    const level=document.getElementById("row"+levelNumber);
    const cells=level.children;
    if (level.getAttribute('data-state')==='playing'){
        keyboardListener(cells);
        buttonListener(cells);
    }

}
function gameLoop(){
    randomVocabulary();
    for (let i = 0; i < 6; i++) {
        level(i+1);

    }



}
function checkFullRow (levelNumber){
    let numberOfLetters = document.getElementById("row"+levelNumber).children[4].innerHTML;
    if (numberOfLetters=="5"){
        alert("guess is shorter than 5 letters");
    }else {
        checkAnswer();
        levelNumber++;
        level(levelNumber)

}
  function checkAnswer (){

      }
}

