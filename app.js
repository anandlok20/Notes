const fs = require('fs')
const chalk = require('chalk')
const addNotes = function(title, body) {

    const noteData = loadData()
        // console.log(loadData());
    const dupNotes = noteData.filter(function(note) {
        // console.log(dupNotes);
        return note.title === title
    })
    if (dupNotes.length === 0) {
        noteData.push({
            title: title,
            body: body
        })
        saveData(noteData)
        console.log(chalk.green("New note saved with title " + title))
    } else {
        console.log(chalk.red("Title " + title + " already exists!!"))
    }
}

const getNotes = function() {
    const noteData = loadData();
    if (JSON.stringify(noteData) === "[]") {
        console.log(chalk.red("File Empty!!"))
    } else {
        console.log(chalk.blue("Notes: \n" + JSON.stringify(noteData, null, '\t')))
    }
}

const removeData = function(title) {
    const noteData = loadData()
    var flag = 0
        // console.log(title);
    for (var i = 0; i < noteData.length; i++) {
        if (noteData[i].title == title) {
            noteData.splice(i, 1)
            saveData(noteData)
            flag = 0
            console.log(chalk.green(title + " data removed!!"))
            break

        } else {
            flag++
        }
    }
    if (flag > 0) {
        console.log(chalk.red("Title not found!!"))
    }
}

const loadData = function() {
    try {
        return JSON.parse(fs.readFileSync("notes.json"))
    } catch (error) {
        // console.log("File doesn't exist!!" + error)
        return []
    }
}

const saveData = function(dataObj) {
    fs.writeFileSync("notes.json", JSON.stringify(dataObj, null, "\t"));
}

module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeData: removeData
}