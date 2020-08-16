window.app = window.app || { };

app.Barre = function(f, t) {
    let from = f;
    let to = t;
    let notes = [];

    function getFrom() {
        return from;
    }

    function getTo() {
        return to;
    }

    function getNotes() {
        return notes;
    }

    function addNote(note) {
        notes.push(note);
    }

    return {
        getFrom,
        getTo,
        getNotes,
        addNote
    }
};