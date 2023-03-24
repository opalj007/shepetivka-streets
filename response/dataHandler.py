import json, sqlite3
from sqlite3 import Error
from response.requestHandler import RequestHandler

class DataHandler(RequestHandler):
    def __init__(self):
        super().__init__()
        self.db_file = 'data/streets.db'
        self.select_sql = None

    def _connect(self):
        conn = None
        try:
            conn = sqlite3.connect(self.db_file)
        except Error as e:
            print(e)
        return conn

    def find(self, table):
        if table == 'streets':
            self.select_sql = '''
select
    id, pos, objtype, old_name, new_name, rename_date, applied
from streets
order by pos, old_name
'''
            self.setStatus(200)
            return True
        else:
            self.setStatus(403)
            return False

    def getContents(self):
        records = []
        with self._connect() as conn:
            cur = conn.cursor()
            cur.execute(self.select_sql)
            names = [description[0] for description in cur.description]
            rows = cur.fetchall()
            for row in rows:
                rec = {n: row[names.index(n)] for n in names}
                records.append(rec)
        self.contents = json.dumps(records)

        self.setContentType("application/json; charset=UTF-8")
        return self.contents.encode(encoding='UTF-8')
