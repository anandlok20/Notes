const fs = require('fs')
const chalk = require('chalk')
const addNotes = (title, body) => {
    // debugger;
    const Notes = loadData()
        // console.log(loadData());
        // const dupNotes = noteData.filter((note) => note.title === title)
    const dupNote = Notes.find((note) => note.title === title) //improve the time
    if (!dupNote) {
        Notes.push({
            title: title,
            body: body
        })
        const noteD = { Notes }
        saveData(noteD)
        console.log(chalk.green.inverse("New note saved with title " + title))
    } else {
        console.log(chalk.red.inverse("Title " + title + " already exists!!"))
    }
}

const getNotes = () => {
    const noteData = loadData();
    console.log(chalk.blue("Notes List"))
    var i = 0
    noteData.forEach(note => {
        console.log(chalk.yellow("\t" + ++i + ". " + note.title))
    })
}

const removeData = (title) => {
    const noteData = loadData()
    var flag = 0
        // console.log(title);
    const Notes = noteData.filter(note => note.title !== title)
    const dD = { Notes }
        // console.log(dupData.length + " | " + noteData.length)
    if (Notes.length - noteData.length === 0) {
        console.log(chalk.red.inverse("Title not found!!"))
    } else {
        fs.writeFileSync("notes.json", JSON.stringify(dD, null, "\t"))
        console.log(chalk.green.inverse(title + " data removed!!"))
    }
}

const loadData = () => {
    try {
        // console.log(JSON.parse(fs.readFileSync("notes.json")).Notes)
        return (JSON.parse(fs.readFileSync("notes.json"))).Notes
    } catch (error) {
        // console.log("File doesn't exist!!" + error)
        return []
    }
}

const saveData = (dataObj) => {
    fs.writeFileSync("notes.json", JSON.stringify(dataObj, null, "\t"));
}

const readData = (titl) => {
    // console.log(titl)
    const Notes = loadData()
        // console.log(Notes)
    const data = Notes.find(note => note.title === titl)
    if (data) {
        if (data.body !== "") {
            console.log(chalk.green.inverse("Notes for " + titl + " is \" " + data.body + " \""))
        } else {
            console.log(chalk.red.inverse(titl + " body is empty!!"))
        }
    } else {
        console.log(chalk.red.inverse(titl + " title not exists"))
    }

}

module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeData: removeData,
    readData: readData
}