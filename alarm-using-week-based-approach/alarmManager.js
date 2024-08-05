const Clock = require("./clock");
const Alarm = require("./alarm");

class AlarmManager {
    #alarms;
    #reader;

    constructor(reader) {
        this.#alarms = [];
        this.#reader = reader;
        setInterval(() => {
            this.#checkAlarms();
        }, 1000);
    }

    getAllAlarmsLength() {
        return this.#alarms;
    }

    showAllAlarms() {
        if (this.#alarms.length <= 0) {
            console.log("No alarms set");
            return;
        }

        console.log("Following are the list of alams you have set:");
        this.#alarms.forEach((alarm, index) => {
            console.log(`${index + 1}. ${Clock.getDateInString(alarm.time)}`);
        });
    }

    addAlarm(time) {
        let shouldSetAlarm = true;

        this.#alarms.forEach((alreadySetAlarm) => {
            if (this.#checkIfDatesAreEqual(alreadySetAlarm.time, time)) {
                shouldSetAlarm = false;
            }
        });

        if (!shouldSetAlarm) {
            console.log(`Alarm for ${Clock.getDateInString(time)} already set.`);
            return;
        }

        this.#alarms.push(new Alarm(time));
        console.log(`Alarm set for ${Clock.getDateInString(time)}`);
    }

    deleteAlarm(index) {
        const alarm = this.#alarms.splice(index - 1, 1);
        console.log(`Alarm ${Clock.getDateInString(alarm.time)} deleted.`);
    }

    #checkAlarms() {
        this.#alarms.forEach((alarm) => {
            const alamTime = alarm.snoozeTime || alarm.time;
            const currentTime = Clock.getCurrentTime();

            if (
                this.#checkIfDatesAreEqual(alamTime, currentTime) &&
                alarm.snoozeCount < 3
            ) {
                alarm.trigger();
                this.#reader.question(
                    "Do you want to snooze the alarm? (y/n): \n",
                    (answer) => {
                        if (answer.toLowerCase() == "y") {
                            alarm.snooze();
                        }
                    }
                );
            }

            if (this.checkIfMinuteDifferenceIsGreaterThan5(alamTime, currentTime) && alarm.snoozeCount != 0) {
                alarm.resetSnoozeCount();
            }
        });
    }

    #checkIfDatesAreEqual(time1, time2) {
        return (
            time1.hour === time2.hour &&
            time2.minute === time1.minute &&
            time1.day === time2.day
        );
    }

    checkIfMinuteDifferenceIsGreaterThan5(alarmTime, currentTime) {
        return Math.abs(alarmTime.minute - currentTime.minute) > 5;
    }
}

module.exports = AlarmManager;
