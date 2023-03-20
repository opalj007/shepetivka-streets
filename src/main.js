document.addEventListener("DOMContentLoaded", function() {
    let data;
    
    fetch('/data')
    .then( response => response.json() )
    .then( records => {
        data = records;
        populate_table(data);
    });
    
    document.querySelectorAll("#filter input").forEach( el => {
        el.addEventListener("input", event => {
            const filtered = data.filter( row => {
                let res = true;
                ['pos', 'objtype', 'old_name', 'new_name'].forEach( f => {
                    const val = document.querySelector(`#filter [name=${f}]`).value;
                    if (val) res = res && row[f].toLowerCase().includes(val.toLowerCase());
                });
                return res;
            });
            populate_table(filtered);
        });
    })
});

function populate_table(data) {
    const table_body  = document.querySelector("#data tbody");
    table_body.innerHTML = ''
    data.forEach( row => {
        let html = "<tr>";
        html += "<td>" + row.pos + "</td><td>" + row.objtype + "</td><td>" + row.old_name + "</td><td>" + row.new_name + "</td><td>" + row.rename_date + "</td>";
        html += "<td>" + (row.applied ? "Yes" : "No") + "</td>";
        html += "</tr>";
        table_body.innerHTML += html;
    });
}
