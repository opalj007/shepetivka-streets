// import * as bootstrap from 'bootstrap';
import '../scss/main.scss';

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
    document.querySelectorAll("#streets tbody tr").forEach( tr => {
        if (tr.getAttribute("id") !== "filter") tr.remove();
    });
    const tbody = document.querySelector("#streets tbody");
    data.forEach( row => {
        const tr = document.createElement("tr");
        tr.className = "table-secondary";
        let html = "<td>" + row.pos + "</td><td>" + row.objtype + "</td><td>" + row.old_name + "</td><td>" + row.new_name + "</td><td>" + row.rename_date + "</td>";
        html += "<td>" + (row.applied ? "Yes" : "No") + "</td>";
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });
}
