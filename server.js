// EXPRESS CONFIGURATION
const express = require("express")
// Tells node that we are creating an "express" server
const app = express()
//The path package to get the correct file path for our html
const path = require("path")
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const tableUsers = []

const waitListUsers = []


// HTML GET Requests
// Below code handles when users "visit" a page.
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/home.html"))
})

app.get("/tables", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/tables.html"))
})

app.get("/reserve", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/reserve.html"))
})


//API GET Requests
//Below cases when a user visits a link
app.get("/api/tables", (req, res) => {
   res.json(tableUsers);
});
app.get("/api/waitlist", (req, res) => {
   res.json(waitListUsers);
});


// API POST Requests
// Below code handles when a user submits a form, this data is then sent to the server..
app.post("/api/tables", (req, res) => {

   //Our "server" will respond to requests and let User know if they have a table or not.
   // It will do this by sending out the value "true" have a table
   if (tableUsers.length < 5) {
      tableUsers.push(req.body);
      res.json(true);
   }
   else {
      waitListUsers.push(req.body);
      res.json(false);
   }
});

//this below code clear out the table while working with the functionality.
app.post("/api/clear", (req, res) => {
   // Empty out the arrays of data
   tableUsers.length = 0;
   waitListUsers.length = 0;

   res.json({ ok: true });
});

// app.post("/api/tables", (req, res) => {
//    let newUser = req.body;
//    newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();

//    console.log(newUser);

//    users.push(newUser);

//    res.json(newUser);
// });

//Starts our server
app.listen(PORT, () => {
   console.log("App listening on PORT " + PORT)
})