import functools, sqlite3
from flask import abort

def connect_db(func: callable) -> callable:
    @functools.wraps(func)
    def wrapper_db(*args, **kwargs) -> any:
        try:
            with sqlite3.connect('data/streets.db') as db:
                return func(db, *args, **kwargs)
        except sqlite3.Error as e:
            print(e)
            abort(500)
    return wrapper_db

@connect_db
def getData(db: sqlite3.Connection) -> list:
    selectAllSql = '''
    select
        id, pos, objtype, old_name, new_name, rename_date, applied
    from streets
    order by pos, old_name
    '''
    records = []
    cur = db.cursor()
    cur.execute(selectAllSql)
    names = [description[0] for description in cur.description]
    rows = cur.fetchall()
    for row in rows:
        rec = {n: row[names.index(n)] for n in names}
        records.append(rec)
    return records
