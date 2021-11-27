if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, './front-end/build')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './front-end/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on Port ${ port }`);
});