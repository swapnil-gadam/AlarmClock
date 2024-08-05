const readline = require("readline");
const Clock = require("./clock");
const AlarmManager = require("./alarmManager");

class AlarmClockApp {
    #reader;
    #alarmManager;
    constructor() {
        this.#reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.#alarmManager = new AlarmManager(this.#reader);
        this.startApp();
    }

    startApp() {
        console.log("Welcome to Alarm Clock App!");
        this.displayMenu();
        this.#reader.on("line", (input) => {
            this.handleInput(input);
        });
    }

    displayMenu() {
        console.log(`
        Choose an option:
        1. Set alarm
        2. Delete alarm
        3. Current Date Time
        4. Show all alarms
        5. Exit
        `);
    }

    handleInput(input) {
        const inputValue = input.trim();
        switch (inputValue) {
            case "1":
                this.setAlarm();
                break;
            case "2":
                this.deleteAlarm();
                break;
            case "3":
                Clock.displayCurrentTime();
                this.displayMenu();
                break;
            case "4":
                this.showAlarms();
                this.displayMenu();
                break;
            case "5":
                this.exitApp();
                break;
            default:
                console.log("Invalid option. Please choose again.");
                this.displayMenu();
        }
    }

    setAlarm() {
        this.#reader.question(
            `Enter date time in format MM/DD/YYYY, HH:MM. This is a 24 hour clock  \n`,
            this.addAlarm.bind(this)
        );
    }

    addAlarm(dateTime) {
        const newDateTime = new Date(dateTime);
        if (newDateTime === "Invalid Date") {
            console.log("Invalid date time. Please try again.");
            this.displayMenu();
        } else {
            this.#alarmManager.addAlarm(newDateTime);
            this.displayMenu();
        }
    }

    deleteAlarm() {
        this.#reader.question(
            "Enter the index of the alarm you want to delete: \n",
            this.removeAlarm.bind(this)
        );
    }

    removeAlarm(index) {
        const indexValue = index.trim();
        if (isNaN(indexValue) || indexValue > this.#alarmManager.getAllAlarmsLength().length) {
            console.log("Invalid index. Please try again.");
            this.displayMenu();
        } else {
            this.#alarmManager.deleteAlarm(indexValue);
            this.displayMenu();
        }
    }

    showAlarms() {
        this.#alarmManager.showAllAlarms();
    }

    exitApp() {
        console.log("Exiting Alarm Clock App...");
        this.#reader.close();
        process.exit(0);
    }
}

new AlarmClockApp();
