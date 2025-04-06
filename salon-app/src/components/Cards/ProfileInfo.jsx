import { getInitials } from '../../utils/helper'
import { Avatar, Button, Box } from '@mui/material'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
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
        {getInitials(userInfo?.fullName)}
      </Avatar>
      <Button
        variant="text"
        onClick={onLogout}
        sx={{
          textTransform: 'none',
          backgroundColor: 'white',
          padding: '4px 8px',
        }}
      >
        Logout
      </Button>
    </Box>
  )
}

export default ProfileInfo
