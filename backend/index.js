"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.use(express_1.default.static("./public"));
const allDesignTokenFiles = fs_1.default.readdirSync("./design-tokens");
const defaultConfig = {
    source: [],
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
    const brandConfig = Object.assign({}, defaultConfig);
    const fileNameSansExt = file.split(".")[0];
    brandConfig.source = [`./design-tokens/${file}`];
    brandConfig.platforms.css.buildPath = `public/css/design-tokens/`;
    brandConfig.platforms.css.files[0].destination = `${fileNameSansExt}.css`;
    const generatedFilePath = `${brandConfig.platforms.css.buildPath}${brandConfig.platforms.css.files[0].destination}`;
    const configFilePath = `config-${file}`;
    fs_1.default.writeFileSync(configFilePath, JSON.stringify(brandConfig));
    const proc = (0, child_process_1.exec)(`npx style-dictionary build --config ${configFilePath}`);
    proc.addListener("close", () => {
        let genCSS = fs_1.default.readFileSync(generatedFilePath).toString();
        genCSS = `.${fileNameSansExt}{\n` + genCSS.split("\n").slice(6).join("\n");
        fs_1.default.writeFileSync(generatedFilePath, genCSS);
    });
});
