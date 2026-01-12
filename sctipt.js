let inputSection = document.querySelector('.input-section input')
let addBtn = document.querySelector('.add-btn')
let tasks = document.querySelector('.tasks')
let API = 'https://6906e447b1879c890ed84180.mockapi.io/api/v1/students';


addBtn.addEventListener('click', postData)

async function getData() {
    let response = await fetch(API)
    let data = await response.json()

    if (data) {
        tasks.innerHTML = "";
        data.forEach(elem => {
            let div = document.createElement('div')
            div.classList.add('list')
            div.innerHTML = `
                <p class='paraText'>${elem.SName}</p>
                <input class = 'editInput' type="text" value="${elem.SName}">
                <button class="delete">Delete</button>
                <button class="edit">Edit</button>
                <button class='saveBtn'>save</button>
        `
            let deleteBtn = div.querySelector('.delete')
            let paraText = div.querySelector('.paraText')
            let edit = div.querySelector('.edit')
            let saveBtn = div.querySelector('.saveBtn')
            let editInput = div.querySelector('.editInput')
            deleteBtn.addEventListener('click', () => {
                deleteData(elem.id)
            })
            edit.addEventListener('click', () => {
                edit.style.display = 'none';
                paraText.style.display = 'none'
                saveBtn.style.display = 'inline'
                editInput.style.display = 'inline'
            })
            saveBtn.addEventListener('click', async () => {
                let updateInput = editInput.value;
                await updateData(elem.id, updateInput)
                edit.style.display = 'inline';
                paraText.style.display = 'inline'
                editInput.style.display = 'none'
                saveBtn.style.display = 'none';
            })

            tasks.append(div)

        });
    }
}

async function postData() {
    let value = inputSection.value
    let objData = {
        SName: value.trim()
    }
    let response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData)
    })
    if (response.ok) {
        getData();
        inputSection.value = ""
    }
}

async function updateData(id, value) {
    let objData = {
        SName: value.trim()
    }
    let response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData)
    })
    if (response.ok) {
        getData();
    }
}

async function deleteData(id) {
    let response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        getData()
    }
}


getData()