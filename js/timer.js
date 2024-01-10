const buttons = document.querySelectorAll(".btn")
const pomodoroBtn = document.getElementById("pomodoro");
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");
const playButton = document.getElementById("btn-play");
const pauseButton = document.getElementById("btn-pause");
const resetButton = document.getElementById("btn-reset");
const timer = document.getElementById("contador");
const imagenTimer = document.getElementById("img-timer");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
timer.textContent = `${minCount+1}:00`

const appendZero = (value) =>{
    value = value < 10 ? `0${value}` : value;
    return value;
};

resetButton.addEventListener(
    "click", 
    (resetTime = () =>{
        pauseTimer();
        switch(active){
            case "long":
                minCount = 14;
                break;
            case "short":
                minCount = 4;
                break;
            default:
                minCount = 24;
                break;
        }
        count = 59;
        timer.textContent = `${appendZero(minCount+1)}:00`;
    })
)

const removeFocus= () =>{
    buttons.forEach((btn) =>{
        btn.classList.remove("focus");
    })
}

pomodoroBtn.addEventListener("click", () =>{
    removeFocus();
    pomodoroBtn.classList.add("focus");
    active = "focus"
    pauseTimer();
    count= 59;
    minCount= 24;
    timer.textContent = `${minCount+1}:00`;
});

shortBreak.addEventListener("click", () =>{
    removeFocus();
    shortBreak.classList.add("focus");
    active = "short"
    pauseTimer();
    count= 59;
    minCount= 4;
    timer.textContent = `${appendZero(minCount+1)}:00`;
});

longBreak.addEventListener("click", () =>{
    removeFocus();
    longBreak.classList.add("focus");
    active = "long"
    pauseTimer();
    count= 59;
    minCount= 14;
    timer.textContent = `${appendZero(minCount+1)}:00`;
});

pauseButton.addEventListener(
    "click", 
    (pauseTimer = () =>{
        paused = true;
        clearInterval(set);
        imagenTimer.src = "img/gatoStop.png";
        playButton.classList.add("show");
        playButton.classList.remove("hide");
        pauseButton.classList.remove("show");
        pauseButton.classList.add("hide");
        resetButton.classList.remove("show");
        resetButton.classList.add("hide");
    })
)

playButton.addEventListener("click", () =>{
    resetButton.classList.add("show");
    resetButton.classList.remove("hide");
    pauseButton.classList.add("show");
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
    playButton.classList.remove("show");
    if(paused){
        paused=false;
        imagenTimer.src = "img/gato.gif"
        timer.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() =>{
            count--;
            timer.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if(count == 0){
                if(minCount != 0){
                    minCount--;
                    count=60;
                }else{
                    clearInterval(set);
                    imagenTimer.src = "img/gatoStop.png";
                }
            }
        },1000)
    }
})


