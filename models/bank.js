const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankSchema = new Schema({
    BANK: {
        type: String
    },
    IFSC: {
        type: String
    },
    MICR: {
        type: String
    },
    BRANCH: {
        type: String
    },
    ADDRESS: {
        type: String
    },
    CONTACT: {
        type: String
    },
    CITY: {
        type: String
    },
    DISTRICT: {
        type: String
    },
    STATE: {
        type: String
    }
});

const Bank = mongoose.model('bank', bankSchema);

module.exports = Bank;