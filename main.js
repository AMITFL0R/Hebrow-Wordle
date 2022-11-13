function keyboardListener(){
    document.addEventListener('keypress',(event)=>{
        let name=event.key;
        doSomething(name);
    })
}
function buttonListener(){
    let keyboard = document.getElementById('keyboard')
    keyboard.addEventListener('click', (event) => {
        let isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        doSomething(event.target.innerHTML);
    })
}


function doSomething(char){
let x=document.getElementsByClassName('square');
    for (let i = 0; i < x.length; i++) {
        if (x[i].getAttribute('data-state')==='empty'){
            x[i].innerHTML=char;
            x[i].setAttribute('data-state',char);
            return;
        }
    }



}


