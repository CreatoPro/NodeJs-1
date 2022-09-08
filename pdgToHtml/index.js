const { ApifyClient } = require('apify-client');
const Apify = require('apify');
const requestPromise = require('request-promise');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_iBc0SaUbJcova9HmaRrwBjvmE601lc2iDLa6',
});

// Prepare actor input
const input = {
    "url": "https://amplify-reactamplified-dev-172958-deployment.s3.amazonaws.com/s3/ieep117.pdf"
};

(async () => {
    // Run the actor and wait for it to finish
    const run = await client.actor("jancurn/pdf-to-html").call(input);
    const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
    // Fetch and print actor results from the run's dataset (if any)
    console.log('Results from dataset');
    console.log(`https://api.apify.com/v2/key-value-stores/${storeId}/records/OUTPUT`);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        console.dir(item);
        
    });
})();