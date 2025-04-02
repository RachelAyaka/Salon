// import { getInitials } from "../../utils/helper"

// const ProfileInfo = ({onLogout}) => {
//     return (
//       <>
//         <div className="flex items-center gap-3">
//             <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
//                 {getInitials('Rachel Lin')}
//             </div>

//             <div>
//                 <p className="test-sm font-medium">Rachel Lin</p>
//                 <button className="text-sm text-slate-700 underline" onClick={onLogout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//       </>
//     )
//   }

//   export default ProfileInfo

import { getInitials } from '../../utils/helper'
import { Avatar, Button, Typography, Box } from '@mui/material'

const ProfileInfo = ({ onLogout }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Avatar */}
      <Avatar
        sx={{
          width: 48,
          height: 48,
          backgroundColor: 'grey.300',
          color: 'grey.950',
          fontWeight: 'medium',
        }}
      >
        {getInitials('Rachel Lin')}
      </Avatar>

      <Box>
        <Typography variant="body2" color="primary" fontWeight="medium">
          Rachel Lin
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={onLogout}
          sx={{ textTransform: 'none' }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default ProfileInfo
