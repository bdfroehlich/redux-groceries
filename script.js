// grab DOM elements that functionality will be added to
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// instantiate default state value
const initialState = {
    groceries: []
}

// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.payload
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

const store = Redux.createStore(groceryReducer)

// actions/functions

const clearList = () => {
    document.getElementById("newItem").value = "";
    store.dispatch({
        type: 'grocery/clear',
    })
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        payload: groceryText
    })
    console.log(store.getState())
}

//event listeners
grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

const renderList = state => {
    //clear the content of the list on each render, just before re-rendering state
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        //generate a new list item for each grocery item
        let li = document.createElement('li');
        //apend li element to the list in the dom
        list.appendChild(li)
        //give li a value
        li.textContent = grocery.text
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)