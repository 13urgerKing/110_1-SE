export default function trelloLoad(){

  let key = "3479d25d2815ba4dac3dc2f170303f47" // Trello key
  let token = "bdf954276fb13c2c1abb62fda9c0935b4404ea29ce7ebac61d23e198e97a18e7" // Trello token
  fetch('https://api.trello.com/1/boards/6177ce8a803a4b5568d19ff0/lists?key=' + key + '&token=' + token)
    .then(function(response){return response.json()})
    .then(boardList);

  function boardList(data){
    for(let i in data){
      let div = document.createElement("div");
      div.classList.add("board-list");
      let listTitle = document.createElement("div");
      listTitle.classList.add("list-title");
      listTitle.innerText = data[i].name;
      div.append(listTitle);
      div.id = data[i]["id"];
      document.getElementById("lists").append(div);
      fetch('https://api.trello.com/1/lists/' + data[i]["id"] + '/cards?key=' + key + '&token=' + token)
        .then(response => response.json())
        .then(cardList);
    }
  }

  function cardList(data){
    for(let i in data){
      let card = document.createElement("div");
      card.classList.add("card");

      let blockquote = document.createElement("blockquote");
      blockquote.classList.add("trello-card");
      let a = document.createElement("a");
      a.href = data[i]["shortUrl"];
      a.innerText = data[i]["shortUrl"];
      blockquote.append(a);
      card.append(blockquote);

      let div = document.getElementById(data[i]["idList"]);
      div.append(card);
    } 
  }

  setTimeout(()=>{
    let script = document.createElement("script");
    script.src = "https://p.trellocdn.com/embed.min.js";
    document.body.appendChild(script);
  },1500);
};