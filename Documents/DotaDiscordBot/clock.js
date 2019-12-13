class Clock {

    constructor(printMessageToDiscord) {
        this.startTime;
        this.updatedTime;
        this.difference;
        this.tInterval;
        this.paused = 0;
        this.running = 0;
        this.printTime = 0;
        this.printMessageToDiscord = printMessageToDiscord;
    }

    startTimer() {
        if (!this.running)
            {
                this.startTime = new Date().getTime();
                this.tInterval = setInterval(this.getShowTime.bind(this), 1000);
                this.paused = 0;
                this.running = 1;
            }
    }

    resetTimer() {
        clearInterval(tInterval);
        this.savedTime = 0;
        this.difference = 0;
        this.paused =  0;
        this.running = 0;
    }

    checkForPowerRunes() {
        if ((this.printTime +20) % 120 == 0) {
            console.log("Grab Power Runes");
            this.printMessageToDiscord("Grab Power Runes");
        }
    }

    checkForBountyRunesAndOutposts() {
        if ((this.printTime + 20) % 300 == 0) {
            console.log("Grab Bounty Runes and Take Outposts");
            this.printMessageToDiscord("Grab Bounty Runes and Take Outposts");
        }
    }

    getShowTime() {
        this.updatedTime = new Date().getTime();
        this.difference = (this.updatedTime - this.startTime);
        this.printTime = Math.floor((this.difference % (1000 * 60 * 60)) / 1000);
        console.log(this.printTime);
        this.checkForPowerRunes();
        this.checkForBountyRunesAndOutposts();
    }   
};

module.exports = Clock;