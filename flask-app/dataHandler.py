import functools, os, sqlite3
from flask import abort

def connect_db(func: callable) -> callable:
    @functools.wraps(func)
    def wrapper_connect_db(*args, **kwargs) -> any:
        db_path = os.path.join(os.path.realpath(os.path.dirname(__file__)), 'data', 'streets.db')
        try:
            with sqlite3.connect(db_path) as db:
                return func(db, *args, **kwargs)
        except sqlite3.Error as e:
            print(e)
            abort(500)
    return wrapper_connect_db

def execute_sql(func: callable) -> callable:
    @functools.wraps(func)
    def wrapper_execute_sql(db: sqlite3.Connection) -> list:
        records = []
        cur = db.cursor()
        cur.execute(func())
        names = [description[0] for description in cur.description]
        rows = cur.fetchall()
        for row in rows:
            rec = {n: row[names.index(n)] for n in names}
            records.append(rec)
        return records
    return wrapper_execute_sql

@connect_db
@execute_sql
def getAll() -> str:
    return '''
select
    id, pos, objtype, old_name, new_name, rename_date, applied
from streets
order by pos, old_name
'''

@connect_db
@execute_sql
def getSettlements() -> str:
    return 'select distinct pos from streets order by pos'

@connect_db
@execute_sql
def getObjectTypes() -> str:
    return 'select distinct objtype from streets order by objtype'

@connect_db
@execute_sql
def getOldNames() -> str:
    return 'select distinct old_name from streets order by old_name'

@connect_db
@execute_sql
def getNewNames() -> str:
    return 'select distinct new_name from streets order by new_name'
