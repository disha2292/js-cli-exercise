// Importing the readDataFromCSV function from commonparserfile.js
import { readDataFromCSV } from "./commonparserfile.js";

// Filepath of CSV
const filePathOfPlaystore = './assets/googleplaystore.csv';
const filePathOfReviews = './assets/googleplaystore_user_reviews.csv';

// Read app name from command line arguments
const appName = process.argv[2];

// If no app name provided, log a message and exit
if (!appName) {
    console.error('Please provide the app name as an argument.');
    process.exit(1);
} else {
    // Call main function to fetch app details and reviews
    getAppdetailsandReviews(appName)
        .then(data => {
            console.table(data.appDetails);
            console.log('\nReviews:');
            console.table(data.appReviews);
        })
        .catch(error => {
            // Handle errors 
            console.error("Error:", error.message);
        });
}

/**
 * Function to get details of an app.
 * @param {string} appName - The name of the app to get details for.
 * @param {Array} appDetails - Array containing details of all apps.
 * @returns {Array} Array containing details of the specified app.
 */
function getAppDetails(appName, appDetails) {
    const appDetail = appDetails.find(app => app[0] === appName);

    if (!appDetail) {
        throw new Error(`App ${appName} not found.`);
       
    }

 
}

/**
 * Function to get reviews of an app.
 * @param {string} appName - The name of the app to get reviews for.
 * @param {Array} appReviews - Array containing reviews of all apps.
 * @returns {Array} Array containing reviews of the specified app.
 */
function getAppReviews(appName, appReviews) {
    const reviews = appReviews.filter(review => review[0] === appName);

    if (reviews.length === 0) {
        console.log(`No reviews found for ${appName}.`);
    }

    return reviews;
}
/**
 * function to fetch app details and reviews.
 * @param {string} appName - The name of the app to get details for.
 * @returns {Promise<Object>} A promise that resolves with an object containing app details and reviews.
 */
async function getAppdetailsandReviews(appName) {
    try {
        const [appDetails, appReviews] = await Promise.all([
            readDataFromCSV(filePathOfPlaystore),
            readDataFromCSV(filePathOfReviews)
        ]);
        const filteredAppDetails = getAppDetails(appName, appDetails);
        const filteredAppReviews = getAppReviews(appName, appReviews);
        return { appDetails: filteredAppDetails, appReviews: filteredAppReviews };
    } catch (error) {
        throw new Error("Error:", error.message);
       
    }
}
