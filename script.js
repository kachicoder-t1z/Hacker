let target = document.getElementById("target");

let hackBtn = document.getElementById("hackBtn");

let result = document.getElementById("result");

let progressBar = document.getElementById("progressBar");

let buttonText = document.getElementById("buttonText");

let logs = document.getElementById("logs");

let leftBinary = document.getElementById("leftBinary");

let rightBinary = document.getElementById("rightBinary");


// ===============================
// MOVING BINARY NUMBERS
// ===============================

function createBinaryStream(container) {

    container.innerHTML = "";

    for (let i = 0; i < 100; i++) {

        let number = document.createElement("span");

        number.innerText = Math.floor(Math.random() * 2);

        container.append(number);
    }
}


function moveBinary(container) {

    let numbers = container.querySelectorAll("span");

    numbers.forEach(function (number) {

        number.innerText =
            Math.floor(Math.random() * 2);

    });
}


createBinaryStream(leftBinary);

createBinaryStream(rightBinary);


// Numbers continuously change
setInterval(function () {

    moveBinary(leftBinary);

    moveBinary(rightBinary);

}, 180);


// ===============================
// SYSTEM LOG
// ===============================

function addLog(message) {

    let time = new Date();

    let hours =
        String(time.getHours()).padStart(2, "0");

    let minutes =
        String(time.getMinutes()).padStart(2, "0");

    let seconds =
        String(time.getSeconds()).padStart(2, "0");


    let line = document.createElement("p");

    line.innerText =
        `[${hours}:${minutes}:${seconds}] ${message}`;


    logs.append(line);


    if (logs.children.length > 7) {

        logs.removeChild(logs.firstElementChild);

    }
}


// ===============================
// RUN SCAN
// ===============================

hackBtn.addEventListener("click", function () {

    let targetValue = target.value.trim();


    // Target empty
    if (targetValue === "") {

        result.innerHTML =
            '<span class="result-dot"></span> Please enter a target.';

        return;
    }


    // Selected options
    let selected =
        document.querySelectorAll(
            '.options input[type="checkbox"]:checked'
        );


    // No option selected
    if (selected.length === 0) {

        result.innerHTML =
            '<span class="result-dot"></span> Please select an option.';

        return;
    }


    // Disable button
    hackBtn.disabled = true;

    buttonText.innerText = "SCANNING...";


    // Reset progress
    progressBar.style.width = "0%";


    // Start
    result.innerHTML =
        '<span class="result-dot"></span> Initializing scan...';

    addLog("Initializing scan...");


    let progress = 0;


    let scanInterval = setInterval(function () {

        progress += 5;

        progressBar.style.width = progress + "%";


        // Stage 1
        if (progress === 20) {

            result.innerHTML =
                '<span class="result-dot"></span> Loading security modules...';

            addLog("Loading modules...");
        }


        // Stage 2
        if (progress === 40) {

            result.innerHTML =
                '<span class="result-dot"></span> Connecting to target...';

            addLog("Connecting to target...");
        }


        // Stage 3
        if (progress === 60) {

            result.innerHTML =
                '<span class="result-dot"></span> Analyzing data stream...';

            addLog("Analyzing data...");
        }


        // Stage 4
        if (progress === 80) {

            result.innerHTML =
                '<span class="result-dot"></span> Checking access points...';

            addLog("Checking access points...");
        }


        // Complete
        if (progress >= 100) {

            clearInterval(scanInterval);


            setTimeout(function () {

                result.innerHTML =
                    '<span class="result-dot"></span>' +
                    "Demo scan completed! Target: " +
                    targetValue +
                    " | Options: " +
                    selected.length;


                buttonText.innerText = "RUN SCAN";

                hackBtn.disabled = false;

                addLog("Scan completed successfully.");

            }, 300);

        }

    }, 100);

});