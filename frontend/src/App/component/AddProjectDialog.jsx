import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import InputAdornment from '@material-ui/core/InputAdornment';
import { SiGithub, SiSonarqube } from 'react-icons/si'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core'

export default function AddProjectDialog({ open, reloadProjects, handleClose }) {
    const [projectName, setProjectName] = useState("")
    const jwtToken = localStorage.getItem("jwtToken")

    const createProject = () => {
      if(projectName === "") {
        alert("專案名稱不能為空")
      }

      let payload = {
        projectName : projectName,
      }

      Axios.post("http://localhost:9100/pvs-api/project", payload, {headers: {"Authorization" : `${jwtToken}`}})
          .then((response) => {
            reloadProjects()
            handleClose()
          })
          .catch((e) => {
            alert(e.response.status)
            console.error(e)
          })
    }

    useEffect(() => {
      setProjectName("")
    }, [open])
    
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a project, please enter the project name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="ProjectName"
              label="Project Name"
              type="text"
              fullWidth
              onChange = {(e) => {setProjectName(e.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button id="CreateProjectBtn" onClick={createProject} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
  