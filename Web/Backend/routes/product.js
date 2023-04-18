const router = require('express').Router();
const Product = require('../models/Product.js');
const { verifyTokenAndAdmin } = require('./verifyToken')

// CREATE
router.post('/create', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        await newProduct.save();
        return res.status(200).json({
            errCode: 0,
            message: 'save product success'
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            errCode: 0,
            message: 'update product success',
            updatedProduct
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
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
})

// GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'find product success',
            product
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET ALL PRODUCTS
router.get('/findAll', async (req, res) => {
    let products;
    const getNewest = req.query.getNewest;
    const getByCategories = req.query.getByCategories;
    const limit = 8;
    try {
        if (getNewest) {
            if (getByCategories) {
                products = await Product.find({
                    categories: {
                        $in: [getByCategories],
                    }
                }).sort({ _id: -1 }).limit(limit);
            } else {
                products = await Product.find().sort({ _id: -1 }).limit(limit);
            }
        } else {
            if (getByCategories) {
                products = await Product.find({
                    categories: {
                        $in: [getByCategories],
                    }
                });
            } else {
                products = await Product.find();
            }
        }

        return res.status(200).json({
            errCode: 0,
            message: 'find all products success',
            products
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

module.exports = router;