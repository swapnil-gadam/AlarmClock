const Clock = require('./clock');

class Alarm {
    #time;
    #snoozeTime;
    #snoozeCount;

    constructor(alarmTime) {
        this.#time = alarmTime;

        this.#snoozeTime = null;

        this.#snoozeCount = 0;
    }

    get time() {
        return this.#time;
    }

    get snoozeTime() {
        return this.#snoozeTime;
    }

    get snoozeCount() {
        return this.#snoozeCount;
    }

    resetSnoozeCount() {
        this.#snoozeCount = 0;
    }

    trigger() {
        console.log(`Alarm! It's ${Clock.getDateInString(this.#time)}`);
    }

    snooze() {
        if (this.#snoozeCount < 3) {
            this.#snoozeCount++;

            this.#snoozeTime = this.#snoozeTime || this.#time;

            const minutes = this.#snoozeTime.minute + 5;
            const hours = this.#snoozeTime.hour + (minutes > 59 ? 1 : 0);
            const day = this.#snoozeTime.day + (hours > 23 ? 1 : 0);

            this.#snoozeTime.hour = hours % 24;
            this.#snoozeTime.minute = minutes % 60;
            this.#snoozeTime.day = day % 7;

            console.log(`Alarm snoozed. Next alarm at ${Clock.getDateInString(this.#snoozeTime)}`);
        } else {
            this.#snoozeTime = null;
            console.log("Maximum snooze count reached.");
        }
    }
}

module.exports = Alarm;
