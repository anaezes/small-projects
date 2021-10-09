import { writeFile} from "fs";

export const Constants = {
  OUT_FORMAT: ".json",
  OUT_FOLDER: "./output",
};

/**
 * Util function to get file name with timestamp
 */
export const getFileName = () => {
  return (
    Constants.OUT_FOLDER + "/" + new Date().toISOString() + Constants.OUT_FORMAT
  );
};

/**
 * Util function to write data to file
 * @param {string} fileName - The file name
 * @param {string} data - The data
 */
export const writer = (fileName, data) => {
  writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    err
      ? console.log("Error writing file", err)
      : console.log("Successfully wrote file: ", fileName);
  });
}
