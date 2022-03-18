const { v4: uuidv4 } = require('uuid')
const admin = require("firebase-admin")

const credentialFirebase = require("../../firebase-credentials.json")

admin.initializeApp({
    credential: admin.credential.cert(credentialFirebase),
    databaseURL: 'https://handlinghbs-default-rtdb.firebaseio.com/'
});

const db = admin.database();

const homePage = (req, res) => {
    db.ref('books/').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { books: data })
    })
}

const postBook = (req, res) => {
    const { title, author, year } = req.body;
    const newBook = {
        title,
        author,
        year
    }

    db.ref('books/').push(newBook)
    res.redirect("/")

}

const deleteBook = (req, res) => {
    const { id } = req.params
    db.ref('books/' + id).remove();
    res.redirect('/')
}

module.exports = {
    homePage,
    postBook,
    deleteBook
}