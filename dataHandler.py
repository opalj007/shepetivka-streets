import sqlite3
from sqlite3 import Error

def _connect():
    conn = None
    try:
        conn = sqlite3.connect('data/streets.db')
    except Error as e:
         print(e)
    return conn

_sql = '''
select
    id, pos, objtype, old_name, new_name, rename_date, applied
from streets
order by pos, old_name
'''

def getData():
    records = []
    with _connect() as conn:
        cur = conn.cursor()
        cur.execute(_sql)
        names = [description[0] for description in cur.description]
        rows = cur.fetchall()
        for row in rows:
            rec = {n: row[names.index(n)] for n in names}
            records.append(rec)
    return records
