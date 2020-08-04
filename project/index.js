const express = require('express')
const app = express()
const config = require("./utils/config");

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2020-08-04T17:30:31.098Z",
  }
]

app.get('/api/notes', (req, res) => {
  if (notes.length >= 1) {
    res.json(notes)
  } else {
    console.log("no notes!")
    res.status(404).end()
  }
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    console.log(`No note found with id: ${id}`)
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  console.log(`Created note with id: ${note.id}`)
  res.json(note)
})

app.put('/api/notes/:id', (req,res) => {
  const id = Number(req.params.id)
  const updatedBody = req.body

  if (!updatedBody.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  // Remove a note with the specified id
  notes = notes.filter(note => note.id !== id)

  // Create a new note with the specified id
  const note = {
    content: updatedBody.content,
    date: new Date(),
    id: id
  }
  notes = notes.concat(note)

  console.log(`Updated note with id: ${note.id}`)
  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  console.log(`Deleted note with id: ${id}`)
  res.status(204).end()
})


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})