const express = require('express');
const multer = require('multer');
const cors = require('cors');
const vision = require('@google-cloud/vision');
const path = require('path');
const { extractMedicineName, searchMedsFromText } = require('./util/functions');

const app = express();
const port = 3000;

app.use(cors());

// Setup Multer pour upload fichier
const upload = multer({ dest: 'uploads/' });

// Init Google Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'omnidrugs-e646e7f72316.json')
});

app.post('/recognize', upload.single('photo'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const [result] = await client.textDetection(filePath);
    console.log('Detection result :', result);
    const medicineName = await extractMedicineName(result.textAnnotations[0]?.description || '');

    console.log("Medicine name detected:", medicineName);
    if (!medicineName) {
      console.log(`No medicine found, returning image description...`);
      return res.json({
        informations: {description: result.textAnnotations[0]?.description}
      })
    }

    const cleaned = medicineName.trim().toLowerCase();

    const meds = await searchMedsFromText(cleaned.toUpperCase());

    if (meds.length > 0) {
      console.log(`Medicine found with name "${cleaned}":`, meds);
      return res.json({ informations: meds[0] });
    } else {
      console.log(`No medicine found with name "${cleaned}", returning description...`);
      return res.json({
        informations: result.textAnnotations[0]?.description
      })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error during medicine recognition.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on http://localhost:${port}`);
});
