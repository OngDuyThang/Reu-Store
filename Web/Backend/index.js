const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const productRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require('./routes/order.js');
const cors = require('cors');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connect to MongoDB successfully');
    })
    .catch(err => { console.log(err) });

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT || 3000, () => {

})