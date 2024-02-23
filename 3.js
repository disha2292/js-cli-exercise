// Importing the readDataFromCSV function from commonparserfile.js
import { readDataFromCSV } from "./commonparserfile.js";

// Filepath of CSV
const filePathOfPlaystore = './assets/googleplaystore.csv';

/**
 * Main function to list apps based on category, rating, size, and type filters.
 * If no filters are provided, it lists apps in descending order of ratings.
 * @param {string} categoryFilter - The category filter (optional).
 * @param {number} ratingFilter - The rating filter (optional).
 * @param {string} sizeFilter - The size filter (optional).
 * @param {string} typeFilter - The type filter (optional).
 * @returns {Promise<Array>} A promise that resolves with an array of filtered apps.
 */
async function listAppsBasedOnFilters(categoryFilter = '', ratingFilter = 0, sizeFilter = '', typeFilter = '') {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Filter apps based on category, rating, size, and type filters
        let filteredApps = appDetails.filter(app => {
            const categoryMatch = categoryFilter === '' || app[2].toLowerCase() === categoryFilter.toLowerCase();
            const ratingMatch = ratingFilter === 0 || parseFloat(app[3]) >= ratingFilter;
            const sizeMatch = sizeFilter === '' || app[5].toLowerCase() === sizeFilter.toLowerCase();
            const typeMatch = typeFilter === '' || app[7].toLowerCase() === typeFilter.toLowerCase();
            return categoryMatch && ratingMatch && sizeMatch && typeMatch;
        });

        // Sort filtered apps by rating in descending order
        filteredApps.sort((a, b) => parseFloat(b[3]) - parseFloat(a[3]));

        return filteredApps;
    } catch (error) {
        throw new Error("Error:", error.message);
    }
}

// Read command line arguments
const categoryFilter = process.argv[2];
const ratingFilter = parseFloat(process.argv[3]) || 0;
const sizeFilter = process.argv[4];
const typeFilter = process.argv[5];

// Call the main function to list apps based on filters
listAppsBasedOnFilters(categoryFilter, ratingFilter, sizeFilter, typeFilter)
    .then(apps => {
        if (apps.length === 0) {
            console.error('No apps found matching the criteria.');
        } else {
            console.log('Apps based on filters:');
            console.table(apps);
        }
    })
    .catch(error => {
        // Handle errors
        console.error("Error:", error.message);
    });
