let timerInterval;
let timeRemaining = 25 * 60; // Default time in seconds (25 minutes)
let isPaused = true; // To track if the timer is paused
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pomocadoBtn = document.getElementById('pomocado');
const shortBreakBtn = document.getElementById('shortBreak');
const longBreakBtn = document.getElementById('longBreak');
const progressBarElement = document.querySelector('.progress-bar');

// Function to format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}

// Function to update the progress bar
function updateProgressBar(totalTime) {
    const progressPercentage = ((totalTime - timeRemaining) / totalTime) * 100; // Calculate progress percentage
    progressBarElement.style.width = `${progressPercentage}%`; // Update the width of the progress bar
    progressBarElement.style.backgroundColor = 'rgba(236, 249, 132, 0.8)'; // Set the progress bar color
    progressBarElement.textContent = `${Math.round(progressPercentage)}%`; // Update the text inside the progress bar
    progressBarElement.setAttribute('aria-valuenow', Math.round(progressPercentage)); // Update the aria-valuenow attribute
    progressBarElement.parentElement.style.border = `2px solid #2a3f0c`; // Set the border color of the bar container
    progressBarElement.parentElement.style.backgroundColor = '#3b5a1a'; // Set the background color of the bar container to a lighter shade of #2a3f0c
    progressBarElement.style.display = 'flex'; // Use flexbox for centering
    progressBarElement.style.alignItems = 'center'; // Center text vertically
    progressBarElement.style.justifyContent = 'center'; // Center text horizontally
}

// Start/Pause button functionality
startBtn.addEventListener('click', () => {
    if (isPaused) {
        startBtn.textContent = 'Pause';
        startBtn.style.fontWeight = '800'; // Make the button text bold
        isPaused = false;
        const totalTime = timeRemaining; // Capture the total time for progress calculation
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimerDisplay();
                updateProgressBar(totalTime);
            } else {
                clearInterval(timerInterval);
                startBtn.textContent = 'Start';
                startBtn.style.fontWeight = '800'; // Make the button text bold
                isPaused = true;
            }
        }, 1000);
    } else {
        startBtn.textContent = 'Start';
        isPaused = true;
        clearInterval(timerInterval);
    }
});

// Reset button functionality
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeRemaining = 25 * 60; // Reset to default 25 minutes
    updateTimerDisplay();
    updateProgressBar(25 * 60); // Reset progress bar
    startBtn.textContent = 'Start';
    startBtn.style.fontWeight = '800'; // Make the button text bold
    isPaused = true;
});

// Pomocado button functionality
pomocadoBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeRemaining = 25 * 60; // Set to 25 minutes
    updateTimerDisplay();
    updateProgressBar(25 * 60); // Reset progress bar
    startBtn.textContent = 'Start';
    startBtn.style.fontWeight = '800'; // Make the button text bold
    isPaused = true;
});

// Short Break button functionality
shortBreakBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeRemaining = 5 * 60; // Set to 5 minutes
    updateTimerDisplay();
    updateProgressBar(5 * 60); // Reset progress bar
    startBtn.textContent = 'Start';
    startBtn.style.fontWeight = '800'; // Make the button text bold
    isPaused = true;
});

// Long Break button functionality
longBreakBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeRemaining = 15 * 60; // Set to 15 minutes
    updateTimerDisplay();
    updateProgressBar(15 * 60); // Reset progress bar
    startBtn.textContent = 'Start';
    startBtn.style.fontWeight = '800'; // Make the button text bold
    isPaused = true;
});

// Initialize the timer display on page load
updateTimerDisplay();
updateProgressBar(25 * 60); // Initialize progress bar

// Fetch and display the quote of the day
async function fetchQuoteOfTheDay() {
    try {
        const response = await fetch('https://qapi.vercel.app/api/random');
        const data = await response.json();
        const quote = data.quote;
        const author = data.author;

        const motivationalQuoteContainer = document.getElementById('motivationalQuoteContainer');
        motivationalQuoteContainer.innerHTML = `
            <p style="font-size: 1.2em; font-style: italic; color:#633016;">"${quote}"</p>
            <b><p style="font-size: 1em; text-align: right; margin-top: 0.5em;color:#633016;">- ${author}</p></b>
        `;
    } catch (error) {
        console.error('Error fetching the quote:', error);
    }
}

// Call the function to fetch and display the quote every 5 minutes
setInterval(fetchQuoteOfTheDay, 5 * 60 * 1000);

// Fetch the initial quote on page load
fetchQuoteOfTheDay();