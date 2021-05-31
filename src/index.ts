import express from 'express';
import router from './routes';

const app = express();


app.use(express.json());
app.use(router);

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world !");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
