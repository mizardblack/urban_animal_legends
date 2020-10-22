let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'keyfpZwKVsD8rJeMF' }).base('appAYEE9wxTZn40KD');

function displayOverPage(id, age, species_description, month, date, year, borough, location, animal_condition, final_ranger_action) {
    let over_page = document.querySelector('#over_page');
    let story_title = document.querySelector('#story_title');
    let story_content = document.querySelector('#story_content');
    story_title.innerHTML = `${species_description} <span style='color:grey'>#${id}</span>'s Story`;
    //story content
    story_content.innerHTML = `I am a ${age} ${species_description}. It was ${month} ${date}th, ${year} that a human found me in ${borough}. I was hanging around near ${location} when he was call the ranger. My body condition was ${animal_condition}. I don't know why humans always make such a fuss about seeing me. Anyway, that human called the ranger. When the ranger arrived, I was ${final_ranger_action}.`;

    over_page.hidden = false;
    console.log("displaying animals");
}
function hideOverPage() {
    let over_page = document.querySelector('#over_page');
    over_page.hidden = true;
}

function extractData(view_type) {
    base('Main table').select({
        view: view_type
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
            //translate date_and_time data
            let date_and_time_formated=new Date (date_and_time);
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
            let year=date_and_time_formated.getFullYear();
            let month=date_and_time_formated.toLocaleString('default', { month: 'long' });
            let date=date_and_time_formated.getDate();
            // console.log(`Today is ${month} ${date}th, ${year}. => ${date_and_time_formated}`);
            //insert into DOM
            let filler = document.createElement('button');
            filler.classList.add("filler");
            filler.innerHTML = `◉ ${species_description} <span style='color:grey'>#${id}</span>`;
            let name_list = document.querySelector('#name_list_container');
            name_list.appendChild(filler);
            filler.onclick = function () {
                displayOverPage(id, age, species_description, month, date, year, borough, location, animal_condition, final_ranger_action);
            };
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

