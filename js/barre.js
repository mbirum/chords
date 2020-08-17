window.app = window.app || { };

app.Barre = function(f, t) {
    let from = f;
    let to = t;
    let notes = [];

    createNotes();

    function createNotes() {
        let from = getFrom();
        let to = getTo();

        let leftOffset = -12;
        let topOffset = -15;

        let xDiff = to.x - from.x;
        let increment = xDiff / 6;

        let relativeX = to.x - from.x;
        let relativeY = Math.abs(to.y - from.y);

        let k = relativeY / relativeX;

        for (let i = 0; i < 6; i++) {
            let x = (from.x + (i * increment));
            let newRelativeX = x - from.x;
            let newRelativeY = k * newRelativeX;
            let y = Math.abs(newRelativeY - from.y)
            notes.push(new app.Note(x + leftOffset, y + topOffset));
        }
    }

    function getFrom() {
        return from;
    }

    function getTo() {
        return to;
    }

    function getNotes() {
        return notes;
    }

    return {
        getFrom,
        getTo,
        getNotes
    }
};