const router = require('express').Router();
const User = require('../models/User.js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSPHRASE
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            errCode: 0,
            message: 'update user success',
            updatedUser: {
                id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                address: updatedUser.address,
                phoneNumber: updatedUser.phoneNumber,
                isAdmin: updatedUser.isAdmin
            }
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
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

// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'find user success',
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin
            },
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET ALL USERS
router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    const limit = 3;
    try {
        const users = req.query.getNewest
            ? await User.find().sort({ _id: -1 }).limit(limit)
            : await User.find();
        return res.status(200).json({
            errCode: 0,
            message: 'find all users success',
            users
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET USERS STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        return res.status(200).json({
            errCode: 0,
            message: 'get stats success',
            data
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

module.exports = router;