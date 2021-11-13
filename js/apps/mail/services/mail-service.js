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
    postNew,
    remove,
    save,
    getEmptyMail,
    getById,
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

function postNew(mail) {
    return storageService.post(MAILS_KEY, mail);
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

function getEmptyMail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: ``,
        sentAt: Date.now(),
        from: LOGGED_USER.mail,
        to: '',
        criteria: {
            status: 'draft',
            txt: '',
            isRead: true,
            isStarred: false,
            lables: [],
        },
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'sfv0I',
                subject: 'Check out this vacation',
                body: 'Hi mami, I really need a vacation. please do something',
                sentAt:1416694920000,
                from: 'Mami',
                to: LOGGED_USER.mail,
                criteria: {
                    status: 'inbox',
                    txt: 'puki',
                    isRead: false,
                    isStarred: false,
                    lables: ['important', 'memories', 'romantic']
                },
            },
            {
                id:'tRHD8',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                sentAt: 1630880520000,
                from: 'BFF',
                to: LOGGED_USER.mail,
                criteria: {
                    status: 'inbox',
                    txt: 'puki',
                    isRead: true,
                    isStarred: true,
                    lables: ['friends', 'memories']
                },
            },
            {
                id: '2c0lb',
                subject: 'SALE in our store',
                body: `Check out our new summer-collection`,
                sentAt: 1625423793000,
                from: 'no-reply@store.com',
                to: LOGGED_USER.mail,
                criteria: {
                    status: 'inbox',
                    txt: 'puki',
                    isRead: false,
                    isStarred: true,
                    lables: ['spam']
                },

            },
            {
                id:'OAZ4R',
                subject: 'About your job application',
                body: `Hello there! We were really impressed by you in our last interview meeting. Please contact me at my cell to check how we move forward.`,
                sentAt: 1483518869000,
                from: 'Star(t)up',
                to: LOGGED_USER.mail,
                criteria: {
                    status: 'inbox',
                    txt: 'puki',
                    isRead: true,
                    isStarred: false,
                    lables: ['critical', 'work']
                },
            },
            {
                id: 'WFNU0',
                subject: 'Are you satisfied with order?',
                body: `Your order has been successfully delivered!
                Please confirm with us that you have received your item,
                or let us know if there are any issues with your purchase by clicking the button below.`,
                sentAt: 1630083086900,
                from: 'Store',
                to: LOGGED_USER.mail,
                criteria: {
                    status: 'inbox',
                    txt: 'puki',
                    isRead: false,
                    isStarred: false,
                    lables: ['spam',]
                },
            },
            {
                id: 'f3HEq',
                subject: 'Stand By Me - COVER!',
                body: `Check out this song-cover! https://www.youtube.com/watch?v=dU2UUkYoeBs`,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'John',
                criteria: {
                    status: 'sent',
                    txt: 'puki',
                    isRead: false,
                    isStarred: true,
                    lables: ['friends', 'romantic','memories']
                },
            },
            {
                id: 'I47aH',
                subject: 'Love you note',
                body: `Hello, I love you won't you tell me your name?`,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'My love',
                criteria: {
                    status: 'sent',
                    txt: 'puki',
                    isRead: true,
                    isStarred: false,
                    lables: ['romantic']
                },
            },
            {
                id: '2FCgy',
                subject: 'Meeting at TLV',
                body: `Meeting date: 05.03.2022, hour: 12:00. See you there!`,
                sentAt: 1630083086900,
                from: LOGGED_USER.mail,
                to: 'Boss',
                criteria: {
                    status: 'sent',
                    txt: 'puki',
                    isRead: false,
                    isStarred: true,
                    lables: ['important', 'work']
                },
            },

        ];
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}
