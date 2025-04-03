// import { MdOutlinePushPin } from 'react-icons/md'

// import { MdCreate, MdDelete } from 'react-icons/md'

// const NoteCard = ({
//   title,
//   date,
//   content,
//   tags,
//   isPinned,
//   onEdit,
//   onDelete,
//   onPinNote,
// }) => {
//   return (
//     <>
//       <div className="border rounded p-4 bg-white hover:shadow-xl translation-all ease-in-out">
//         <div className="flex items-center justify-between">
//           <div>
//             <h6 className="text-sm font-medium">{title}</h6>
//             <span className="text-xs text-slate-500">{date}</span>
//             <MdOutlinePushPin
//               className={`text-xl slate-300 cursor-pointer hover:text-priamry ${isPinned ? 'text-primary' : 'text-slate-300'}`}
//               onClick={onPinNote}
//             />
//           </div>
//           <div className="text-xs text-slaet-600 mt-2">
//             {' '}
//             {content?.slice(0, 60)}
//           </div>
//           <div className="flex items-center justify-between mt-2">
//             <div className="text-xs text-slate-500">{tags}</div>
//             <div className="flex items-center gap-2">
//               {MdCreate className="icon-btn hover:text-green-600" onClick={onEdit}}
//                 {MdDelete className="icon-btn hover:text-red-500" onClick={onDelete}}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default NoteCard
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'
import { Card, CardContent, Typography, IconButton, Box, Tooltip, Chip } from '@mui/material'
import moment from 'moment'

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {moment(date).format('Do MMM YYYY ')}
            </Typography>
          </Box>

          {/* Pin Icon */}
          <IconButton
            onClick={onPinNote}
            sx={{
              color: isPinned ? 'primary.main' : 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <MdOutlinePushPin />
          </IconButton>
        </Box>

        {/* Content Preview */}
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
          {content?.slice(0, 60)}...
        </Typography>

        {/* Footer Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
                {tags.length > 0 ?
                tags.map((tag, index) => (
                <Chip key={index} label={tag} color="primary" size="small" />
                )): null}
            </Box>

          {/* Edit and Delete Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Edit">
              <IconButton onClick={onEdit} sx={{ color: 'success.main' }}>
                <MdCreate />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={onDelete} sx={{ color: 'error.main' }}>
                <MdDelete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NoteCard
