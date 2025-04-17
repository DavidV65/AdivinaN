let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.body.addEventListener("touchstart", () => {
    if (!started) {
        document.getElementById("level-title").textContent = "Nivel 1";
        nextSequence();
        started = true;
    }
}, { once: true });

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        if (!started) return;
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Nivel " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let btn = document.getElementById(randomChosenColor);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 300);
    playSound(randomChosenColor);
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");


    audio.play().catch((error) => {
        console.log("Autoplay bloqueado. Reintentar después de interacción:", error);
        document.body.addEventListener("touchstart", () => {
            audio.play();
        }, { once: true });
    });
}
function animatePress(currentColor) {
    let btn = document.getElementById(currentColor);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        playSound("wrong");
        document.getElementById("level-title").textContent = "¡Perdiste! Toca para reiniciar";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    document.body.addEventListener("touchstart", () => {
        document.getElementById("level-title").textContent = "Nivel 1";
        nextSequence();
        started = true;
    }, { once: true });
}