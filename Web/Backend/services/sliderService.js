let Slider = require('../models/Slider.js')

let createSlider = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newSlider = await new Slider(data).save()
            resolve(newSlider)
        } catch (err) {
            reject(err)
        }
    })
}

let updateSlider = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedSlider = await Slider.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            resolve(updatedSlider)
        } catch (err) {
            reject(err)
        }
    })
}

let deleteSlider = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Slider.findByIdAndDelete(id);
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

let getAllSliders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sliders = await Slider.find()
            resolve(sliders)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { createSlider, updateSlider, deleteSlider, getAllSliders }