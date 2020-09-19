let menu = null;
document.addEventListener('DOMContentLoaded', function () {
    menu = document.querySelector('.menu');
    menu.classList.add('off');

    let box = document.getElementById('box');
    box.addEventListener('contextmenu', showmenu);

    menu.addEventListener('mouseleave', hidemenu);

    addMenuListeners();
});

function addMenuListeners() {
    document.getElementById('red').addEventListener('click', setColour);
    document.getElementById('black').addEventListener('click', setColour);
    document.getElementById('green').addEventListener('click', setColour);
    document.getElementById("small").addEventListener('click', setFont);
    document.getElementById("medium").addEventListener('click', setFont);
    document.getElementById("large").addEventListener('click', setFont);
    document.getElementById("inapoi_la_inceput").addEventListener('click', Backtotop);
}

function setColour(ev) {
    hidemenu();
    let clr = ev.target.id;
    document.getElementById('box').style.color = clr;
}

function setFont(ev) {
    hidemenu();
    let size = ev.target.id;
    if (size == 'small') document.getElementById('box').style.fontSize = '100%';
    if (size == 'medium') document.getElementById('box').style.fontSize = '105%';
    if (size == 'large') document.getElementById('box').style.fontSize = '110%';
}

function Backtotop() {
    hidemenu();
    document.documentElement.scrollTop = 0;
}

function showmenu(ev) {
    ev.preventDefault();
    menu.style.top = `${ev.clientY-20}px`;
    menu.style.left = `${ev.clientX}px`;
    menu.classList.remove('off');
}

function hidemenu() {
    menu.classList.add('off');
    menu.style.top = '-200%';
    menu.style.left = '-200%';
}
