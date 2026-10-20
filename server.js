import express from "express"
import cors from "cors"
import pool from "./db.js"


const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.get('/usuario', async (req, res) =>{
    const usuarios =  await pool.query('SELECT * FROM usuarios')
    res.json(usuarios.rows)
})

app.post('/usuario', async (req, res) =>{
    const {nome, email, cpf} = req.body
    const NovoUsuarios =  await pool.query('INSERT INTO usuarios () VALUES ($1, $2, $3) ')
    res.json(usuarios.rows)
})





app.listen(PORT, () =>{
    console.log("Servidor Rodando na porta 3000")
})