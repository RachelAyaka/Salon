import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Button component={Link} to="/booking" color="primary">
        Book Now
      </Button>
    </div>
  )
}

export default Home
