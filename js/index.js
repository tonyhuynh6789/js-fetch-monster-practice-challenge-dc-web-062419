let url = "http://localhost:3000/monsters/?_limit=50&_page=1"
document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("form").addEventListener("submit", submitHandler)
    fetchAllMonsters(url)
})

function submitHandler(event){
    event.preventDefault()

    let data = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value
    }

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify(data)
    })
}


function fetchAllMonsters(url){
    fetch(url)
    .then(response => response.json())
    .then(monstersArray => {
        monstersArray.forEach( renderMonster)
    })
}

function renderMonster(monster){
    // create div for each monster
    let monsterDiv = document.createElement("div")
    document.querySelector("#monster-container").appendChild(monsterDiv)
    monsterDiv.id = `monster-${monster.id}`

    // create h2 for each monster name
    let mName = document.createElement("h2")
    monsterDiv.appendChild(mName)
    mName.innerText = monster.name

    // create h4 for monster age
    let mAge = document.createElement("h4")
    monsterDiv.appendChild(mAge)
    mAge.innerText = `Age: ${monster.age}`

    // create p for monster description
    let mDesc = document.createElement("p")
    monsterDiv.appendChild(mDesc)
    mDesc.innerText = `Bio: ${monster.description}`
}

// forward button logic
const fwdButton = document.getElementById("forward")
let pageNum = 1
fwdButton.addEventListener('click', () => {
    
    pageNum += 1 
    let nextUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`
    fetch(nextUrl)
    .then(response => response.json())
    .then(monstersArray => {
        if (monstersArray.length === 0){
            alert("Ain't no monsters here")
            pageNum -= 1
        }
        else{
            document.getElementById("monster-container").innerHTML = ""
            monstersArray.forEach( renderMonster)
        }
    })


})

// back button logic
const backButton = document.getElementById("back")
backButton.addEventListener('click', () => {
    if (pageNum === 1){
        alert("Ain't no monsters here")
    }
    else{
        document.getElementById("monster-container").innerHTML = ""
        pageNum -= 1
        let prevUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`
        fetchAllMonsters(prevUrl)
    }
})