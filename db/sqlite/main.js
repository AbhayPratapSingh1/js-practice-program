import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("./data.db");

db.exec(
  `
	CREATE TABLE IF NOT EXISTS people (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name TEXT,
	  age real CHECK (typeof(age) IN ('real', 'integer'))
	) STRICT;
  `,
);

const insertQuery = db.prepare("INSERT INTO people(name, age) VALUES(?,?)");
db.exec("BEGIN");

for (let index = 0; index < 100_000_000; index++) {
  insertQuery.run(`Nm : ${index}`, index);
}

db.exec("END");
