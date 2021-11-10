import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mailsDB'
const LOGGED_USER = {
    mail: 'user@appsus.com',
    fullname: 'Puki Appsus',
}
_createMails();
export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById,
    getNextCarId,
    getLoggedUser,
};

function getLoggedUser(){
    return LOGGED_USER;
}

function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            if (filterBy.topCars) {
                mails = mails.slice(0, 2);
            }
            return mails;
        });
}

function remove(mailId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(MAILS_KEY, mailId);
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
}

function getById(mailId) {
    return storageService.get(MAILS_KEY, mailId);
}

function getNextCarId(mailId) {
    return query()
        .then(mails => {
            const idx = mails.findIndex(mail => mail.id === mailId);
            return (idx === mails.length - 1) ? mails[0].id : mails[idx + 1].id;
        });
}

function getEmptyMail() {
    return {
        id: 'e101',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: utilService.formatDate(Date.now()),
        from: LOGGED_USER.mail,
        to: '',
    };
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Check out this vacation',
                body: 'Hi mami, I really need a vacation. please do something',
                isRead: true,
                isStarred: false,
                sentAt:1416694920000,
                from: 'Mami',
                to: LOGGED_USER.mail,
            },
            {
                id: 'e102',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: true,
                sentAt: 1630880520000,
                from: 'BFF',
                to: LOGGED_USER.mail,
            },
            {
                id: 'e103',
                subject: 'SALE in our store',
                body: `Check out our new summer-collection`,
                isRead: false,
                isStarred: false,
                sentAt: 1625423793000,
                from: 'no-reply@store.com',
                to: LOGGED_USER.mail,

            },
            {
                id: 'e104',
                subject: 'Hey! see what is new for you',
                body: `We're always looking for new ways to help you get more out of Google One. Read on to learn how you can get more out of your membership`,
                isRead: false,
                isStarred: false,
                sentAt: 1483518869000,
                from: 'Google',
                to: LOGGED_USER.mail,
            },
            {
                id: 'e105',
                subject: 'Are you satisfied with order?',
                body: `Your order has been successfully delivered!
                Please confirm with us that you have received your item,
                or let us know if there are any issues with your purchase by clicking the button below.`,
                isRead: true,
                isStarred: true,
                sentAt: 1630083086900,
                from: 'Store',
                to: LOGGED_USER.mail,
            },
            {
                id: 'e106',
                subject: 'Stand By Me - COVER!',
                body: `Check out this song-cover! https://www.youtube.com/watch?v=dU2UUkYoeBs`,
                isRead: false,
                isStarred: false,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'John',
            },
            {
                id: 'e107',
                subject: 'Love you note',
                body: `Hello, I love you won't you tell me your name?`,
                isRead: false,
                isStarred: false,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'My love',
            },
            {
                id: 'e108',
                subject: 'Meeting at TLV',
                body: `Meeting date: 05.03.2021, hour: 12:00. See you there!`,
                isRead: true,
                isStarred: false,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'Bill Gates',
            },

        ];
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

function _createCar(vendor, maxSpeed = 250) {
    const car = {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
    };
    return car;
}