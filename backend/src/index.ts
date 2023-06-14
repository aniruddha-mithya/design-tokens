import fs from "fs";
import { exec } from "child_process";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.static("./public"));

const allDesignTokenFiles = fs.readdirSync("./design-tokens");

const defaultConfig = {
  source: [] as string[],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "",
      files: [
        {
          destination: "",
          format: "css/variables",
        },
      ],
    },
  },
};


allDesignTokenFiles.forEach((file) => {
  const brandConfig = { ...defaultConfig };
  const fileNameSansExt = file.split(".")[0];
  brandConfig.source = [`./design-tokens/${file}`];
  brandConfig.platforms.css.buildPath = `public/css/design-tokens/`;
  brandConfig.platforms.css.files[0].destination = `${fileNameSansExt}.css`;
  const generatedFilePath = `${brandConfig.platforms.css.buildPath}${brandConfig.platforms.css.files[0].destination}`;
  const configFilePath = `config-${file}`;
  fs.writeFileSync(configFilePath, JSON.stringify(brandConfig));
  const proc = exec(`npx style-dictionary build --config ${configFilePath}`);
  proc.addListener("close", () => {
    let genCSS = fs.readFileSync(generatedFilePath).toString();
    genCSS = `.${fileNameSansExt}{\n` + genCSS.split("\n").slice(6).join("\n");
    fs.writeFileSync(generatedFilePath, genCSS);
  });
});
