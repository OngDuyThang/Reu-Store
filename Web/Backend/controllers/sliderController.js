let sliderService = require('../services/sliderService.js')

// CREATE
let createSlider = async (req, res) => {
    try {
        let newSlider = await sliderService.createSlider(req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'create slider success',
            newSlider
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// UPDATE
let updateSlider = async (req, res) => {
    try {
        let updatedSlider = await sliderService.updateSlider(req.params.id, req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'update slider success',
            updatedSlider
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// DELETE
let deleteSlider = async (req, res) => {
    try {
        await sliderService.deleteSlider(req.params.id)
        return res.status(200).json({
            errCode: 0,
            message: 'delete success'
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// GET ALL SLIDERS
let getAllSliders = async (req, res) => {
    try {
        let sliders = await sliderService.getAllSliders()
        return res.status(200).json({
            errCode: 0,
            message: 'find all sliders success',
            sliders
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

module.exports = { createSlider, updateSlider, deleteSlider, getAllSliders }