const express = require("express");
const path = require("path");
const body1 = require('body-parser');
const Student1 = require("./connect");
const encoded = body1.urlencoded({extended:false});

const app = express();

app.use(express.static(path.join(__dirname, '')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/Signup', encoded, async (req, res) => {
    let student = await Student1(req.body);
    student.save()
    .then(() => {
        res.send(`
        <h2>User registered successfully!</h2>
        <p>Click <a href="/">here</a> to register another user or <a href="/login">here</a> to login.</p>
        `);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
        const imgPath = path.join(__dirname, 'error_img', 'errorPage-img.jpg');
        res.sendFile(imgPath,(err)=>{
            if(err){
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        })
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup_img/sign.avif', (req, res) => {
    const imgPath = path.join(__dirname, 'signup_img', 'sign.avif');
    console.log(imgPath);  // Log the image path
    res.sendFile(imgPath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login_img/login_in.jpg', (req, res) => {
    const imgPath = path.join(__dirname, 'login_img', 'login_in.jpg');
    console.log(imgPath);  // Log the image path
    res.sendFile(imgPath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/loggedin', encoded, async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student1.findOne({ email });

        if (student && student.password === password) {
            res.redirect('/homepage');
        } else {
            res.status(401).send('Invalid Username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3000, () => {
    console.log("Server is running on port 8080");
});
