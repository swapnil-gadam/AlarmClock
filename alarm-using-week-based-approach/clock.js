class Clock {
    static getCurrentTimeObject() {
        const now = new Date();
        return now;
    }

    static getCurrentTime() {
        const now = new Date();
        const localCurrentTime = now.toLocaleTimeString();
        let [hour, minute, restOfTheString] = localCurrentTime.split(':');
        const day = now.getDay();



        if (restOfTheString.endsWith('pm') || restOfTheString.endsWith("PM")) {
            hour = parseInt(hour) + 12;
        }

        return {
            hour,
            minute: parseInt(minute),
            day: parseInt(day)
        }
    }

    static displayCurrentTime() {
        console.log(`Current time: ${Clock.getCurrentTimeObject()}`);
    }

    static getDateInString(date) {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return `${date.hour}:${date.minute} ${week[parseInt(date.day)]}`
    }
}

module.exports = Clock;
