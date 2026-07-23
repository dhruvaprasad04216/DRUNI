// ============================
// PAGE 7 - PART 1
// ============================

const stars = document.getElementById("stars");
const fireworks = document.getElementById("fireworks");
const birthdayMusic = document.getElementById("birthdayMusic");
const cakeContainer = document.getElementById("cakeContainer");
const cakeSection = document.getElementById("cakeSection");

const knife = document.getElementById("knife");

const cakeLeft = document.getElementById("cakeLeft");
const cakeRight = document.getElementById("cakeRight");

const cutLine = document.getElementById("cutLine");

const touchText = document.getElementById("touchText");

let started = false;

// How far apart the two cake halves fly on split.
// Smaller distance on narrow phone screens so both halves stay visible and centred.
const isMobile = window.innerWidth <= 480;
const splitDistance = isMobile ? 85 : 140;

// ============================
// CREATE STARS
// ============================

for(let i=0;i<80;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*4+2;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";

    star.style.animationDuration=(Math.random()*3+2)+"s";
    star.style.animationDelay=(Math.random()*3)+"s";

    stars.appendChild(star);

}

// ============================
// FIREWORKS
// ============================

function createFirework(){

    const fire=document.createElement("div");

    fire.className="firework";

    fire.style.left=(10+Math.random()*80)+"%";

    fire.style.top=(10+Math.random()*40)+"%";

    fireworks.appendChild(fire);

    setTimeout(()=>{

        fire.remove();

    },1800);

}

setInterval(createFirework,1800);

// ============================
// SHOW CAKE
// ============================

setTimeout(()=>{

    cakeSection.style.display="flex";

},5000);

// ============================
// TOUCH TO START
// ============================

document.addEventListener("click",function(){

    if(started) return;

    if(cakeSection.style.display==="none"||cakeSection.style.display==="") return;

    started=true;
    
   birthdayMusic.currentTime = 0;
birthdayMusic.play().catch(err => console.log(err));

    touchText.style.display="none";

    // Reveal the knife FIRST, then measure it — a hidden (display:none)
    // element always reports 0 width, which was throwing the centering off.
    knife.style.display="block";

    // Measure exactly where the cake is on screen right now, so the knife
    // lines up with it no matter the screen size or layout.
    const rect = cakeContainer.getBoundingClientRect();
    const knifeWidth = knife.offsetWidth;

    const centerX = (window.innerWidth / 2) - (knifeWidth / 2);
    const restBottom = window.innerHeight - rect.top + 6;   // hovering just above the cake
    const cutBottom = window.innerHeight - rect.bottom - 6; // just past the bottom of the cake

    // Save for the cutting step later
    knife.dataset.centerX = centerX;
    knife.dataset.cutBottom = cutBottom;

    // Knife rises slowly from its hidden spot below the screen
    knife.style.transition="bottom 1.8s ease-out, left 1.8s ease-out, transform 1.8s ease-out";
    knife.style.left = centerX + "px";
    knife.style.bottom = restBottom + "px";
    knife.style.transform="rotate(0deg)";

});
// ============================
// PAGE 7 - PART 2
// ============================

// Letter Elements
const letter = document.getElementById("letter");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");
const happy = document.getElementById("happy");
const signature = document.getElementById("signature");

// Continue after knife reaches the cake
document.addEventListener("click", function () {

    if (!started) return;

    // Prevent running twice
    if (knife.dataset.running === "true") return;
    knife.dataset.running = "true";

    // Give a moment to see the knife resting in place before it cuts
    setTimeout(function () {

        // Slow, neat cut — straight down through the measured centre of the cake
        const centerX = knife.dataset.centerX;
        const cutBottom = knife.dataset.cutBottom;

        knife.style.transition = "left 3s linear, bottom 3s linear";
        knife.style.left = centerX + "px";
        knife.style.bottom = cutBottom + "px";

        // Animate cut line at the same slow pace
        cutLine.style.transition = "height 3s linear";
        cutLine.style.height = "100%";

        // After the cut finishes
        setTimeout(function () {

            // Split cake evenly around the centre
            cakeLeft.style.transition = "transform 1.6s ease, opacity 1.4s ease";
            cakeRight.style.transition = "transform 1.6s ease, opacity 1.4s ease";

            cakeLeft.style.transform = "translateX(-" + splitDistance + "px) rotate(-8deg)";
            cakeRight.style.transform = "translateX(" + splitDistance + "px) rotate(8deg)";

            cakeLeft.style.opacity = "0";
            cakeRight.style.opacity = "0";

            knife.style.transition = "opacity 1s ease";
            knife.style.opacity = "0";

            // Hide cake, then reveal the letter
            setTimeout(function () {

                cakeSection.style.display = "none";

                // Show Letter
                letter.style.display = "block";

                line1.innerHTML = "Every moment with you<br>is my favorite memory ❤️";
                line1.classList.add("show");

                setTimeout(function () {

                    line2.innerHTML = "Thank you for making<br>my life beautiful 💖";
                    line2.classList.add("show");

                }, 2500);

                setTimeout(function () {

                    line3.innerHTML = "Distance can never<br>separate our hearts 🌙";
                    line3.classList.add("show");

                }, 5000);

                setTimeout(function () {

                    line4.innerHTML = "May your smile always<br>shine brighter than the stars ✨";
                    line4.classList.add("show");

                }, 7500);

                setTimeout(function () {

                    happy.innerHTML = "🎂 Happy 18th Birthday<br>My Nidhima ❤️";
                    happy.classList.add("show");

                }, 10500);

                setTimeout(function () {

                    signature.innerHTML = "Forever Yours ❤️<br>Your Kanda";
                    signature.classList.add("show");

                }, 13500);

            }, 1600);

        }, 3000);

    }, 1500);

});