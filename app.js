const base = require('airtable').base('appAYEE9wxTZn40KD');

let Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyfpZwKVsD8rJeMF'
});
let base = Airtable.base('appAYEE9wxTZn40KD');


base()
