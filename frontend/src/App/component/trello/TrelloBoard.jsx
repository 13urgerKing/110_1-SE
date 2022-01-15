import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import TrelloList from "./TrelloList";
import '../Trello.css'

export default function TrelloBoard(prop) {
    const [lists, setLists] = useState([])
    const [currentProject, setCurrentProject] = useState(undefined)
    const [trelloKey, setTrelloKey] = useState(undefined)
    const [trelloToken, setTrelloToken] = useState(undefined)
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

          let token = repositoryDTO.token
          let key = repositoryDTO.key
          let trelloComponent = repositoryDTO.url.split("b/")[1]
          setTrelloKey(key)
          setTrelloToken(token)
          Axios.get(`https://api.trello.com/1/boards/${trelloComponent}/lists?key=${key}&token=${token}`)
            .then((response) => {
                setLists(response.data)
            })
            .catch((e) => {
              alert(e.response.status)
              console.error(e)
            })
        }
      }, [currentProject, trelloKey, trelloToken])

    return (
        <div className="board-lists" >
            {lists.map((list)=>{
               console.log(list.id)
               console.log(list.name)
               return <TrelloList id={list.id} name={list.name} trelloKey={trelloKey.toString()} trelloToken={trelloToken.toString()}></TrelloList>
            })}
        </div>
    )
}