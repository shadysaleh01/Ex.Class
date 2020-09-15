const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => { console.log("App listening on PORT " + PORT) })

const users = [
   {
      routeName: "",
      name: "",
      phoneNumber: "",
      email: "",
      uniqueId: ""
   }
]


app.get("/", (req, res) => {
   res.sendFile(path.json(__dirname + "/home.html"))

})
app.get("/tables", (req, res) => {
   res.sendFile(path.json(__dirname + "/tables.html"))
})

app.get("/reserve", (req, res) => {
   res.sendFile(path.json(__dirname + "/reserve.html"))
})



app.get("/api/users", (req, res) => {
   return res.json(users);
});

app.get("/api/users/:user", (req, res) => {
   let chosen = req.params.user;

   console.log(chosen);

   for (var i = 0; i < users.length; i++) {
      if (chosen === users[i].routeName) {
         return res.json(users[i]);
      }
   }
   return res.json(false);
});


app.post("/api/users", (req, res) => {
   let newUser = req.body;
   newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();

   console.log(newUser);

   users.push(newUser);

   res.json(newUser);
});