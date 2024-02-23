import { readDataFromCSV } from "./commonparserfile.js";

const POSITIVE_SENTIMENT = 'Positive';
const MAX_SUBJECTIVITY = 0.5;
const APP_NAME_COLUMN_INDEX = 0;
const filePathOfReviews = './assets/googleplaystore_user_reviews.csv';

async function filterAppsBasedOnSentiment() {
    try {
        const appReviews = await readDataFromCSV(filePathOfReviews).catch(error => {
            throw new Error("An error occurred while reading data from CSV: " + error.message);
        });

        const SENTIMENT_COLUMN = 'Sentiment';
        const SENTIMENT_SUBJECTIVITY_COLUMN = 'Sentiment_Subjectivity';

        const sentimentIndex = appReviews[0].indexOf(SENTIMENT_COLUMN);
        const sentimentSubjectivityIndex = appReviews[0].indexOf(SENTIMENT_SUBJECTIVITY_COLUMN);

        const filteredApps = appReviews.filter((review, index) => {
            if (index === 0) return false;
            const sentiment = review[sentimentIndex];
            const sentimentSubjectivity = parseFloat(review[sentimentSubjectivityIndex]);
            return sentiment === POSITIVE_SENTIMENT && sentimentSubjectivity >= 0 && sentimentSubjectivity <= MAX_SUBJECTIVITY;
        });

        const appNames = filteredApps.map(review => review[APP_NAME_COLUMN_INDEX]);
        return appNames;
    } catch (error) {
        throw new Error("An error occurred while filtering apps: " + error.message);
    }
}

filterAppsBasedOnSentiment()
    .then(apps => {
        if (apps.length === 0) {
            console.log('No apps found matching the criteria.');
        } else {
            console.log('Apps with highest objective and positive review sentiment:');
            console.table(apps);
        }
    })
    .catch(error => {
        console.error("Error:", error.message);
    });




  
