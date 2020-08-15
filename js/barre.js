window.app = window.app || { };

// Group of Notes
app.Barre = function(x, y) {
    var coreNote = {x, y};
    var notes = [];

    function getCoreNote() {
        return coreNote;
    }

    function getNotes() {
        return notes;
    }

    function addNote(note) {
        notes.push(note);
    }

    return {
        getCoreNote,
        getNotes,
        addNote
    }
};