let ampm = false;
const btnAM = document.getElementById("12h").onclick = () => { ampm = true, checkMode(ampm)};
const btnPM = document.getElementById("24h").onclick = () => { ampm = false, checkMode(ampm) };

let checkMode = () => {
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
    setTimeout(checkMode, 1000);
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

// const btnAM = document.getElementById("12h").onclick = clock;
// const btnPM = document.getElementById("24h").onclick = clockAM;
checkMode();