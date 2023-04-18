const router = require('express').Router();
const Slider = require('../models/Slider.js');
const { verifyTokenAndAdmin } = require('./verifyToken')
const { createSlider, updateSlider, deleteSlider, getAllSliders } = require('../controllers/sliderController.js')

// CREATE
router.post('/create', verifyTokenAndAdmin, createSlider)

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, updateSlider)

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, deleteSlider)

// GET ALL SLIDERS
router.get('/findAll', getAllSliders)

module.exports = router;