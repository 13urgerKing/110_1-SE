import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'

export default function AddRepositoryDialog({ open, reloadProjects, handleClose, projectId}) {
  const [type, setType] = useState(false)
  const [repositoryURL, setRepositoryURL] = useState("")
  const [token, setToken] = useState(false)
  const jwtToken = localStorage.getItem("jwtToken")

  const addRepository = () => {
    if(repositoryURL === "") {
      alert("網址不能為空")
    } else {
      let payload = {
        projectId: projectId,
        repositoryURL : repositoryURL,
        token: token,
      }
      Axios.post(`http://localhost:9100/pvs-api/project/${projectId}/repository/${type}`, payload,
      { headers: {"Authorization" : `${jwtToken}`} })
          .then((response) => {
            reloadProjects()
            handleClose()
          })
          .catch((e) => {
            alert(e.response.status)
            console.error(e)
          }) 
    }
  }

  useEffect(() => {
    setRepositoryURL("")
    setToken("")
  }, [open])
  
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Repository</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "To add a repository, please choose the type of repository and enter the repository URL here."
          </DialogContentText>
          <Select
            value={type}
            onChange = {(e) => {setType(e.target.value)}}>
            <MenuItem value={"github"}>Github</MenuItem>
            <MenuItem value={"sonar"}>Sonar</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="RepositoryURL"
            label="Repository URL"
            type="text"
            fullWidth
            onChange = {(e) => {setRepositoryURL(e.target.value)}}
          />
          { type == "github" ? <TextField
            margin="dense"
            id="GithubToken"
            label="Github Token"
            type="text"
            fullWidth
            onChange = {(e) => {setToken(e.target.value)}}
          /> : <TextField
          margin="dense"
          id="SonarToken"
          label="Sonar Token"
          type="text"
          fullWidth
          onChange = {(e) => {setToken(e.target.value)}}
          />}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addRepository} color="primary" id="AddRepositoryBtn">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}
  