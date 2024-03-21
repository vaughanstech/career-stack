import * as fs from "fs";
import * as path from "path";

const directoryPath = path.join("./", "data");
const filePath = path.join(directoryPath, "data.json");

const checkFileExists = () => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

export const createFile = () => {
  if (!checkFileExists()) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    fs.writeFileSync(filePath, "", "utf-8");
    console.log("File created: ", filePath);
  }
};
