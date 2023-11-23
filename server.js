const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "PerfectFit", "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link 
app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) {
      return res.status(400).send('No file was uploaded.');
    }
  
    let file = req.files.image;
    let date = new Date();
    // Image name
    let imageName = date.getTime() + file.name;
    // Image upload path
    let uploadPath = path.join(__dirname, 'public', 'uploads', imageName);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading the file.');
      }
  
      // Return the path to the uploaded image
      res.json(`/uploads/${imageName}`);
    });
  });
  

app.listen("3000", () => {
    console.log('listening......');
})