var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
var printTime = 0;

function startTimer() {
    if (!running)
    {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1000);

        paused = 0;
        running = 1;



    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused =  0;
    running = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime);
    printTime = Math.floor((difference % (1000 * 60 * 60)) / 1000);
    console.log(printTime);
    checkForPowerRunes();
    checkForBountyRunesAndOutposts();
}

function checkForPowerRunes() {
    if ((printTime +20) % 120 == 0) {
        console.log("Grab Power Runes");
    }
}

function checkForBountyRunesAndOutposts() {
    if ((printTime + 20) % 300 == 0) {
        console.log("Grab Bounty Runes and Take Outposts");
    }
}

startTimer();