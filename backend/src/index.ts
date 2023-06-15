import fs from "fs";
import cors from "cors";
import express from "express";
import formidable, { File } from "formidable";
import path from "path";
import { generateBrandCSS } from "./design-tokens/script";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(cors({ origin: "*" }));
app.use(express.static("./public"));
const brandTokensList: { brandName: string; cssFile: string }[] = [];

const tokenStorageLocation = path.join(__dirname, "design-tokens/token-files");

app.post("/brand-tokens", (req, res, next) => {
  const form = new formidable.IncomingForm();
  const files: File[] = [];
  const fields: Record<string, string> = {};
  form.on("file", (fieldName, file) => {
    files.push(file);
  });
  form.on("field", (name, value) => {
    fields[name] = value;
  });
  form.parse(req, () => {
    files.forEach(async (file, index) => {
      const oldPath = file.filepath;
      try {
        fs.lstatSync(tokenStorageLocation);
      } catch (err) {
        fs.mkdirSync(tokenStorageLocation);
      }
      const newPath = path.join(
        __dirname,
        "design-tokens/token-files",
        fields["name"] + ".json"
      );
      fs.renameSync(oldPath, newPath);
      console.log(`Saved file ${newPath}`);
      saveCompletedFileCount++;
      if (index === files.length - 1) {
        if (saveCompletedFileCount === files.length) {
          const generatedCSSPath = await generateBrandCSS(fields.name, newPath);
          brandTokensList.push({
            brandName: fields.name,
            cssFile: generatedCSSPath,
          });
          res.json(brandTokensList);
        } else {
          res.sendStatus(207);
        }
      }
    });
  });
  let saveCompletedFileCount = 0;
});
