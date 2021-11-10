import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const LOGGED_USER = {
    email: 'user@appsus.com',
    fullname: 'Puki Appsus',
}
const EMAILS_KEY = 'emailsDB'
_createEmails();

export const emailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    getById,
    getNextCarId
};

function query(filterBy = {}) {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            if (filterBy.topCars) {
                emails = emails.slice(0, 2);
            }
            return emails;
        });
}

function remove(emailId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) return storageService.put(EMAILS_KEY, email);
    else return storageService.post(EMAILS_KEY, email);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function getNextCarId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId);
            return (idx === emails.length - 1) ? emails[0].id : emails[idx + 1].id;
        });
}

function getEmptyEmail() {
    return {
        id: 'e101',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        from: LOGGED_USER.email,
        to: '',
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Check out this vacation',
                body: 'Hi mami, I really need a vacation. please do something',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                from: 'Mami',
                to: LOGGED_USER.email,
            },
            {
                id: 'e102',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                from: 'BFF',
                to: LOGGED_USER.email,
            },
            {
                id: 'e103',
                subject: 'SALE in our store',
                body: `Check out our new winter-collection`,
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                from: 'no-reply@store.com',
                to: LOGGED_USER.email,

            },
            {
                id: 'e104',
                subject: 'Hey! see what is new for you',
                body: `We're always looking for new ways to help you get more out of Google One. Read on to learn how you can get more out of your membership`,
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                from: 'Google',
                to: LOGGED_USER.email,
            },
            {
                id: 'e105',
                subject: 'I miss my phillip',
                body: `Hi, want to tell you that I miss my phillip what should I do?`,
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                from: 'Lizi',
                to: LOGGED_USER.email,
            },

        ];
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}

function _createCar(vendor, maxSpeed = 250) {
    const car = {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
    };
    return car;
}