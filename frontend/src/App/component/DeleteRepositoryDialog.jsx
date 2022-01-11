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

export default function DeleteRepositoryDialog({ open, reloadProjects, handleClose, projectId, hasGithubRepo, hasSonarRepo }) {
  const [type, setType] = useState(false)
  const jwtToken = localStorage.getItem("jwtToken")

  const deleteRepository = () => {
    let payload = {
      projectId: projectId
    }

    Axios.post(`http://localhost:9100/pvs-api/project/delete/repository/${type}`, payload, { headers: {"Authorization" : `${jwtToken}`} })
      .then((response) => {
        reloadProjects()
        handleClose()
      })
      .catch((e) => {
        alert(e.response.status)
        console.error(e)
      })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete Repository</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please Choose The Repository You Want To Delete
        </DialogContentText>
        <Select
          value={type}
          onChange={(e) => { setType(e.target.value) }}>
          <MenuItem value=""><em>None</em> </MenuItem>
          {
            hasGithubRepo ? <MenuItem value={"github"}>Github</MenuItem> : null
          }
          {
            hasSonarRepo ? <MenuItem value={"sonar"}>Sonar</MenuItem> : null
          }
        </Select>
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
