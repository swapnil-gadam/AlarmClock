class Alarm {
    #dateTime;
    #snoozeCount;
    #snoozeTime;

    constructor(dateTime) {
        this.#dateTime = dateTime;
        this.#snoozeTime = null;
        this.#snoozeCount = 0;
    }

    get dateTime() {
        return this.#dateTime;
    }

    get snoozeTime() {
        return this.#snoozeTime;
    }

    get snoozeCount() {
        return this.#snoozeCount;
    }

    get resetSnoozeCount() {
        this.#snoozeCount = 0;
    }

    trigger() {
        console.log(`Alarm! It's ${this.#dateTime}`);
    }

    snooze() {
        if (this.#snoozeCount < 3) {
            this.#snoozeCount++;

            this.#snoozeTime = this.#snoozeTime || this.#dateTime;

            const minutes = this.#snoozeTime.getMinutes() + 5;
            const hours = this.#snoozeTime.getHours() + (minutes > 59 ? 1 : 0);
            const day = this.#snoozeTime.getDate() + (hours > 23 ? 1 : 0);
            const month = this.#snoozeTime.getMonth() + (day > new Date(this.#snoozeTime.getFullYear(), this.#snoozeTime.getMonth(), 0).getDate() ? 1 : 0);
            const year = this.#snoozeTime.getFullYear() + (month > 11 ? 1 : 0);

            this.#snoozeTime.setHours(hours % 24);
            this.#snoozeTime.setMinutes(minutes % 60);
            this.#snoozeTime.setDate(day);
            this.#snoozeTime.setMonth(month % 12);
            this.#snoozeTime.setFullYear(year);

            console.log(`Alarm snoozed. Next alarm at ${this.#dateTime}`);
        } else {

            this.#snoozeTime = null;
            console.log("Maximum snooze count reached.");
        }
    }



}

module.exports = Alarm;
