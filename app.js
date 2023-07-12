//Shopping Application

const ITEMS_COLLECTION = document.getElementById('items');
const ITEM_TEMPLATE = document.getElementById('itemTemplate');
const ITEM_ADDITION_BUTTON = document.getElementById('add');
const ITEM_DELETE_BUTTON = document.getElementById('delete');

    let items = getItems();

function getItems() {
    const value = localStorage.getItem('shopping-list') || "[]";
    return JSON.parse(value);
    
}

function setItems(items) {
    const itemsJSON = JSON.stringify(items);
    localStorage.setItem("shopping-list", itemsJSON);
    
}

function addItem(){
    items.unshift({
        description: "",
        completed: false
    });

    setItems(items)
    refreshShoppingList();
}



/*To delete shopping list items


*/


function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshShoppingList();
    
}

function refreshList() {
    
    items.sort((first,second) => {
        if (first.completed){
            return 1;
        }
        if (second.completed) {
            return -1;
            
        }
        return first.description < second.description ? -1 : 1;
    })
    
}


    ITEMS_COLLECTION.innerHTML = "";

    for (let item of items){
        let itemElement = ITEM_TEMPLATE.content.cloneNode(true);
            let descriptionInput = itemElement.querySelector('.item-description');
                let successfulinput = itemElement.querySelector('.item-completed');

            descriptionInput.value = item.description;

            successfulinput.checked = item.completed;


                descriptionInput.addEventListener("change", () => {
                    updateItem(item, "description", descriptionInput.value);
                });

                successfulinput.addEventListener("change", () => {
                    updateItem(item, "completed", successfulinput.checked);
                });


            ITEMS_COLLECTION.append(itemElement);
    }

    ITEM_ADDITION_BUTTON.addEventListener('click', () => {
        addItem();
    });

    /* ITEM_DELETE_BUTTON.addEventListener('click', () => {
        deleteItems();
    });
 */
    refreshShoppingList();
