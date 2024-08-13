const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/user');


app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
