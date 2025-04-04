// import { useState } from 'react'
// import { MdAdd, MdClose } from 'react-icons/md'
// const TagInput = ({ tags, setTags }) => {
//   const [inputValue, setInputValue] = useState('')
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value)
//   }
//   const addNewTag = () => {
//     if (inputValue.trim() !== '') {
//       setTags([...tags, inputValue.trim()])
//       setInputValue('')
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       addNewTag()
//     }
//   }

//   const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove))
//   }

//   return (
//     <div>
//       {tags?.length > 0 && (
//         <div className="flex items-center gap-2 flex-wrap mt-2">
//           {' '}
//           {tags.map((tag, index) => {
//             <span
//               key={index}
//               className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
//             >
//               {' '}
//               # {tag}
//               <button onClick={() => handleRemoveTag(tag)}>
//                 <MdClose />
//               </button>
//             </span>
//           })}
//         </div>
//       )}
//       <div className="flex items-center gap-4 mt-3">
//         <input
//           type="text"
//           value={inputValue}
//           className="text-sm bg-tranparent border px-3 py-2 rounded outline-none"
//           placeholder="Add Tags"
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           className="w-8 h-8 flex items-cneter justify-center rounded border border-blue-700 hover:bg-blue-700"
//           onClick={addNewTag}
//         >
//           <MdAdd className="text-2xl text-blue-700 hover:text-white" />
//         </button>
//       </div>
//     </div>
//   )
// }
// export default TagInput
import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import { TextField, Chip, IconButton, Box } from '@mui/material'

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Box>
      {/* Render tags with Chips */}
      {tags?.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={`# ${tag}`}
              color="primary"
              onDelete={() => handleRemoveTag(tag)}
              deleteIcon={<MdClose />}
              sx={{ textTransform: 'capitalize' }} // Optional for styling
            />
          ))}
        </Box>
      )}

      {/* Input Field for Adding New Tag */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add Tags"
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          onClick={addNewTag}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <MdAdd />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TagInput
