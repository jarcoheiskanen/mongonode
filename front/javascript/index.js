

const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const messageInput = document.getElementById("messageInput");


function CreateText(Class, Name, Message, CurDate) {

    // Create HTML divs here.

    if (document.getElementById("list")) {
        let holder = document.createElement("div");
        let nameDiv = document.createElement("div");
        let messageDiv = document.createElement("div");
    
        messageDiv.innerHTML = Message;
        nameDiv.innerHTML = Name + " | " + Class;
    
        holder.appendChild(nameDiv);
        holder.appendChild(messageDiv);
        document.getElementById("list").appendChild(holder);
    
        holder.classList.add('messageBox');
        nameDiv.classList.add('nameText');
        messageDiv.classList.add('messageText');
    }

}


// Get function. Made for getting data.

function Get() {

    console.log("11")

    const XHR = new XMLHttpRequest()
    XHR.open('GET', 'http://localhost:5000/api/alerts', true)

    XHR.onreadystatechange = function() {
        if (XHR.readyState === 4 && XHR.status === 200) {
            console.log(XHR.responseText)
            let Table = JSON.parse(XHR.responseText).AlertData
            console.log(Table)
            for (let index in Table) {
                console.log(Table[index], Table[index].class)
                CreateText(Table[index].class, Table[index].name, Table[index].message, Table[index].curDate)
            }
            
        }
    }

    console.log("ADSIOJSAIOD")

    XHR.send()

}


// Send function AKA Create function. Made for posting.

function Send() {

    const JSON_Table = {
        name: nameInput.value,
        code: classInput.value,
        status: messageInput.value,
    }

    console.log("JSON", JSON_Table)

    fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        body: JSON.stringify(JSON_Table),
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        }
    })

    nameInput.value = ""
    classInput.value = ""
    messageInput.value = ""

    return false;

}

Get()