const countdown = document.getElementById("countdown");
const countNumber = document.getElementById("countNumber");

const birthdayScreen = document.getElementById("birthdayScreen");

const endingScreen = document.getElementById("endingScreen");

const videos = [
    document.getElementById("video1"),
    document.getElementById("video2"),
    document.getElementById("video3"),
    document.getElementById("video4")
];

const numbers = [5,4,3,2,1];
let i = 0;

let advanced = [false, false, false, false]; // guard so goToNext only fires once per video
let fallbackTimer = null;

// Hide all videos
videos.forEach(video=>{
    video.style.display="none";
});

// Countdown
function startCountdown(){

    countNumber.innerText = numbers[i];

    const timer = setInterval(()=>{

        i++;

        if(i < numbers.length){

            countNumber.innerText = numbers[i];

            // restart zoom animation on every number
            countNumber.style.animation = "none";
            void countNumber.offsetWidth; // force reflow
            countNumber.style.animation = "zoom 1s ease";

        }else{

            clearInterval(timer);

            countdown.style.display="none";

            birthdayScreen.style.display="flex";

            setTimeout(()=>{

                birthdayScreen.style.display="none";

                playVideo(0);

            },2000);

        }

    },1000);

}

// Move on to the next video (or ending screen), only once per video
function goToNext(index){

    if(advanced[index]) return; // already moved on, ignore duplicate trigger
    advanced[index] = true;

    if(fallbackTimer){
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
    }

    videos[index].style.display = "none";

    if(index < videos.length - 1){

        setTimeout(function(){

            playVideo(index + 1);

        },1000);

    }
    else{

        setTimeout(function(){

            endingScreen.style.display = "flex";

        },1000);

    }

}

// Play a video
function playVideo(index){

    videos.forEach(v=>{
        v.pause();
        v.style.display="none";
    });

    const video = videos[index];

    video.currentTime = 0;
    video.load();

    video.style.display = "block";

    video.onloadeddata = function () {
        video.play().catch(err => console.log("Play blocked:", err));
    };

    video.onerror = function () {
        console.log("VIDEO " + (index+1) + " FAILED TO LOAD. Check the filename/path:", video.currentSrc);
    };

    // Hard fallback: some phone-recorded mp4s never fire "ended" or reach full
    // currentTime === duration, so this guarantees we move on regardless,
    // based on the video's own reported duration.
    video.onloadedmetadata = function(){
        console.log("Video " + (index+1) + " duration:", video.duration);

        if(video.duration && !isNaN(video.duration) && isFinite(video.duration)){
            if(fallbackTimer) clearTimeout(fallbackTimer);
            fallbackTimer = setTimeout(function(){
                console.log("Video " + (index+1) + " advanced via hard fallback timer.");
                goToNext(index);
            }, (video.duration * 1000) + 500);
        }
    };

}

// Unmute all videos after the first tap/click anywhere on the page
// (browsers block sound-autoplay until the user interacts once)
let soundUnlocked = false;
function unlockSound(){
    if(soundUnlocked) return;
    soundUnlocked = true;
    videos.forEach(v=> v.muted = false);
    console.log("Sound unlocked - videos are now unmuted.");
}
document.addEventListener("click", unlockSound);
document.addEventListener("touchstart", unlockSound);

// Video End
videos.forEach((video, index) => {

    // Normal case: browser fires "ended" correctly
    video.addEventListener("ended", function(){
        console.log("Video " + (index+1) + " ended normally.");
        goToNext(index);
    });

    // Backup case: some phone-exported mp4s have imprecise duration,
    // so "ended" never fires. This checks progress manually as a fallback.
    video.addEventListener("timeupdate", function(){
        if(video.duration && !isNaN(video.duration) &&
           video.currentTime >= video.duration - 0.3){
            console.log("Video " + (index+1) + " reached end via timeupdate backup.");
            goToNext(index);
        }
    });

});

// Start everything
startCountdown();