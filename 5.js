import { readDataFromCSV } from "./commonparserfile.js";

// Filepath of CSV
const filePathOfPlaystore = './assets/googleplaystore.csv';
const filePathOfReviews = './assets/googleplaystore_user_reviews.csv';


// Function to count the total number of apps
async function countTotalApps() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Count the number of apps
        const totalApps = appDetails.length;

        return totalApps;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to count the number of unique genres
async function countUniqueGenres() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Extract genres from app details
        const genres = appDetails.map(app => app[9]); 

        // Remove duplicates
        const uniqueGenres = [...new Set(genres)];

        return uniqueGenres.length;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to count the number of unique categories
async function countUniqueCategories() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Extract categories from app details
        const categories = appDetails.map(app => app[1]); // Assuming categories are in the 2nd column

        // Remove duplicates
        const uniqueCategories = [...new Set(categories)];

        return uniqueCategories.length;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to calculate total installs
async function calculateTotalInstalls() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Extract installs from app details and sum them up
        const totalInstalls = appDetails.reduce((total, app) => {
            const installs = parseFloat(app[6].replace(/[,+]/g, '')); // Assuming installs are in the 7th column
            return total + installs;
        }, 0);

        return totalInstalls;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to calculate total play store size
async function calculateTotalPlayStoreSize() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Extract sizes from app details and sum them up
        const totalSize = appDetails.reduce((total, app) => {
            const sizeStr = app[4]; // Assuming size is in the 5th column
            let size = 0;
            if (sizeStr.endsWith('M')) {
                size = parseFloat(sizeStr) * 1024; // Convert MB to KB
            } else if (sizeStr.endsWith('k')) {
                size = parseFloat(sizeStr); // Size is already in KB
            }
            return total + size;
        }, 0);

        return totalSize;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to find the app with the least reviews
async function getAppWithLeastReviews() {
    try {
        // Read data from reviews CSV
        const appReviews = await readDataFromCSV(filePathOfReviews);

        // Count reviews for each app
        const reviewsCount = {};
        
        // Start iterating from the second row (index 1) to exclude the header row
        for (let i = 1; i < appReviews.length; i++) {
            const review = appReviews[i];
            const appName = review[0];
            reviewsCount[appName] = (reviewsCount[appName] || 0) + 1;
        }

        // Find app with least reviews
        let leastReviewedApp = null;
        let minReviews = Infinity;
        for (const appName in reviewsCount) {
            if (reviewsCount[appName] < minReviews) {
                leastReviewedApp = appName;
                minReviews = reviewsCount[appName];
            }
        }

        return leastReviewedApp;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}


// Function to find the app with the most reviews
async function getAppWithMostReviews() {
    try {
        // Read data from reviews CSV
        const appReviews = await readDataFromCSV(filePathOfReviews);

        // Count reviews for each app
        const reviewsCount = {};
        appReviews.forEach(review => {
            const appName = review[0];
            reviewsCount[appName] = (reviewsCount[appName] || 0) + 1;
        });

        // Find app with most reviews
        let mostReviewedApp = null;
        let maxReviews = 0;
        for (const appName in reviewsCount) {
            if (reviewsCount[appName] > maxReviews) {
                mostReviewedApp = appName;
                maxReviews = reviewsCount[appName];
            }
        }

        return mostReviewedApp;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}


// Function to find the app with the most downloads
async function getAppWithMostDownloads() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Initialize variables to track app with most downloads
        let mostDownloadedApp = null;
        let maxInstalls = -1;

        // Iterate through app details to find the app with the most downloads
        for (const app of appDetails) {
            const installs = parseInt(app[6].replace(/[\+,]/g, '')); // Assuming installs are in the 7th column
            if (installs > maxInstalls) {
                maxInstalls = installs;
                mostDownloadedApp = app[0]; // App name is in the 1st column
            }
        }

        return mostDownloadedApp;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Function to find the app with the least downloads
async function getAppWithLeastDownloads() {
    try {
        // Read data from CSV
        const appDetails = await readDataFromCSV(filePathOfPlaystore);

        // Initialize variables to track app with least downloads
        let leastDownloadedApp = null;
        let minInstalls = Infinity;

        // Iterate through app details to find the app with the least downloads
        for (const app of appDetails) {
            const installs = parseInt(app[6].replace(/[\+,]/g, '')); // Assuming installs are in the 7th column
            if (installs < minInstalls) {
                minInstalls = installs;
                leastDownloadedApp = app[0]; // App name is in the 1st column
            }
        }

        return leastDownloadedApp;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Execute all analytics functions
async function executeAnalytics() {
    try {
        const totalApps = await countTotalApps();
        const uniqueGenres = await countUniqueGenres();
        const uniqueCategories = await countUniqueCategories();
        const totalInstalls = await calculateTotalInstalls();
        const totalPlayStoreSize = await calculateTotalPlayStoreSize();
        const mostReviewedApp = await getAppWithMostReviews();
        const leastReviewedApp = await getAppWithLeastReviews();
        const mostDownloadedApp = await getAppWithMostDownloads();
        const leastDownloadedApp = await getAppWithLeastDownloads();

        return {
            totalApps,
            uniqueGenres,
            uniqueCategories,
            totalInstalls,
            totalPlayStoreSize,
            mostReviewedApp,
            leastReviewedApp,
            mostDownloadedApp,
            leastDownloadedApp
        };
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

// Call the function to execute all analytics
executeAnalytics()
.then(result => {
    console.log('Analytics complete.');
    console.log('5.1 : Total number of apps:', result.totalApps);
    console.log('5.3 : Number of unique genres:', result.uniqueGenres);
    console.log('5.4 : Number of unique categories:', result.uniqueCategories);
    console.log('5.10 : Total installs:', result.totalInstalls);
    console.log('5.9 : Total Play Store size:', result.totalPlayStoreSize, 'MB');
    console.log('5.5 : App with the most reviews:', result.mostReviewedApp);
    console.log('5.6 : App with the least reviews:', result.leastReviewedApp);
    console.log('5.7. App having the most downloads :',result.mostDownloadedApp);
    console.log('5.8. App having the least downloads : ',result.leastDownloadedApp);
    
    // Return the results
    return result;
})
.catch(error => {
    console.error(error.message);
});
