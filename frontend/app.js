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

document.addEventListener("DOMContentLoaded", () => {
    loadMonitors()
})

async function deleteMonitor(id){
    try{
        let response = await fetch(API_URL + "/monitors/" + id, {method: "DELETE"});
        loadMonitors();
    } catch{
        console.error("Failed to delete");
    }
    
}
