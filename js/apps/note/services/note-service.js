import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notesDB'
_createNotes();

export const noteService = {
    query,
    remove,
    save,
    getById,
    getEmptyNote
};

function query() {
    return storageService.query(NOTES_KEY)
}

// function query(filterBy = {}) {
//     return storageService.query(CARS_KEY)
//         .then(cars => {
//             if (filterBy.topCars) {
//                 cars = cars.slice(0, 2);
//             }
//             return cars;
//         });
// }

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

// function getNextCarId(carId) {
//     return query()
//         .then(cars => {
//             const idx = cars.findIndex(car => car.id === carId);
//             return (idx === cars.length - 1) ? cars[0].id : cars[idx + 1].id;
//         });
// }

function getEmptyNote() {
    return {
        id: '',
        type: '',
        info: {
            txt: ''
        },
        style: {
            backgroundColor: ''
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(_createNote('note-txt', 'What should i write?'));
        notes.push(_createNote('note-txt', 'I\'m a cutie'));
        notes.push(_createNote('note-txt', 'Doing some stuff'));
        notes.push(_createNote('note-txt', 'Get your shit together'));
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function _createNote(type, txt) {
    const note = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info: {
            txt
        }
    };
    return note;
}