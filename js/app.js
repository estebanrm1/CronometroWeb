const display = document.getElementById('displayNum');
const botonPlayPausa = document.getElementById('play-pausa');
const esferaSegundos = document.getElementById('esferaSegundos');

let intervalo;
let playTiempo = 0;

const playPausa = () => {
    const estaPausado = !botonPlayPausa.classList.contains('play');
    if(estaPausado){
        botonPlayPausa.classList.add('play');
        start();
    }else{
        botonPlayPausa.classList.remove('play');
        pausa()
    }
}

const start = () => {
    esferaSegundos.style.animation = 'rotacion 60s linear infinite';
    let startTiempo = Date.now() - playTiempo;
    esferaSegundos.style.animationPlayState = 'running';
    intervalo = setInterval( () => {
        playTiempo = Date.now() - startTiempo;
        display.textContent = calculateTime(playTiempo)
    },1000)
}

const calculateTime = playTiempo => {
    const total_segundos = Math.floor(playTiempo / 1000);
    const total_minutos = Math.floor(total_segundos / 60);

    const display_segundos = (total_segundos % 60).toString().padStart(2, "0");
    const display_minutos = total_minutos.toString().padStart(2, "0");

    return `${display_minutos}:${display_segundos}`
}

const pausa = () => {
    esferaSegundos.style.animationPlayState = 'paused';
    clearInterval(intervalo);
}

const stop = () => {
    esferaSegundos.style.transform = 'rotate(-90deg) translateX(60px)';
    esferaSegundos.style.animation = 'none';
    botonPlayPausa.classList.remove('play');
    playTiempo = 0;
    clearInterval(intervalo);
    display.textContent = '00:00';
}