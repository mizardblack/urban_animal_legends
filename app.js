let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'keyfpZwKVsD8rJeMF' }).base('appAYEE9wxTZn40KD');

function createNameList(id, species_description) {
    //insert into DOM
    let filler = document.createElement('button');
    filler.innerHTML = species_description + "   #" + id;
    let name_list = document.querySelector('#name_list');
    name_list.appendChild(filler);
    filler.onclick = function () {
        console.log(`${id}is clicked`);
    };
}
function createOverPage(id, species_description) {
    //creat a over page
    let over_page = document.querySelector('#over_page');
    let story_container = document.createElement('div');
    over_page.appendChild(story_container);
    story_container.setAttribute("id", id);
    //create over page content
    let story_title = document.createElement('p');
    story_title.classList.add('story_title');
    story_container.appendChild(story_title);
    let story = document.createElement('p');
    story.classList.add('story');
    story_container.appendChild(story);
    story.innerHTML = `I am a ${species_description}. Blablabla.`;
}
function showOverPage(over_page) {
    if (over_page.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

base('Main table').select({
    view: "Sky"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        //get records
        let species_description = record.get('Species Description');
        let id = record.get('Record ID');
        createNameList(id, species_description);
        createOverPage(id, species_description);
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