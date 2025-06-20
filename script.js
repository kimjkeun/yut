document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const probabilitySlider = document.getElementById('probability');
    const probValueDisplay = document.getElementById('prob-value');
    
    // Probability display elements
    const doProb = document.getElementById('do-prob');
    const gaeProb = document.getElementById('gae-prob');
    const geolProb = document.getElementById('geol-prob');
    const yutProb = document.getElementById('yut-prob');
    const moProb = document.getElementById('mo-prob');
    
    // Probability bars
    const doBar = document.getElementById('do-bar');
    const gaeBar = document.getElementById('gae-bar');
    const geolBar = document.getElementById('geol-bar');
    const yutBar = document.getElementById('yut-bar');
    const moBar = document.getElementById('mo-bar');
    
    // Calculate and update probabilities when slider value changes
    probabilitySlider.addEventListener('input', updateProbabilities);
    
    // Initial calculation
    updateProbabilities();
    
    function updateProbabilities() {
        // Get the probability p from the slider
        const p = parseFloat(probabilitySlider.value);
        probValueDisplay.textContent = p.toFixed(2);
        
        // Calculate probabilities using binomial distribution
        // P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
        // where n = 4 (total number of sticks) and k is the number of front faces
        
        // Calculate combinations C(n,k)
        const C = (n, k) => {
            // Calculate factorial
            const factorial = (num) => {
                if (num === 0 || num === 1) return 1;
                let result = 1;
                for (let i = 2; i <= num; i++) {
                    result *= i;
                }
                return result;
            };
            
            return factorial(n) / (factorial(k) * factorial(n - k));
        };
        
        // Calculate probabilities for each outcome
        const pDo = C(4, 1) * Math.pow(p, 1) * Math.pow(1 - p, 3);    // 도: 1 front, 3 back
        const pGae = C(4, 2) * Math.pow(p, 2) * Math.pow(1 - p, 2);   // 개: 2 front, 2 back
        const pGeol = C(4, 3) * Math.pow(p, 3) * Math.pow(1 - p, 1);  // 걸: 3 front, 1 back
        const pYut = C(4, 4) * Math.pow(p, 4) * Math.pow(1 - p, 0);   // 윷: 4 front, 0 back
        const pMo = C(4, 0) * Math.pow(p, 0) * Math.pow(1 - p, 4);    // 모: 0 front, 4 back
        
        // Update probability displays (as percentages)
        doProb.textContent = (pDo * 100).toFixed(2) + '%';
        gaeProb.textContent = (pGae * 100).toFixed(2) + '%';
        geolProb.textContent = (pGeol * 100).toFixed(2) + '%';
        yutProb.textContent = (pYut * 100).toFixed(2) + '%';
        moProb.textContent = (pMo * 100).toFixed(2) + '%';
        
        // Update probability bars
        // Find the maximum probability to scale the bars
        const maxProb = Math.max(pDo, pGae, pGeol, pYut, pMo);
        
        doBar.style.width = (pDo / maxProb * 100) + '%';
        gaeBar.style.width = (pGae / maxProb * 100) + '%';
        geolBar.style.width = (pGeol / maxProb * 100) + '%';
        yutBar.style.width = (pYut / maxProb * 100) + '%';
        moBar.style.width = (pMo / maxProb * 100) + '%';
    }
});
