const express = require("express");

 const path = require("path");



const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const eventsRoute = require("./routes/eventsRoute");
const rsvpRoute = require("./routes/rsvpRoutes");
const engine = require("ejs-locals");
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(methodOverride('_method')); 

// Serve static files from public directory
app.use(express.static("public"));

// Serve static files from public directory
 app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the template engine
app.set("view engine", "ejs");
 app.set("views", path.join(__dirname, "views"));

app.set("Views", "./Views"); 

// Routes setup
app.use("/events", eventsRoute);
app.use("/rsvp", rsvpRoute); // Connect RSVP routes

app.get("/", (req, res) => {
    res.render("home", { title: "Home" }); // Render home.ejs
  });

// valid middleware
app.use((req, res, next) => {
    console.log("Middleware executed");
    next();
})  

app.get("/", (req,res)=>{
    res.send('events api')
} )
//404 error
app.use((req, res, next) => {
    res.status(404).json({ error: "Resource Not Found" });
});

// Error handling middleware (should be last)
app.use(errorHandler);



// module.exports = (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next(); // Pass control to the next middleware in the stack
//   };
  
// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));