const express = require('express');
const router = express.Router();
const Bank = require('../models/bank');

/**
 * method to retrieve all distinct banks
 */
router.get('/banks', function (req, res) {

    Bank.distinct('BANK')
        .then((response) => {

            const banks = [];
            response.map((res) => {
                const obj = {};
                obj.key = res;
                obj.value = res;
                obj.text = res;
                banks.push(obj);
            })

            return res.status(200).send({ banks });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * method to retrieve states to which bank
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
                obj.key = item;
                obj.value = item;
                obj.text = item;
				states.push(obj);
			});
			
            return res.send({ states });
        })
        .catch((error) => {
            console.log(error);
        })
})

/**
 * method to retrieve cities to which bank
 * belongs
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
                obj.key = item;
                obj.value = item;
                obj.text = item;
				cities.push(obj);
			});
			
            return res.send({ cities });
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
				{'BANK': req.body.bankName},
				{'STATE': req.body.stateName},
				{'CITY': req.body.cityName}				
			]
        })
        .then((response) => {
            return res.send({ response });
        })
        .catch((error) => {
            console.log(error);
        })
})


module.exports = router;