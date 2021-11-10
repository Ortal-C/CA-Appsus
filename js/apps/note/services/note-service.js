import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notesDB'
_createNotes();

export const noteService = {
    query,
    remove,
    save,
    getById,
    getEmptyNote,
    update,
    getColors
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

function update(note) {
    return storageService.put(NOTES_KEY, note)
}

function save(note) {
    console.log('Note id', note.info.txt);
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

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

function getColors() {
    return [
        { color: '#f28b82' },
        { color: '#fbbc04' },
        { color: '#fff475' },
        { color: '#ccff90' },
        { color: '#a7ffeb' },
        { color: '#cbf0f8' },
        { color: '#aecbfa' },
        { color: '#d7aefb' },
        { color: '#fdcfe8' },
        { color: '#e6c9a8' },
        { color: '#e8eaed' },
        { color: '#ffffff' },
    ]
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

function _createNote(type, txt, backgroundColor = '#e8eaed') {
    const note = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info: {
            txt
        },
        style: {
            backgroundColor
        }
    };
    return note;
}