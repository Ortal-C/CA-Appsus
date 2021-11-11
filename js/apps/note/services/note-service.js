import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notesDB'
_createNotes();

const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.medicalnewstoday.com%2Farticles%2F322868&psig=AOvVaw1r1rt2H44RP69Ol52Mngrr&ust=1636700372740000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODi1Zjej_QCFQAAAAAdAAAAABAD",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];

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
            backgroundColor: '#e8eaed'
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
        notes.push(_createTxtNote('What should i write?'));
        notes.push(_createTxtNote('Doing some stuff'));
        notes.push(_createTxtNote('Get your shit together'));
        notes.push(_createImgNote("js/apps/note/img/1.jpeg", 'Shocko Moko!'))
        notes.push(_createImgNote("js/apps/note/img/2.jpeg", 'i love u'))
        notes.push(_createTodosNote('To do', [{ txt: 'Sleep', doneAt: null }, { txt: 'Eat', doneAt: 187111111 }]))
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function _createTxtNote(txt) {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt
        },
        style: {
            backgroundColor: '#e8eaed'
        }
    };
}

function _createImgNote(url, title) {
    return {
        id: utilService.makeId(),
        type: 'note-img',
        isPinned: false,
        info: {
            url,
            title
        },
        style: {
            backgroundColor: '#e8eaed'
        }
    };
}

function _createTodosNote(label, [todos]) {
    return {
        id: utilService.makeId(),
        type: 'note-todos',
        isPinned: false,
        info: {
            label,
            todos,
        },
        style: {
            backgroundColor: '#e8eaed'
        }
    };
}
