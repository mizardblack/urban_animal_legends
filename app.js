let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'keyfpZwKVsD8rJeMF' }).base('appAYEE9wxTZn40KD');

function createNameList(id, species_description) {
}
function createOverPage(id, species_description) {
}


function displayOverPage(id, age, species_description, date_and_time, borough, location, animal_condition, final_ranger_action) {
    let over_page = document.querySelector('#over_page');
    let story_title = document.querySelector('#story_title');
    let story_content = document.querySelector('#story_content');
    story_title.innerHTML = `${species_description} #${id}'s Story`;
    story_content.innerHTML = `I am a ${age} ${species_description}. It was ${date_and_time} that a human found me in ${borough}. I was hanging around near ${location} when he was call the ranger. My body condition was ${animal_condition}. I don't know why humans always make such a fuss about seeing me. Anyway, that human called the ranger. When the ranger arrived, I was ${final_ranger_action}.`;

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
        let date_and_time = record.get('Date and time of Ranger response');
        let age = record.get("Age");
        let borough = record.get('Borough');
        let location = record.get('Location');
        let animal_condition = record.get('Animal Condition');
        let final_ranger_action = record.get('Final Ranger Action');
        //insert into DOM
        let filler = document.createElement('button');
        filler.innerHTML = species_description + "   #" + id;
        let name_list = document.querySelector('#name_list');
        name_list.appendChild(filler);
        filler.onclick = function () {
            displayOverPage(id, age, species_description, date_and_time, borough, location, animal_condition, final_ranger_action);
        };
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
