
let baseUrl  =  "http://localhost:3000/monsters/?_limit=50&_page=1"
let pageNumber = 1 
const containerClear = () => document.getElementById("monster-container").innerHTML = ""



document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", postMonster)
    document.getElementById("next").addEventListener("click", nextCLick)
    document.getElementById("back").addEventListener("click", backClick)
    fetchMonster(baseUrl)


})


function nextCLick(e) {
    e.preventDefault()
    pageNumber += 1 
    let nextUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`
    fetch(nextUrl)
    .then(resp => resp.json())
    .then(resp => {
        if(resp.lengh === 0){
            alert("No monsters here")
            pageNumber -= 1
        }
        else 
        {
         containerClear()
         resp.forEach(e => renderMonster(e))
        }
    })
}


function backClick(e) {
    e.preventDefault(e)

    pageNumber -= 1 
    let nextUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`
    fetch(nextUrl)
    .then(resp => resp.json())
    .then(resp => {
        if(resp.lengh === 0){
            alert("No monsters here")
            pageNumber += 1
        }
        else 
        {
         containerClear()
         resp.forEach(e => renderMonster(e))
        }
    })

}




function postMonster(e) {
    

    e.preventDefault()

    let object = {
        name: e.target.name.value, 
        age: e.target.age.value , 
        description: e.target.age.value
    }


    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        body: JSON.stringify(object)    
    })
    .then(resp => resp.json())
    .then(renderMonster)
}



function fetchMonster(baseUrl) {
    return fetch(baseUrl)
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(e => renderMonster(e))
    })
}

function renderMonster(monster) {
   

    // create div for each monster
    let monsterDiv = document.createElement('div')
    monsterDiv.id = `monster-${monster.id}`
    document.getElementById('monster-container').appendChild(monsterDiv)


    // create name 
    let monsterName = document.createElement('h3')
    monsterName.innerText = `name: ${monster.name}` 
    monsterDiv.appendChild(monsterName)
    


    //create age 
    let monsterAge =  document.createElement('h5')
    monsterAge.innerText = `Age: ${monster.age}`
    monsterDiv.appendChild(monsterAge)




    //create description 
    let monsterDes = document.createElement('p')
    monsterDes.innerText = `Description: ${monster.description}`
    monsterDiv.appendChild(monsterDes)


    //create id
    let monsterId = document.createElement('p')
    monsterId.innerText = `id: ${monster.id}`
    monsterDiv.appendChild(monsterId)
    

}




























