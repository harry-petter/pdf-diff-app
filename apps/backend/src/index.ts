import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import cors from 'cors';
import { diffLines } from 'diff';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

app.post('/diff', upload.fields([{ name: 'pdf1' }, { name: 'pdf2' }]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!files || !files['pdf1'] || !files['pdf2']) {
      return res.status(400).json({ error: 'Both PDF files are required.' });
    }
    const pdf1Buffer = files['pdf1'][0].buffer;
    const pdf2Buffer = files['pdf2'][0].buffer;
    const [data1, data2] = await Promise.all([
      pdfParse(pdf1Buffer),
      pdfParse(pdf2Buffer)
    ]);
    const diff = diffLines(data1.text, data2.text);
    res.json({ diff });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process PDFs', details: err });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`PDF Diff backend running on port ${PORT}`);
});