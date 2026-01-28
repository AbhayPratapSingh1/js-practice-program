import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

db.exec("create table temp (id int AutoIncrement, name varchar(100))");

const dat = db.prepare("INSERT").all();



for (let index = 0; index < 10000; index++){

}

db.close();
