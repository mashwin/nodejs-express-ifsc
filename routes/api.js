const express = require('express');
const router = express.Router();
const Bank = require('../models/bank');

/**
 * retrieve distinct banks
 */
router.get('/banks', function (req, res) {

    Bank.distinct('BANK')
        .then((response) => {

            const banks = [];
            response.map((res) => {
                const obj = {};
                obj.value = res;
                obj.label = res;
                banks.push(obj);
            })

            return res.status(200).send({ banks });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * retrieve states to which the bank
 * belongs
 */
router.post('/states', function (req, res) {
    Bank.find(
        {
            BANK: req.body.bankName
        })
        .then((response) => {

            const items = [];
            response.map((state) => {
                if (items.indexOf(state['STATE']) == -1) {
                    items.push(state['STATE']);
                }
            });

            let states = [];
            items.map((item) => {
                const obj = {};
                obj.value = item;
                obj.label = item;
                states.push(obj);
            });

            return res.status(200).send({ states });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * retrieve cities
 */
router.post('/cities', function (req, res) {
    Bank.find(
        {
            BANK: req.body.bankName,
            STATE: req.body.stateName
        })
        .then((response) => {

            const items = [];
            response.map((city) => {
                if (items.indexOf(city['CITY']) == -1) {
                    items.push(city['CITY']);
                }
            });

            let cities = [];
            items.map((item) => {
                const obj = {};
                obj.value = item;
                obj.label = item;
                cities.push(obj);
            });

            return res.status(200).send({ cities });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * retrieve branches
 */
router.post('/branches', function (req, res) {
    Bank.find(
        {
            BANK: req.body.bankName,
            STATE: req.body.stateName,
            CITY: req.body.cityName
        })
        .then((response) => {

            const items = [];
            response.map((branch) => {
                if (items.indexOf(branch['BRANCH']) == -1) {
                    items.push(branch['BRANCH']);
                }
            });

            let branches = [];
            items.map((item) => {
                const obj = {};
                obj.value = item;
                obj.label = item;
                branches.push(obj);
            });

            return res.status(200).send({ branches });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * method to retrieve banks matching the
 * search criteria
 */
router.post('/banks', function (req, res) {

    Bank.find(
        {
            $and:
                [
                    { 'BANK': req.body.bankName },
                    { 'STATE': req.body.stateName },
                    { 'CITY': req.body.cityName },
                    { 'BRANCH': req.body.branchName }
                ]
        })
        .then((response) => {
            return res.status(200).send({ response });
        })
        .catch((error) => {
            console.log(error);
        })
})


module.exports = router;