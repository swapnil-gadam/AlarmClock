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
            console.log(`${index + 1}. ${alarm.dateTime}`);
        });
    }

    addAlarm(dateTime) {
        let shouldSetAlarm = true;

        this.#alarms.forEach((alreadySetAlarm) => {
            if (this.#checkIfDatesAreEqual(alreadySetAlarm.dateTime, dateTime)) {
                shouldSetAlarm = false;
            }
        });

        if (!shouldSetAlarm) {
            console.log(`Alarm for ${dateTime} already set.`);
            return;
        }

        this.#alarms.push(new Alarm(dateTime));
        console.log(`Alarm set for ${dateTime}`);
    }

    deleteAlarm(index) {
        const alarm = this.#alarms.splice(index - 1, 1);
        console.log(`Alarm ${alarm.dateTime} deleted.`);
    }

    #checkAlarms() {
        this.#alarms.forEach((alarm) => {
            const alamTime = alarm.snoozeTime || alarm.dateTime;
            const currentTime = Clock.getCurrentDateTimeString()

            if (this.#checkIfDatesAreEqual(alamTime, currentTime) && alarm.snoozeCount < 3) {
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

            if (this.checkIfMinuteDifferenceIsGreaterThan5(alamTime, currentTime)) {
                alarm.resetSnoozeCount();
            }
        });
    }

    #checkIfDatesAreEqual(dateTime1, dateTime2) {
        const dateTimeObj1 = new Date(dateTime1);
        const dateTimeObj2 = new Date(dateTime2);

        return (
            dateTimeObj1.getHours() === dateTimeObj2.getHours() &&
            dateTimeObj1.getMinutes() === dateTimeObj2.getMinutes() &&
            dateTimeObj1.getMonth() === dateTimeObj2.getMonth() &&
            dateTimeObj1.getDate() === dateTimeObj2.getDate() &&
            dateTimeObj1.getFullYear() === dateTimeObj2.getFullYear()
        );
    }

    checkIfMinuteDifferenceIsGreaterThan5(alarmTime, currentTime) {
        const alarmTimeObj1 = new Date(alarmTime);
        const currentTimeObj2 = new Date(currentTime);

        return (
            currentTimeObj2.getMinutes() - alarmTimeObj1.getMinutes() > 5
        )
    }
}

module.exports = AlarmManager;
