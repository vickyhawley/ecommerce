const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['shkuduyduyawaefdxtfco']
}));


app.get('/', (req, res) => {
    res.send(`
    <div>
    Your Id is: ${req.session.userId}
    <form method="POST">
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" />
    <input name="passwordConfirm" placeholder="password confirmation" />
    <button>Sign Up</button>
    </form>
    </div>
    `);
});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirm } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email already in use');
    }
    if (password !== passwordConfirmation) {
        return res.send('Passwords do not match');
    }
    // create user in our user repo to represent this person
    const user = await usersRepo.create({email, password});

    // store id of that user inside the users cookie
    req.session.userId = user.id;

    res.send('Account created!')
});

app.listen(3000, () => {
    console.log('listening');
});