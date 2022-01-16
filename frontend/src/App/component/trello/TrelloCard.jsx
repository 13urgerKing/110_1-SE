import { Card } from "@material-ui/core";
import React from "react";

export default function TrelloCard(prop) {
    return (
        <div>
            <div className="card">
                <blockquote className="trello-card">
                    <a href={prop.shortUrl}>
                        {prop.shortUrl}
                    </a>
                </blockquote>
            </div>
        </div>
    )
}