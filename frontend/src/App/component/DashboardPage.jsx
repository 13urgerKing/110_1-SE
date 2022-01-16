import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './Trello.css'
import TrelloBoard from './trello/TrelloBoard'

function DashboardPage(props) {
  const [currentProject, setCurrentProject] = useState({})

  const projectId = localStorage.getItem("projectId")
  const jwtToken = localStorage.getItem("jwtToken")

  const loadProject = () => {
    console.log("123")
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`,
      { headers: { "Authorization": `${jwtToken}` } })
      .then((response) => {
        setCurrentProject(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        alert(e.response.status)
        console.error(e)
      })
  }


  return (
    <div>
      <h2>Dash Board</h2>
    </div>

  )
}

export default DashboardPage