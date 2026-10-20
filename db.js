import {Pool} from "pg"

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "sistema_gestao",
    password: "senai",
    port: 5432
})

export default pool