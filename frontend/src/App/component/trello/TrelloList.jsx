import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import TrelloCard from "./TrelloCard";
import '../Trello.css'

export default function TrelloList(prop) {
    const [cards, setCards] = useState([])
    const projectId = localStorage.getItem("projectId")
    const jwtToken = localStorage.getItem("jwtToken")

    // Fetch Trello Board
    useEffect(() => {
        //   let repositoryDTO = currentProject.repositoryDTOList.find(x => x.type == "trello")
        //   let trelloToken = repositoryDTO.token
        //   let trelloKey = repositoryDTO.key
        let trelloKey = "03e67e759dde8ca4d0b35de90fa07987"
        let trelloToken = "89ebd7abaa4527a31977e68aba32b29948bbce14541436a03fa76416a32fa8b3"
        Axios.get(`https://api.trello.com/1/lists/${prop.id}/cards?key=${trelloKey}&token=${trelloToken}`)
            .then((response) => {
                console.log(response.data)
                setCards(response.data)
            })
            .catch((e) => {
                alert(e.response.status)
                console.error(e)
            })
    },[])

    return (
        <div className="board-list">
            <div className="list-title">
                {prop.name}
            </div>
            {cards.map((card)=>{
                return <TrelloCard shortUrl={card["shortUrl"]}></TrelloCard>
            })}
        </div>
    )
}