const Note = require('../models/Note')
const User = require('../models/User')


const getAllNotes = async (req, res) => {
    
    const notes = await Note.find().lean()

    
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

  
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const username = await User.findById(note.username).lean().exec()
        return { ...note, username: username.username }
    }))

    res.json(notesWithUser)
}


const createNewNote = async (req, res) => {
    const { username, title, text } = req.body

    
    if (/* !username || */ !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    
    const note = await Note.create({ username, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

}


const updateNote = async (req, res) => {
    const { id, username, title, text, completed } = req.body

  
    if (!id || !username || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.username = username
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
}


const deleteNote = async (req, res) => {
    const { id } = req.body

   
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}