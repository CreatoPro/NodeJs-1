const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Apify = require('apify');
const requestPromise = require('request-promise');

Apify.main(async () => {
    // Fetch the input and check it has a valid format
    // You don't need to check the input, but it's a good practice.
    const input = await Apify.getValue('INPUT');
    if (!input || !input.url) throw new Error('Received invalid input');

    console.log(`Downloading PDF file: ${input.url}`);
    const options = {
        url: input.url,
        encoding: null // set to `null`, if you expect binary data.
    };
    const response = await requestPromise(options);
    const buffer = Buffer.from(response);

    const tmpTarget = 'temp.pdf';
    console.log('Saving PDF file to: ' + tmpTarget);
    fs.writeFileSync(tmpTarget, buffer);

    const { stdout, stderr } = await exec('pdf2htmlEX --zoom 1.3 temp.pdf');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);

    const htmlBuffer = fs.readFileSync('temp.html');

    console.log(`Saving HTML (size: ${htmlBuffer.length} bytes) to output...`);
    await Apify.setValue('OUTPUT', htmlBuffer, { contentType: 'text/html' });

    const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;

    // NOTE: Adding disableRedirect=1 param, because for some reason Chrome doesn't allow pasting URLs to PDF
    // that redirect into the browser address bar (yeah, wtf...)
    console.log('HTML file has been stored to:');
    console.log(`https://api.apify.com/v2/key-value-stores/${storeId}/records/OUTPUT`);
});