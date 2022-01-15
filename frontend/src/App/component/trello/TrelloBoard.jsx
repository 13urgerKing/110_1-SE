import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import TrelloList from "./TrelloList";
import '../Trello.css'

export default function TrelloBoard(prop) {
    const [lists, setLists] = useState([])
    const [currentProject, setCurrentProject] = useState(undefined)
    const projectId = localStorage.getItem("projectId")
    const jwtToken = localStorage.getItem("jwtToken")

    // Get Authorization Data(Project Data)
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

    // Fetch Trello Board
    useEffect(() => {
        if (currentProject != undefined) {
          let repositoryDTO = currentProject.repositoryDTOList.find(x => x.type == "trello")
        //   let trelloToken = repositoryDTO.token
        //   let trelloKey = repositoryDTO.key
        //   let trelloComponent = repositoryDTO.url.split("/")[6]
          let trelloKey = "03e67e759dde8ca4d0b35de90fa07987"
          let trelloToken = "89ebd7abaa4527a31977e68aba32b29948bbce14541436a03fa76416a32fa8b3"
          let trelloComponent = "xEGlwb8C"
          Axios.get(`https://api.trello.com/1/boards/${trelloComponent}/lists?key=${trelloKey}&token=${trelloToken}`)
            .then((response) => {
                console.log(response.data)
                setLists(response.data)
            })
            .catch((e) => {
              alert(e.response.status)
              console.error(e)
            })
        }
      }, [currentProject])

    return (
        <div className="board-lists" >
            {lists.map((list)=>{
               console.log(list.id)
               console.log(list.name)
               return <TrelloList id={list.id} name={list.name}></TrelloList>
            })}
        </div>
    )
}