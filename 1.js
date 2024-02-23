// Extract command-line arguments
const [,, ...args] = process.argv; // Destructuring 

// Check if the --search option is provided
const searchIndex = args.indexOf('--search');
const searchQuery = searchIndex !== -1 && searchIndex + 1 < args.length ? args[searchIndex + 1] : null;
const filePathOfPlaystore = "./assets/googleplaystore.csv"

import { readDataFromCSV } from './commonparserfile.js';

/**
 * Reads data from the CSV file.
 * @returns {Promise<Array<Array<string>>>} A promise that resolves with the data read from the CSV file.
 */
async function readCSVData() {
    try {
        return await readDataFromCSV(filepath);
    } catch (error) {
        throw new Error(`Error reading CSV data: ${error.message}`);
    }
}

/**
 * Processes data from the CSV file based on the search query.
 * @param {string} searchQuery - The search query to filter data by app name.
 * @returns {Promise<Array<Object>>} A promise that resolves with the filtered data.
 */
async function processData(searchQuery) {
    try {
        // Read data from the CSV file
        const playStoreInfo = await readDataFromCSV(filePathOfPlaystore);

        // Extract app names and reviews from the play store info
        const [appNames, reviews] = [0, 3].map(column => playStoreInfo.map(entry => entry[column]));

        // Combine app names and reviews into an array of objects
        let filteredAppData = appNames.map((appName, index) => ({ App: appName, Reviews: reviews[index] }));

        // Filter data based on search query if provided
        if (searchQuery) {
            const searchResult = filteredAppData.filter(entry =>
                entry.App.toLowerCase().includes(searchQuery.toLowerCase())
            );
            filteredAppData = searchResult;
        }
        
        // Return the filtered data
        return filteredAppData;
    } catch (error) {
        throw new Error(`Error processing data: ${error.message}`);
    }
}

// Process data
processData(searchQuery)
    .then((filteredData) => {
        console.log(filteredData);
    })
    .catch((error) => {
        console.error(error.message);
    });
