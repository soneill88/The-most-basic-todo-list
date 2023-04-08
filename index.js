//Global Variables
let listItems = []
const dateEl = document.getElementById('date-input')
const importanceEl = document.getElementById('importance')
const inputEl = document.getElementById("list-input")
const listFeedEl = document.getElementById("list-feed")
const submitBtn = document.getElementById("submit-btn")
const clearBtn = document.getElementById("clear-all-btn")

let listItemsFromLocalStorage = JSON.parse(localStorage.getItem("listItems"))
let index = 0 
// Render Items from Local Storage
if (listItemsFromLocalStorage){
    listItems = listItemsFromLocalStorage
    index = listItems.reduce((max, item) => Math.max(max, item.id), 0) + 1
    render()
}

// Button Event Listeners
document.addEventListener('click', function(e){
    if(e.target.dataset.complete){
        handleCompleteBtn(e.target.dataset.complete)
    }
})
submitBtn.addEventListener("click", function(){
   if (inputEl.value && dateEl.value) {
    listItems.push({
        date: dateEl.value,
        text: inputEl.value,
        importance: importanceEl.value,
        id: index,
        isCompleted: false
    })
    localStorage.setItem("listItems",JSON.stringify(listItems))
    inputEl.value = ''
    render()
    index += 1
    
   }
})

clearBtn.addEventListener("click", function(){
    localStorage.clear()
    listItems=[]
    render()
})

function handleCompleteBtn(itemID){
    const completeItem = listItems.filter(function(item){
        return item.id == itemID
    })[0]
    completeItem.isCompleted = true
    render()
    
}

// Get the # of stars to be rendered in order to represent Importance

function getStars (item) {
    let stars = ''
    if (item.importance === "High") {
        stars = '⭐⭐⭐'

    } else if (item.importance === "Medium") {
        stars = '⭐⭐'
    } else {
        stars = '⭐'
    }
return stars
}

// Renders the list feed 
function render() {
    let listFeed = ''

    for ( let item of listItems) {
        listFeed += `
                
                <tr id="row-${item.id}" class="">
                <td>${item.text}</td>
                <td>${item.date}</td>
                <td>${getStars(item)}</td>
                <td><button data-complete="${item.id}">${item.id}</button></td>
        `
        if (item.isCompleted){
            console.log(document.getElementById(`row-${item.id}`))
        
    }
   

    listFeedEl.innerHTML = listFeed
}
}