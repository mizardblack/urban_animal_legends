let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'keyfpZwKVsD8rJeMF' }).base('appAYEE9wxTZn40KD');

function createNameList(id, species_description) {
}
function createOverPage(id, species_description) {
}


function displayOverPage() {
    let over_page = document.querySelector('#over_page');
    let story_title = document.querySelector('#story_title');
    let story_content = document.querySelector('#story_content');
    story_title.innerHTML = "hfowhfoiw";
    story_content.innerHTML = "ehffhfhjkfhjkehfjwehfwhfjwfhjkwefhjewkh";

    over_page.hidden = false;
    console.log("displaying animals");
}
function hideOverPage() {
    let over_page = document.querySelector('#over_page');
    over_page.hidden = true;
}

base('Main table').select({
    view: "Sky"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        //get records
        let species_description = record.get('Species Description');
        let id = record.get('Record ID');
        //insert into DOM
        let filler = document.createElement('button');
        filler.innerHTML = species_description + "   #" + id;
        let name_list = document.querySelector('#name_list');
        name_list.appendChild(filler);
        filler.onclick = displayOverPage;
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});



// //doesn't work yet
// base('Main table').select({
//     filterByFormula: 'If({PEP Response},"True")',
//     sort: [{ field: "PEP Response", direction: "desc" }],
//     maxRecords: 100,
//     view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     records.forEach(function (record) {
//         let element = document.createElement('div');
//         element.classList.add('age');
//         element.classList.add('additional_memory');
//         element.innerHTML = record.fields.Description;
//         containerElement.appendChild(element);
//         let date_and_time_record = record.get('Date and Time of initial call');
//         let date_and_time_dom = document.querySelector('#date_and_time p');
//         date_and_time_dom.innerHTML = date_and_time_record;
//     });
//     fetchNextPage();
// }, function done(err) {
//     if (err) { console.error(err); return; }
// });