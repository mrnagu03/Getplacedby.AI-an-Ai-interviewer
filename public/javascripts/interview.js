let questionBox = document.querySelector(".question-box");
let questionButton = document.querySelectorAll(".que");
let questionNO = document.querySelectorAll(".questionNo");
let questions = document.querySelectorAll(".p");
let webcam = document.querySelectorAll(".webcam");
let reminder = document.querySelector(".reminder")

//Text-to-Speach components.....
let note = document.querySelector(".note")
let speaks = document.querySelectorAll(".speak");
let textBox = document.querySelectorAll(".text");

//Speach-to-text-components....
let startButton = document.getElementById('start-btn');
let stopButton = document.getElementById('stop-btn');
let transcriptionElement = document.getElementById('transcription');
let edit = document.querySelector(".edit")
let submitAnswer = document.querySelector(".submit-ans")

//allowing the user ans to edit...
edit.addEventListener("click", () => {
    if (transcriptionElement.hasAttribute('readonly')) {
        transcriptionElement.removeAttribute('readonly');
        this.textContent = 'Disable Editing';
    } else {
        transcriptionElement.setAttribute('readonly', true);
        this.textContent = 'Enable Editing';
    }
})

let activeIndex = -1;
let i = -1;
console.log(questionNO[activeIndex])
let nextQuestion = document.querySelector(".next");
let previousQuestion = document.querySelector(".previous");
let speach = new SpeechSynthesisUtterance();
let s = -1;
nextQuestion.addEventListener("click", () => {
    nextQuestion.innerHTML = "Next Question"

    console.log("hyee")
    note.style.display = "none";
    reminder.style.display = "flex";
    s++;
    activeIndex++;
    i++;
    questionNO[i].style.backgroundColor = "yellow";
    questionNO[i].style.color = "black";
    if (i > 0) {
        previousQuestion.style.display = "block";
    }

    questions[i].style.display = "flex";
    questions[i - 1].style.display = "none";

    questionNO[i - 1].style.backgroundColor = "black";
    questionNO[i - 1].style.color = "white";
    speaks[s].addEventListener("click", () => {
        speach.text = textBox[s].value;
        window.speechSynthesis.speak(speach);

    })
})

previousQuestion.addEventListener("click", () => {
    activeIndex--;
    i--;
    if (i == 0) {
        previousQuestion.style.display = "none";
    }
    questions[i].style.display = "flex"
    questions[i + 1].style.display = "none"
    if (i == activeIndex) {
        questionNO[i].style.backgroundColor = "yellow";
        questionNO[i].style.color = "black";
        questionNO[i + 1].style.backgroundColor = "black";
        questionNO[i + 1].style.color = "white";
    }
})


// webcam
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('webcam');
    const toggleButton = document.getElementById('toggleButton');

    let stream;

    function startWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                stream = mediaStream;
                video.srcObject = mediaStream;
                toggleButton.textContent = 'Turn Off Webcam';
                toggleButton.style.backgroundColor = "yellow"
                toggleButton.style.color = "black"
                video.play();


            })
            .catch((err) => {
                console.error('Error accessing the webcam: ', err);
                alert(`Error: ${err.message}`);
            });
    }
    function stopWebcam() {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
            toggleButton.textContent = 'Turn On Webcam';
            toggleButton.style.backgroundColor = "black"
            toggleButton.style.color = "white"
        }

    }

    toggleButton.addEventListener('click', function () {
        if (video.srcObject) {

            stopWebcam();
        } else {

            startWebcam();
        }
    });
});
//STT
submitAnswer.addEventListener("click", () => {
    submitAnswer.style.backgroundColor = "rgb(43, 66, 10)"
    submitAnswer.textContent = "Submited"
    submitAnswer.style.color = "white"
})


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert('Web Speech API is not supported in your browser. Try using Chrome or Edge.');
    startButton.disabled = true;
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcriptionElement.textContent = transcript.trim();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
    };

    startButton.addEventListener('click', () => {
        if (
            recognition.interimResults) {
            recognition.start();
            startButton.disabled = true;
            stopButton.disabled = false;
            stopButton.style.display = "block"
            stopButton.style.color = "red"
            stopButton.style.backgroundColor = "white"
            startButton.style.display = "none"

        }

    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
        stopButton.style.display = "none"
        startButton.style.display = "block"


    });
};

questionNO.forEach((val) => {
    val.addEventListener("click", () => {
        submitAnswer.style.backgroundColor = "rgb(150, 215, 59)"
        submitAnswer.textContent = "Submit"
        submitAnswer.style.color = "white"
    })
});



