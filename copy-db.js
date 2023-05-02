const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

const db_path = path.join(__dirname, 'data', 'streets.db');
const json_path = path.join(__dirname, 'dist', 'streets.json');

function createDbConnection(filename) {
    return open({
        filename,
        driver: sqlite3.Database
    });
}
        
(async () => {
    try {
        sqlite3.verbose();
        const db = await createDbConnection(db_path);
        // console.log('Connected');
        const sql = `
        select
        id, pos, objtype, old_name, new_name, rename_date, applied
        from streets
        order by pos, old_name
        `
        const data = JSON.stringify(await db.all(sql, []), null, 2);
        return await fs.promises.writeFile(json_path, data);
    } catch (err) {
        console.error(err.message);
    }
})();
