const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("recording");

const heart = document.getElementById("heart");

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");

const voiceIntro = document.getElementById("voiceIntro");
const finalMessage = document.getElementById("finalMessage");

const messages = [

{
time:8,
text:"Your voice is my favorite melodyyy.lovee youu kandaa ❤️"
},

{
time:16,
text:"Every word you say makes my heart smile.lovee youu muduuu ❤️"
},

{
time:24,
text:"Even miles apart, your voice makes me feel close.lovee youu bangarii ❤️"
},

{
time:32,
text:"I could listen to you forever.lovee youu puttaaa ❤️"
},

{
time:40,
text:"Thank you for being my happiest place.lovee youu Chinnaaaa ❤️"
},

{
time:48,
text:"Happy 18th Birthday for myy lovelyyy HENDTHIII ❤️"
}

];

let shown = [];

playBtn.addEventListener("click",function(){

    audio.play();

    heart.classList.add("beat");

    playBtn.style.display="none";

    messageBox.style.display="block";

});

audio.addEventListener("timeupdate",function(){

    messages.forEach(function(msg,index){

        if(audio.currentTime>=msg.time && !shown[index]){

            shown[index]=true;

            messageText.style.opacity="0";

            setTimeout(function(){

                messageText.innerHTML=msg.text;

                messageText.style.opacity="1";

            },300);

        }

    });

});
// =========================
// PART 2 - Finish Page 6
// =========================

// When the recording ends
audio.addEventListener("ended", function () {

    // Stop the heart animation
    heart.classList.remove("beat");

    // Hide the last message
    messageBox.style.display = "none";

    // Fade out the intro
    voiceIntro.style.opacity = "0";

    setTimeout(function () {

        voiceIntro.style.display = "none";

        // Show final message
        finalMessage.style.display = "flex";

        finalMessage.style.opacity = "0";

        setTimeout(function () {
            finalMessage.style.transition = "opacity 1.5s ease";
            finalMessage.style.opacity = "1";
        }, 100);

    }, 800);

});
