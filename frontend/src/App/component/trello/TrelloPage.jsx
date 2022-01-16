import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProjectAvatar from './../ProjectAvatar';
import Axios from 'axios'
import { CircularProgress, Backdrop } from '@material-ui/core'
import { connect } from 'react-redux'
import TrelloBoard from './TrelloBoard';

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

function TrelloPage(prop) {
  const classes = useStyles()
  const [currentProject, setCurrentProject] = useState(undefined)

  const projectId = localStorage.getItem("projectId")

  const jwtToken = localStorage.getItem("jwtToken")

  //TODO 這邊寫死的記得要改唷!!!! >////<

  useEffect(() => {
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`,
      { headers: { "Authorization": `${jwtToken}` } })
      .then(response => {
        setCurrentProject(response.data)
      })
      .catch(e => {
        alert(e.response.status)
        console.error(e)
      })
  }, [])

  setTimeout(() => {
    let script = document.createElement("script");
    script.src = "https://p.trellocdn.com/embed.min.js";
    document.body.appendChild(script);
  }, 2000);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div className={classes.root}>
        {currentProject && <ProjectAvatar
          size="small"
          project={currentProject}
        />}
        <p>
          <h2 id="number-of-trello">{currentProject ? currentProject.projectName : ""}</h2>
        </p>
      </div>
      <div className={classes.root}>
        <div style={{ width: "67%" }}>
          <div>
            <h1>Trello Board</h1>
            <div>
              <TrelloBoard></TrelloBoard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    startMonth: state.selectedMonth.startMonth,
    endMonth: state.selectedMonth.endMonth
  }
}

export default connect(mapStateToProps)(TrelloPage)
