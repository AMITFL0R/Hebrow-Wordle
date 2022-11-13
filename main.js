function keyboardAccess(){
    document.addEventListener('keypress',(event)=>{
        let name=event.key;
        let code=event.code;
        alert(name+" +"+code)
    })
}
function fill(){

}

function doSomething(){
    let y= document.getElementsByClassName("keyboard_letter");
    let x=document.getElementsByClassName("square");
    x[1].innerHTML=y[1].getAttribute("data-key");
}


