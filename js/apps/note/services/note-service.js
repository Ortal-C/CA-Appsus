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
    getColors,
    add
};

function query() {
    return storageService.query(NOTES_KEY)
}

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

function add(note) {
    return storageService.post(NOTES_KEY, note);
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function getEmptyNote(type) {
    if (type === 'note-txt') {
        return {
            id: '',
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: ''
            },
            style: {
                backgroundColor: '#e8eaed'
            }
        }
    }
    else if (type === 'note-img') {
        return {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                url: '',
                title: ''
            },
            style: {
                backgroundColor: '#e8eaed'
            }
        };
    }
    else if (type === 'note-todos') {
        return {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                label: '',
                todos: [
                    { txt: '', createdAt: 'Date.now()' },
                    { txt: '', createdAt: 'Date.now()' }
                ]
            },
            style: {
                backgroundColor: '#e8eaed'
            }
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
        notes.push(_createTxtNote('Don\'t give up on your dreams. Go back to sleep', '#cbf0f8'))
        notes.push(_createTxtNote('Get your shit together', '#aecbfa'));
        notes.push(_createTxtNote('I\'m not lazy, i\'m on energy saving mode', '#cbf0f8'))
        notes.push(_createTxtNote('Life is a soup and i\'m a fork', '#aecbfa'));
        notes.push(_createTxtNote('Take a pill at 22:00', '#cbf0f8'));
        notes.push(_createImgNote("https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80", 'Cutie', '#aecbfa'))
        notes.push(_createImgNote("https://images.unsplash.com/photo-1503756234508-e32369269deb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80", 'Vacation asap', '#cbf0f8'))
        notes.push(_createImgNote("https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1228&q=80", 'Buy some flowers for myself', '#aecbfa'))
        notes.push(_createImgNote("https://images.unsplash.com/photo-1537274942065-eda9d00a6293?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80", 'Buy new clothes', '#cbf0f8'))
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function _createTxtNote(txt, backgroundColor = 'e8eaed') {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt
        },
        style: {
            backgroundColor
        }
    };
}

function _createImgNote(url, title, backgroundColor = 'e8eaed') {
    return {
        id: utilService.makeId(),
        type: 'note-img',
        isPinned: false,
        info: {
            url,
            title
        },
        style: {
            backgroundColor
        }
    };
}

function _createTodosNote(label, todos = [], backgroundColor = 'e8eaed') {
    return {
        id: utilService.makeId(),
        type: 'note-todos',
        isPinned: false,
        info: {
            label,
            todos,
        },
        style: {
            backgroundColor
        }
    };
}
