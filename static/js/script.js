let loadingInterval;

function animateLoadingText() {
    const loadingSpinner = document.getElementById('loading-spinner');
    let dots = 0;
    
    return setInterval(() => {
        dots = (dots + 1) % 4;
        loadingSpinner.textContent = "Generating your tailored resume" + ".".repeat(dots);
    }, 500);
}