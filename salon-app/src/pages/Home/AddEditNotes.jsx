// import TagInput from "../../components/Input/TagInput"
// import {MdClose} from "react-icons/md"

// const AddEditNotes =({noteData, type, onClose}) => {
//     const [title, setTitle] = useState("")
//     const [content, setContent] = useState("")
//     const [tags,setTags] = useState([])

//     const [error, setError] = useState(null)

//     // Add Note
//     const addNewNote = async () => {}

//     // Edit Note
//     const editNote = async () => {}

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.")
//             return
//         }

//         if (!content) {
//             setError("Please enter the content.")
//             return
//         }

//         setError("")

//         if (type=== 'edit') {
//             editNote()
//         } else {
//             addNewNote()
//         }
//     }
//     return (
//         <div className="relative">

//             <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
//                 <MdClose className="text-xl text-slate-400"/>
//             </button>

//             <div className="flex-col gap-2">
//                 <label className="text-xs text-slate-400">TITLE</label>
//                 <input type="text" className="text-2xl text-slate-950 outline-none"
//                     placeholder="Go To Gym at 5"
//                     value={title}
//                     onChange={({target}) => setTitle(target.value)}
//                 />
//             </div>
//             <div className="fex flex-col gap-2 mt-4">
//                 <label className="text-xs text-slate-400">CPNTENT</label>
//                 <input type="text" className="text-SM text-slate-950 outline-none bg-slate-50 p-2 rounded"
//                     placeholder="Content"
//                     rows={10}
//                     value={content}
//                     onChange={({target}) => setContent(target.value)}
//                 />
//             </div>

//             <div className="mt-3">
//                 <label className="text-xs text-slate-400">TAGS</label>
//                 <TagInput tags={tags} setTags={setTags}/>
//             </div>

//             {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

//             <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
//                 ADD
//             </button>
//         </div>
//     )
// }
// export default AddEditNotes
import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput' // Assuming this is already a functional component
import { IconButton, TextField, Button, Box, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])

  const [error, setError] = useState(null)

  // Add Note
  const addNewNote = async () => {}

  // Edit Note
  const editNote = async () => {}

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter the title.')
      return
    }

    if (!content) {
      setError('Please enter the content.')
      return
    }

    setError('')

    if (type === 'edit') {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <Box sx={{ position: 'relative', p: 3, width: 400 }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: -12,
          right: -12,
          color: 'rgba(0, 0, 0, 0.54)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          TITLE
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Go To Gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          CONTENT
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          TAGS
        </Typography>
        <TagInput tags={tags} setTags={setTags} />
      </Box>

      {error && (
        <Typography variant="body2" sx={{ color: 'error.main', mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'Save' : 'Add'}
      </Button>
    </Box>
  )
}

export default AddEditNotes
