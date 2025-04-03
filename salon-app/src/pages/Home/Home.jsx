// import NoteCard from "../../components/Cards/NoteCard"
// import Navbar from "../../components/Navbar/Navbar"
// import {MdAdd} from "react-icons/md"
// import AddEditNotes from "./AddEditNotes"

// const Home = () => {
//   return (
//     <>
//       <Navbar/>
//       <div className="container mx-auto">
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           <NoteCard title="Meeting on 4/7" date="4/3 2024" content="Meeting on 4/7"
//             tags="Meeting"
//             isPinned={true}
//             onEdit={()=>{}}
//             onDeletem={()=>{}}
//             onPinNote={()=>{}}
//           />
//         </div>
//       </div>

//       <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{}}>
//         <MdAdd className="text=[32px] text-white"/>
//       </button>

//       <Modal isOpen={openAddEditModal.isShown}
//         onRequestClose={()=> {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0,2)",
//           }
//         }}
//         contentLabel=""
//         className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow"
//       >
//         <AddEditNotes type = {openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           onClose={() => {
//           setOpenAddEditModal({isShown: false, type: "add", "data": null})
//         }}/>
//       </Modal>
//     </>
//   )
// }

// export default Home
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material'

import Navbar from '../../components/Navbar/Navbar'
import AddEditNotes from './AddEditNotes'
import axiosInstance from '../../utils/axiosInstance'
import NoteCard from '../../components/Cards/NoteCard'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })
  const [allNotes, setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown: true, data: noteDetails, type: "edit"})
  }

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (Error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  }

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes")

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.")
    }
  }

  useEffect (() => {
    getAllNotes()
    getUserInfo()
    return () => {}
  }, [])

  const handleOpenModal = (type, data = null) => {
    setOpenAddEditModal({ isShown: true, type, data })
  }

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: 'add', data: null })
  }

  return (
    <>
      <Navbar userInfo={userInfo}/>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={4} sx={{marginTop: 4 }}>
          {/* Example NoteCard */}
          {allNotes.length === 0 ? (
            <Typography variant='h6'>No notes available</Typography>
          ): (
            allNotes.map((item) => (
            <Grid size={{xs:12, sm:6, md:4}} key={item._id}>
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() =>handleEdit(item)}
                onDelete={() => {}}
                onPinNote={() => {}}
              />
            </Grid>
          ))
          )}
          
        </Grid>

        {/* Floating Add Button */}
        <Button
          sx={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
            boxShadow: 3,
          }}
          onClick={() => handleOpenModal('add')}
        >
          <MdAdd className="text-white" style={{ fontSize: '32px' }} />
        </Button>

        {/* Add/Edit Modal */}
        <Modal
          open={openAddEditModal.isShown}
          onClose={handleCloseModal}
          aria-labelledby="add-edit-note-modal"
          aria-describedby="add-or-edit-note"
        >
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              maxWidth: '40%',
              maxHeight: '80%',
              margin: 'auto',
              padding: 3,
              overflowY: 'auto',
              boxShadow: 24,
            }}
          >
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({isShown: false, type: "add", data: null})
              }}
              getAllNotes={getAllNotes}
            />
          </Box>
        </Modal>
      </Box>
    </>
  )
}

export default Home
