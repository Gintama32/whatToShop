import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

const appSettings={
    databaseURL: "https://mobileapp-d1008-default-rtdb.firebaseio.com/"
}
  const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("item")
const addButtonEl = document.getElementById("add")
const shoppinglistEl= document.getElementById("shopping-list")

addButtonEl.addEventListener("click",function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    resetInputFieldEl();
})

onValue(shoppingListInDB,function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList();
        for(let i = 0; i<itemsArray.length;i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            addItems(currentItem);
    }
}else{
    shoppinglistEl.innerHTML= "no items"
}
})

function clearShoppingList(){
    shoppinglistEl.innerHTML="";
}
function resetInputFieldEl(){
    inputFieldEl.value= "";
}

function addItems(items){
    let itemId = items[0]
    let itemValue = items[1]
    let newEl = document.createElement("li")
    newEl.textContent=itemValue;
    shoppinglistEl.append(newEl)
    newEl.addEventListener("click",function(){
    let exactLocationInDB = ref(database,`shoppingList/${itemId}`);
        remove(exactLocationInDB)
    })
}
