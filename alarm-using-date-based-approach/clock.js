class Clock {
    static getCurrentDateTimeString() {
        const now = new Date();
        const [date, month, restOfTheString] = now.toLocaleString().split('/');
        return `${month}/${date}/${restOfTheString}`;
    }

    static getCurrentTimeObject() {
        const now = new Date();
        return now;
    }

    static displayCurrentTime() {
        console.log(`Current time: ${Clock.getCurrentDateTimeString()}`);
    }
}

module.exports = Clock;
