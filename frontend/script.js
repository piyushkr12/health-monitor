async function analyzeServer() {

    const logs = document.getElementById("serverLogs").value;

    if (!logs.trim()) {
        alert("Please paste server logs!");
        return;
    }

    const response = await fetch("http://localhost:5020/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ logs })
    });

    const data = await response.json();

    const statusClass =
        data.status === "Stable"
            ? "status-good"
            : "status-bad";

    document.getElementById("result").innerHTML = `

        <div class="card">
            <h3>Log Records</h3>
            <p>${data.totalLogs}</p>
        </div>

        <div class="card">
            <h3>Critical Errors</h3>
            <p>${data.errors}</p>
        </div>

        <div class="card">
            <h3>System Warnings</h3>
            <p>${data.warnings}</p>
        </div>

        <div class="card">
            <h3>Server Status</h3>
            <p class="${statusClass}">${data.status}</p>
        </div>

    `;
}