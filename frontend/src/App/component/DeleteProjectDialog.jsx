import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function DeleteProjectDialog({ open, handleClose, projectId }) {
  const [type, setType] = useState(false)
  const jwtToken = localStorage.getItem("jwtToken")
  const history = useHistory()

  const deleteRepository = () => {
    let payload = {
      projectId: projectId
    }
    
    Axios.post(`http://localhost:9100/pvs-api/project/delete`, payload,
      { headers: { "Authorization": `${jwtToken}` } })
      .then((response) => {
        history.push("/select")
        handleClose()
      })
      .catch((e) => {
        alert(e.response.status)
        console.error(e)
      })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={deleteRepository} color="primary" id="DeleteRepositoryBtn">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
