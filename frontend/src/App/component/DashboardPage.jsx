import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProjectAvatar from './ProjectAvatar'
import Axios from 'axios'
import './Trello.css'
import trelloLoad from './Trello.js'
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}))

function DashboardPage(props) {
	const classes = useStyles()

    const [currentProject, setCurrentProject] = useState({})

    const projectId = localStorage.getItem("projectId")
    const jwtToken = localStorage.getItem("jwtToken")

    useEffect(() => {
        Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`,
        { headers: {"Authorization" : `${jwtToken}`} })
        .then((response) => {
        setCurrentProject(response.data)
        })
        .catch((e) => {
        alert(e.response.status)
        console.error(e)
        })
        trelloLoad();
    }, [])

    return (
      <div>
        <h2>Trello Board</h2>


        <div className="base">
          <div className="board">
            <div className="board-lists" id="lists">
            </div>
          </div>
        </div>
      </div>

    )
}

export default DashboardPage