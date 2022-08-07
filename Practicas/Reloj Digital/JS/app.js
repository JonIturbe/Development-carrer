let ampm = false;
let vueltasArr = [];
const btnAM = document.getElementById("12h").onclick = () => { ampm = true, checkClock(ampm)};
const btnPM = document.getElementById("24h").onclick = () => { ampm = false, checkClock(ampm) };

//FUNCIONES RELOJ
let checkClock = () => {
    if (ampm){
        // console.log("Mode setted to 12 hours");
        clockAM();
    }else if (!ampm){
        // console.log("Mode setted to 24 hours");
        clock();
    }else{
        // console.log("Mode setted to 24 hours");
        clock();
    }
    setTimeout(checkClock, 1000);
}

let clockAM = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    //let time = hrs + ":" + mins + ":" + secs + " - " ;

    let period = "AM";
    if (hrs == 0) hrs = 12;
    if (hrs > 12){
        hrs = hrs - 12;
        period = "PM";
    }

    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    let time = hrs + ":" + mins + ":" + secs + " - " + period;
    document.getElementById("clock").innerText = time;
    // setTimeout(clock, 1000);
}

let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    let time = hrs + ":" + mins + ":" + secs;
    document.getElementById("clock").innerText = time;
    // setTimeout(clock, 1000);
}

//FUNCIONES CRONOMETRO
let cronoInit = () => {
    txt = document.getElementById("crono");
    info = document.getElementById("cronoInfo");
    txt.innerText = "00:00:00"

    hrs = 0;
    mins = 0;
    secs = 0;
    cronometrar();
}

let escribir = () => {
    hau = 0, mau = 0, sau = 0;
    secs++;
    if (secs > 59) { mins++, secs = 0 }
    if (mins > 59) { hrs++, mins = 0 }

    if (hrs < 10) {hau="0" + hrs}else{hau=hrs};
    if (mins < 10) {mau="0" + mins}else{mau=mins};
    if (secs < 10) {sau="0" + secs}else{sau=secs};

    txt.innerText = `${ hau } : ${ mau } : ${ sau }`
    info.innerText = "Cronometro - Playing";
}

let cronometrar = () => {
    escribir();
    id = setInterval(escribir, 1000);
}

const reiniciar = () => {
    clearInterval(id);
    txt.innerText = "00:00:00"
    hrs = 0; mins = 0; secs = 0;
    cronometrar();
}

let pausa = () => {
    clearInterval(id);
    info.innerText = "Cronometro - Paused";
}

let vuelta = () => {
    let tiempo = `${ hau } : ${ mau } : ${ sau }`;
    reiniciar();
    if (vueltasArr.length >= 5){
        vueltasArr.shift();
        vueltasArr.push(tiempo);
    }else{
        vueltasArr.push(tiempo);
    }
    dibujarTiempos(tiempo, vueltasArr);
}

const dibujarTiempos = (tiempo, array) => {
    let check = document.getElementsByTagName("ol");
    let lista, newli, title;
    if (check.length < 1){
        title = document.createElement("h2");
        title.innerText = "LAPS"
        lista = document.createElement("ol");
        lista.setAttribute("id", "listaTiempos");
    }else{
        lista = document.getElementById("listaTiempos");
    }
    let lis = document.getElementsByTagName("li");

    if(lis.length < 5){
        newli = document.createElement("li"),
        newli.innerText = tiempo,
        lista.appendChild(newli)
        
        let current = document.getElementById("bottom");
        current.appendChild(title); 
        current.appendChild(lista); 
    }else{
        // console.log("Ya hay 5 tiempos")
        lista.innerText = "";
        array.forEach(elm => {
            newli = document.createElement("li"),
            newli.innerText = elm,
            lista.appendChild(newli)
    });
    }
}

const btnReset = document.getElementById("btnReset").addEventListener("click", reiniciar);
const btnLap = document.getElementById("btnLap").addEventListener("click", vuelta);
const btnPlay = document.getElementById("btnPlay").addEventListener("click", cronometrar);
const btnPause = document.getElementById("btnPause").addEventListener("click", pausa);

checkClock();
cronoInit();