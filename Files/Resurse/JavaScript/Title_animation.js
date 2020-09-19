text = document.querySelector('.animation');
if(text!=null){
    const strText = text.textContent;
    const splitText = strText.split("");
    text.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        text.innerHTML += "<span>" + splitText[i] + "</span>";
    }

    let char = 0;
    let timer = setInterval(onTick, 100);
    let lg = parseInt(splitText.length);

    function onTick() {
        const span = text.querySelectorAll('span')[char];
        const span2 = text.querySelectorAll('span')[lg - char - 1];
        span.classList.add('fade');
        span2.classList.add('fade');
        char++;
        if (char * 2 > lg) {
            complete();
            return;
        }
    }

    function complete() {
        clearInterval(timer);
        timer = null;
    }
}