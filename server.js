const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'))

// Upload Endpoint
app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.image
  const fileName = req.files.image.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.image.name}`,
      })
    },
  )
})

app.listen(5000, () => console.log('Server Started...'));
