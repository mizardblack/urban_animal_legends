let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'keyfpZwKVsD8rJeMF' }).base('appAYEE9wxTZn40KD');

base('Main table').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
        let date_and_time_record = record.get('Date and Time of initial call');
        let date_and_time_dom = document.querySelector('#date_and_time p');
        date_and_time_dom.innerHTML = date_and_time_record;
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});


base('Main table').find('recivfkt5AHSsxKBF', function (err, record) {
    if (err) {
        console.log(err);
        return;
    }
    let species_description_record = record.get('Species Description');
    let species_description_dom = document.querySelector('#species_description p');
    species_description_dom.innerHTML = species_description_record;
});

