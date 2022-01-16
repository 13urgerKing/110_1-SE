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
        Axios.get(`https://api.trello.com/1/lists/${prop.id}/cards?key=${prop.trelloKey}&token=${prop.trelloToken}`)
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