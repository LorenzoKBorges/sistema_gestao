import express from "express"
import cors from "cors"
import pool from "./db.js"


const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

//==============================================================================================

app.get('/usuario', async (req, res) =>{
    const usuarios =  await pool.query('SELECT * FROM usuarios')
    res.json(usuarios.rows)
})

app.get('/tarefa', async (req, res) =>{
    const tarefas =  await pool.query('SELECT * FROM tarefas')
    res.json(tarefas.rows)
})

app.get('/gerenciamento', async (req, res) =>{
    const gerenciamentos =  await pool.query('SELECT * FROM gerenciamentos')
    res.json(gerenciamentos.rows)
})
//==============================================================================================
app.post('/usuario', async (req, res) =>{
    const {nome, email, cpf} = req.body
    const NovoUsuarios =  await pool.query('INSERT INTO usuarios (nome, email, cpf) VALUES ($1, $2, $3) RETURNING *', [nome, email, cpf])
    res.json(NovoUsuarios.rows[0])
})

app.post('/tarefa', async (req, res) =>{
    const {nome, descricao, setor} = req.body
    const NovoTarefa =  await pool.query('INSERT INTO tarefas (nome, descricao, setor) VALUES ($1, $2, $3) RETURNING *', [nome, descricao, setor])
    res.json(NovoTarefa.rows[0])
})

app.post('/gerenciamento', async (req, res) =>{
    const {id_usuarios, id_tarefas} = req.body
    const NovoGerenciamento =  await pool.query('INSERT INTO gerenciamentos (id_usuarios, id_tarefas) VALUES ($1, $2) RETURNING *', [id_usuarios, id_tarefas])
    res.json(NovoGerenciamento.rows[0])
})
//==============================================================================================

app.put('/usuario/:id', async (req, res) =>{
    const {id} = req.params
    const {nome, email, cpf} = req.body
    const AttUsuarios =  await pool.query('UPDATE usuarios SET nome = $1, email = $2, cpf = $3 WHERE id = $4 RETURNING *', [nome, email, cpf, id])
    res.json(AttUsuarios.rows[0])
})

app.put('/tarefa/:id', async (req, res) =>{
    const {id} = req.params
    const {nome, descricao, setor} = req.body
    const AttTarefas =  await pool.query('UPDATE tarefas SET nome = $1, descricao = $2, setor = $3 WHERE id = $4 RETURNING *', [nome, descricao, setor, id])
    res.json(AttTarefas.rows[0])
})

app.put('/gerenciamento/:id', async (req, res) =>{
    const {id} = req.params
    const {id_usuarios, id_tarefas} = req.body
    const AttTarefas =  await pool.query('UPDATE gerenciamento SET id_usuarios = $1, id_tarefas = $2 WHERE id = $3 RETURNING *', [id_usuarios, id_tarefas, id])
    res.json(AttTarefas.rows[0])
})

//==============================================================================================

app.delete('/usuario/:id', async (req, res) =>{
    const {id} = req.params
    const deletarUsuarios =  await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id])
    res.json(deletarUsuarios.rows[0])
})

app.delete('/tarefa/:id', async (req, res) =>{
    const {id} = req.params
    const deletarTarefa =  await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id])
    res.json(deletarTarefa.rows[0])
})

app.delete('/gerenciamento/:id', async (req, res) =>{
    const {id} = req.params
    const deletarGerenciamento =  await pool.query('DELETE FROM gerenciamento WHERE id = $1 RETURNING *', [id])
    res.json(deletarGerenciamento.rows[0])
})


//==============================================================================================




app.listen(PORT, () =>{
    console.log("Servidor Rodando na porta 3000")
})