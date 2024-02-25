const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
let cors=      require('cors')
const app = express();
app.use(cors())
let videoRoutes=    require('./routes/video')


app.use(express.json());



mongoose.connect('mongodb://127.0.0.1:27017/youtube')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));



app.use('/api',videoRoutes)

app.get('/',(req,res)=>{
    res.send('ehehe')

})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));





