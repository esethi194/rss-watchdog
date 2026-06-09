const API_URL = "http://127.0.0.1:8000"

async function loadMonitors() {
    try {
        let response = await fetch(API_URL + "/monitors");
        let data = await response.json();
        const monitorContainer = document.getElementById("monitor-container")

        const htmlTemplate = data.map(monitor => `
        <div class="monitor-card">
            <h3>Name: ${monitor.name}</h3>
            <p>Keyword: <code>${monitor.keyword}</code></p>
            <p>Feed URL: <a href="${monitor.feed_url}">${monitor.feed_url}</a></p>
            <div class="action-info">
            <span>Type: ${monitor.action_type}</span>
            <span>Config: ${monitor.action_config}</span>
            </div>
            <h4><button onclick="deleteMonitor(${monitor.id})">Delete</button></h4>
        </div>
        `).join(''); 
        monitorContainer.innerHTML = htmlTemplate;

    } catch {
        console.error("Failed to get monitors");
    }
}

async function loadLogs() {
    try {
        let response = await fetch(API_URL + "/logs");
        let data = await response.json();
        const logContainer = document.getElementById("table-body")

        const htmlTemplate = data.map(log => `
        <tr>
            <td>${log.monitor_id}</td>
            <td>${log.ran_at}</td>
            <td>${log.status}</td>
            <td>${log.matched_entry}</td>
        </tr>
        `).join(''); 
        logContainer.innerHTML = htmlTemplate;

    } catch {
        console.error("Failed to get logs");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("monitor-container")){
        loadMonitors()
    }
    if(document.getElementById("create-monitor-form")){
        const action_type = document.getElementById("action-type")
        action_type.addEventListener('change', updateConfigLabel)
        const submit = document.getElementById("submit-btn")
        submit.addEventListener('click', createMonitor)
    }
    if(document.getElementById("table-body")){
        loadLogs()
    }
})

async function deleteMonitor(id){
    try{
        let response = await fetch(API_URL + "/monitors/" + id, {method: "DELETE"});
        loadMonitors();
    } catch{
        console.error("Failed to delete");
    }
    
}

function updateConfigLabel(){
    let action_type = document.getElementById("action-type");
    const config_input = document.getElementById("action-config");
    const config_label = document.getElementById("action-config-label");
    if(action_type.value == "Email"){
        config_input.style.display = "block";
        config_label.textContent = "Email address";
    } else if(action_type.value == "Webhook"){
        config_input.style.display = "block";
        config_label.textContent = "Webhook address";
    } else if(action_type.value == "Log"){
        config_input.style.display = "none";
        config_label.style.display = "none";
    }
}

function submitForm(){
    createMonitor();
}

async function createMonitor() {
    
    let name = document.getElementById("name").value;
    let feed_url = document.getElementById("feedURL").value;
    let keyword = document.getElementById("keyword").value;
    let action_type = document.getElementById("action-type").value;
    let action_config = document.getElementById("action-config").value;

    try{
        let response = await fetch(API_URL + "/monitors", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, feed_url: feed_url, keyword: keyword, action_type: action_type, action_config: action_config})
        })
        window.location.href = "index.html"
    } catch{
        console.error("monitor created");
    }
}

