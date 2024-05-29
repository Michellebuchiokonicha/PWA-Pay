const db = new dexie('ShoppingApp')
db.version(1).stores( e:{ items: '++id,name,price,isPurchased'} )

const itemForm = document.getElementById(elementId: 'itemForm')
const itemsDiv = document.getElementById(elementId: 'itemsDiv')
const totalPriceDiv = document.getElementById(elementId: 'totalPriceDiv')

const populateItemsDiv = async () => {
    const allItems = await db.items.reverse().toArray()
   

    itemsDiv.innerHTML = allItems.map(item => `

    <div class="item ${item.isPurchased && 'purchased'}">
            <label>
                <input type="checkbox"
                 class="checkbox" 
                 onChange="toggleItemStatus(event, ${item.id})"
                 ${item.isPurchased && 'checked'}
                 >

            </label>

            <div class="itemInfo">

                <p>${item.name}</p>
                <p>${item.price} * ${item.quantity} </p>
            </div>
            <button class="deleteButton"
            onClick="removeItem(${item.id})
            >
            X</button>
        </div>
    // [
    //     {
    //         name: 'table tissue',
    //         quantity: 5,
    //         price: '70',
    //         isPurchased: true
    //     },
    //     {
    //         name: 'bread',
    //         quantity: 7,
    //         price: 400,
    //         isPurchased: false
    //     }
    // ]
    `).join(separator: '')

    const arrayOfPrices = allItems.map(item => item.price * item.quantity)
    const totalPrice = arrayOfPrices.reduce((a,b) => a + b, 0)

    totalPriceDiv.innerText = 'Total price : $' + totalPrice
}

window.onload = populateItemsDiv

itemForm.onsubmit = async (event: Event) => {
    event.preventDefault()

    const name = document.getElementById(elementId: 'nameInput').value
    const quantity = document.getElementById(elementId: 'quantityInput').value
    const price = document.getElementById(elementId: 'priceInput').value

    await db.items.add({name, quantity, price})
    await populateItemsDiv()

    itemForm.reset()
}

const toggleItemStatus = async(event, id) => {
    await db.items.update(id, { isPurchased: !!event.target.checked })
    await populateItemsDiv()
}

const removeItem = async(id) => {
    await db.items.delete(id)
    await populateItemsDiv()
}

