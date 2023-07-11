//Shopping Application

const ITEMS_COLLECTION = document.getElementById('items');
const ITEM_TEMPLATE = document.getElementById('itemTemplate');
const ITEM_ADDITION_BUTTON = document.getElementById('add');

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
    refreshList();
}

function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
    
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


    ITEMS_COLLECTION.innerHTML = "";

    for (let item of items){
        let itemElement = ITEM_TEMPLATE.content.cloneNode(true);
            let descriptionInput = itemElement.querySelector('.item-description');
                let completedInput = itemElement.querySelector('.item-completed');

            descriptionInput.value = item.description;

            completedInput.checked = item.completed;


                descriptionInput.addEventListener("change", () => {
                    updateItem(item, "description", descriptionInput.value);
                });

                completedInput.addEventListener("change", () => {
                    updateItem(item, "completed", completedInput.checked);
                });


            ITEMS_COLLECTION.append(itemElement);
    }
}

    ITEM_ADDITION_BUTTON.addEventListener('click', () => {
        addItem();
    });

    refreshList();

/* 






 









function refreshList() {
        items.sort((a,b) => {
            if (a.completed){
                return 1;
            }
            if (b.completed) {
                return -1;
                
            }
            return a.description < b.description ? -1 : 1;
        })
        
    } */
