

const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const messageInput = document.getElementById("messageInput");


function CreateText(Class, Name, Message, id, res) {

    // Create HTML divs here.

    if (document.getElementById("list")) {
        let holder = document.createElement("div");
        let nameDiv = document.createElement("div");
        let messageDiv = document.createElement("div");

        let removeDiv = document.createElement("button")
        let editDiv = document.createElement("button")

        removeDiv.innerHTML = "REMOVE";
        editDiv.innerHTML = "EDIT";
        removeDiv.type = "button"
        editDiv.type = "button"
    
        messageDiv.innerHTML = Message;
        nameDiv.innerHTML = Name + " | " + Class;
    
        holder.appendChild(nameDiv);
        holder.appendChild(messageDiv);
        document.getElementById("list").appendChild(holder);
        holder.appendChild(removeDiv);
        holder.appendChild(editDiv);
    
        holder.classList.add('messageBox');
        nameDiv.classList.add('nameText');
        messageDiv.classList.add('messageText');

        removeDiv.addEventListener("click", async function() {
            const response = await fetch(`http://localhost:5000/api/alerts/${id}`, {
                method: 'DELETE',
            }).then((response) => response.json())
            console.log("REMOVED:", response)
            holder.remove();
        });
        
        editDiv.addEventListener("click", () => {

            const namePrompt = prompt("Enter new Name")
            const statusPrompt = prompt("Enter new Status")
            const codePrompt = prompt("Enter new Code")

            console.log("EDITED:", `http://localhost:5000/api/alerts/${id}`, JSON.stringify({name: namePrompt, status: statusPrompt, code: codePrompt}))

            fetch(`http://localhost:5000/api/alerts/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: namePrompt,
                    status: statusPrompt,
                    code: codePrompt
                }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

            holder.remove();

            CreateText(codePrompt, namePrompt, statusPrompt, id)

        });


    }

}


// Get function. Made for getting data.

async function Get() {

    console.log("11")

    const response = await fetch('http://localhost:5000/api/alerts', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())

    console.log("..", response)

    if (response) {
        
        let Table = response
        for (let index in Table) {
            console.log(Table[index], Table[index].name)
            CreateText(Table[index].code, Table[index].name, Table[index].status, Table[index]._id)
        }
        
    }
    
    console.log("ADSIOJSAIOD")

}


// Send function AKA Create function. Made for posting.

async function Send() {

    const currentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const JSON_Table = {
        name: nameInput.value,
        code: classInput.value,
        status: messageInput.value,
        //curDate: currentdate
    }

    console.log("JSON", JSON_Table)

    const response = await fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        body: JSON.stringify(JSON_Table),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then((response) => response.json())

    console.log("..", response)

    nameInput.value = ""
    classInput.value = ""
    messageInput.value = ""

    return false;

}

setTimeout(() => {
    Get()
}, "500");