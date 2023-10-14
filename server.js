const legoData = require('./modules/legoSets');
const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/lego/sets', async (req, res) => {
    const theme = req.query.theme;

    try {
        let sets = await legoData.getAllSets();

        if (theme) {
            sets = sets.filter((set) => set.theme.toUpperCase().includes(theme.toUpperCase()));
        }

        res.send(sets);
    } catch (err) {
        res.status(404).send(err);
    }
});

app.get('/lego/sets/:setNum', async (req, res) => {
    const setNum = req.params.setNum;

    try {
        let set = await legoData.getSetByNum(setNum);

        if (set) {
            res.send(set);
        } else {
            res.status(404).send('Lego set not found');
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

// Custom 404 Error Page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on: ${HTTP_PORT}`);
    });
});
