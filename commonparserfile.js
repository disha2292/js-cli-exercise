import { createReadStream } from "fs";
import { parse } from "csv-parse";

/**
 * Reads data from a CSV file.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<Array<Array<string>>>} A promise that resolves with an array of arrays representing the CSV data.
 */
function readDataFromCSV(filePath) {
    return new Promise((resolve, reject) => {
        try {
            // Create a read stream
            const stream = createReadStream(filePath);
            const dataofPlaystore = [];

            // Parse the CSV data
            stream
                .pipe(parse({ delimiter: ",", from_line: 1 }))
                .on("data", function (row) {
                    dataofPlaystore.push(row);
                })
                .on("error", function (error) {
                    // Handle the errors
                    console.log(error.message);
                    reject(error);
                });
            
            // Resolve the promise after parsing is complete
            stream.on("end", function () {
                resolve(dataofPlaystore);
            });
        } catch (error) {
            reject(error);
        }
    });
}

// Export the readDataFromCSV function
export { readDataFromCSV };
