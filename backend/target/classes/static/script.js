// ===== Generate Learning Path =====
function generate() {
    const hours = document.getElementById("hours").value;

    if (!hours) {
        alert("Please enter Hours per Week");
        return;
    }

    const data = {
        skillLevel: document.getElementById("skill").value,
        goal: document.getElementById("goal").value,
        hoursPerWeek: hours
    };

    fetch("http://localhost:9090/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("API request failed");
        }
        return res.text();
    })
    .then(result => {
        const output = document.getElementById("output");
        const progressBar = document.getElementById("progress-bar");

        output.innerHTML = "";
        progressBar.style.width = "0%";

        const steps = result.split("\n");
        let progress = 0;
        const stepSize = 100 / steps.length;

        steps.forEach((step, index) => {
            setTimeout(() => {
                const li = document.createElement("li");
                li.textContent = step;
                output.appendChild(li);

                progress += stepSize;
                progressBar.style.width = progress + "%";
            }, index * 400);
        });

        document.getElementById("result").classList.remove("hidden");
    })
    .catch(err => {
        console.error(err);
        alert("Error generating learning path");
    });
}

// ===== Download Learning Path as PDF =====
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("AI Learning Path", 20, 20);

    doc.setFontSize(12);
    let y = 35;

    const steps = document.querySelectorAll("#output li");

    if (steps.length === 0) {
        alert("No learning path to download!");
        return;
    }

    steps.forEach((step, index) => {
        doc.text(`${index + 1}. ${step.innerText}`, 20, y);
        y += 10;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save("AI_Learning_Path.pdf");
}
