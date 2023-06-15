import { exec } from "child_process";
import fs from "fs";
import path from "path";
// TODO: Add sd transform to add units to unitless stuff in tokens and run this script from index.ts
const configDir = path.join(__dirname, "configs");

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

export const generateBrandCSS = (
  brandName: string,
  file: string
): Promise<string> => {
  const brandConfig = { ...defaultConfig };
  brandConfig.source = [file];
  brandConfig.platforms.css.buildPath = `public/css/design-tokens/`;
  brandConfig.platforms.css.files[0].destination = `${brandName}.css`;
  const generatedFilePath = `${brandConfig.platforms.css.buildPath}${brandConfig.platforms.css.files[0].destination}`;
  const configFilePath = path.join(configDir, `config-${brandName}.json`);
  try {
    fs.lstatSync(configDir);
  } catch (err) {
    fs.mkdirSync(configDir);
  }
  fs.writeFileSync(configFilePath, JSON.stringify(brandConfig));
  const proc = exec(`npx style-dictionary build --config ${configFilePath}`);
  return new Promise((resolve) => {
    proc.addListener("close", () => {
      let genCSS = fs.readFileSync(generatedFilePath).toString();
      genCSS = `.${brandName} {\n` + genCSS.split("\n").slice(6).join("\n");
      fs.writeFileSync(generatedFilePath, genCSS);
      resolve(generatedFilePath);
    });
  });
};
