const app = require('./app.js')
const yargs = require('yargs')

yargs.command({
    command: "add",
    describe: "Adding data to notes..",
    builder: {
        title: {
            describe: "Title of the note!!",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Body of the note!!",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        app.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: "list",
    describe: "Listing data of notes..",
    handler() {
        app.getNotes()
    }
})

yargs.command({
    command: "remove",
    describe: "Removing data from notes..",
    builder: {
        title: {
            describe: "title for deleting",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        app.removeData(argv.title)
    }
})

yargs.command({
    command: "read",
    describe: "Reading data from notes..",
    builder: {
        title: {
            describe: "title for notes data",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        app.readData(argv.title)
    }
})





yargs.parse();