// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initCountdownTimer();
    initFloatingElements();
    initSurprises();
    initWishes();
    initCake();
    initCelebrationEffects();
    initModal();
    
    // Start background animations
    startBackgroundEffects();
    
    // Auto-start some effects
    setTimeout(() => {
        createFloatingHearts(10);
        createFloatingStars(20);
    }, 1000);
    
    // Show welcome message
    setTimeout(() => {
        showNotification("🎉 Welcome to Swastika's Birthday Celebration!");
    }, 1500);
});

// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    
                    // Add celebration effect on section change
                    if (targetSection !== 'welcome') {
                        createSparkleEffect(section);
                        playClickSound();
                    }
                }
            });
        });
    });
}

// Countdown Timer
function initCountdownTimer() {
    const birthday = new Date('January 12, 2025 00:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const timerMessage = document.getElementById('timerMessage');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = birthday - now;
        
        if (timeLeft <= 0) {
            // Birthday has arrived!
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            progressFill.style.width = '100%';
            progressPercent.textContent = '100%';
            timerMessage.innerHTML = '<i class="fas fa-birthday-cake"></i> <span>🎊 Happy Birthday Swastika! 🎊</span>';
            document.body.classList.add('birthday-now');
            return;
        }
        
        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update display
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Update progress
        const totalDaySeconds = 24 * 60 * 60 * 1000;
        const progress = ((totalDaySeconds - (timeLeft % totalDaySeconds)) / totalDaySeconds) * 100;
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
        
        // Update message based on time
        updateTimerMessage(days, hours);
        
        // Add pulse animation to seconds
        if (seconds % 2 === 0) {
            secondsElement.style.animation = 'unitPulse 1s ease';
            setTimeout(() => secondsElement.style.animation = '', 1000);
        }
    }
    
    function updateTimerMessage(days, hours) {
        if (days === 0 && hours <= 24) {
            timerMessage.innerHTML = '<i class="fas fa-hourglass-end"></i> <span>Birthday is almost here! Get ready! 🎉</span>';
        } else if (days === 1) {
            timerMessage.innerHTML = '<i class="fas fa-calendar-star"></i> <span>Only 1 day to go! Excited? ✨</span>';
        } else if (days < 7) {
            timerMessage.innerHTML = '<i class="fas fa-rocket"></i> <span>Birthday countdown in progress! 🚀</span>';
        } else {
            timerMessage.innerHTML = '<i class="fas fa-birthday-cake"></i> <span>Getting ready for the celebration!</span>';
        }
    }
    
    // Initialize
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Timer button events
    document.getElementById('setReminder').addEventListener('click', function() {
        showNotification("⏰ Reminder set for Swastika's Birthday!");
        createConfetti();
        playBellSound();
    });
    
    document.getElementById('shareTimer').addEventListener('click', function() {
        showNotification("📱 Countdown shared! Spread the excitement!");
        createSparkleEffect(this);
        playShareSound();
    });
    
    document.getElementById('surpriseTimer').addEventListener('click', function() {
        createTimeSurprise();
    });
}

// Floating Elements
function initFloatingElements() {
    setInterval(() => {
        if (Math.random() > 0.7) createFloatingHearts(3);
        if (Math.random() > 0.8) createFloatingStars(5);
        if (Math.random() > 0.9) createFloatingBalloons(1);
    }, 3000);
}

function createFloatingHearts(count) {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        const size = Math.random() * 25 + 15;
        const left = Math.random() * 100;
        const color = ['#ff6b8b', '#ff8e53', '#ffde00', '#a18cd1'][Math.floor(Math.random() * 4)];
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 2;
        
        heart.style.cssText = `
            position: fixed;
            left: ${left}%;
            top: 100%;
            font-size: ${size}px;
            color: ${color};
            opacity: 0;
            animation: floatUp ${duration}s ease-in ${delay}s forwards;
            pointer-events: none;
            z-index: 1;
            filter: drop-shadow(0 0 5px ${color});
        `;
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => heart.remove(), (duration + delay) * 1000);
    }
}

function createFloatingStars(count) {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.innerHTML = '<i class="fas fa-star"></i>';
        
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const color = '#ffde00';
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            position: fixed;
            left: ${left}%;
            top: 100%;
            font-size: ${size}px;
            color: ${color};
            opacity: 0;
            animation: floatUp ${duration}s ease-in ${delay}s forwards, starTwinkle 1s infinite alternate;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(star);
        setTimeout(() => star.remove(), (duration + delay) * 1000);
    }
}

function createFloatingBalloons(count) {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        
        const size = Math.random() * 60 + 40;
        const left = Math.random() * 100;
        const colors = ['#ff6b8b', '#ff8e53', '#ffde00', '#4cd964', '#5ac8fa', '#a18cd1'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 15 + 10;
        
        balloon.style.cssText = `
            position: fixed;
            left: ${left}%;
            top: 100%;
            width: ${size}px;
            height: ${size * 1.2}px;
            background: ${color};
            border-radius: 50%;
            opacity: 0;
            animation: floatUp ${duration}s ease-in forwards, balloonFloat 3s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        
        // Add string
        const string = document.createElement('div');
        string.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            width: 2px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            transform: translateX(-50%);
        `;
        
        balloon.appendChild(string);
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), duration * 1000);
    }
}

// Surprises System
function initSurprises() {
    const surpriseCards = document.querySelectorAll('.surprise-card');
    
    surpriseCards.forEach(card => {
        card.addEventListener('click', function() {
            const surpriseType = this.dataset.surprise;
            activateSurprise(surpriseType);
            playClickSound();
            
            // Add click effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'unitPulse 0.5s ease';
            }, 10);
        });
    });
    
    // Mega Surprise
    document.getElementById('megaSurpriseBtn').addEventListener('click', function() {
        activateMegaSurprise();
        playCelebrationSound();
    });
    
    // Quick Surprise
    document.getElementById('quickSurprise').addEventListener('click', function() {
        const surprises = ['fireworks', 'hearts', 'confetti', 'stars'];
        const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
        activateSurprise(randomSurprise);
        playClickSound();
    });
}

function activateSurprise(type) {
    switch(type) {
        case 'fireworks':
            createFireworksShow();
            showNotification("🎆 Amazing fireworks for Swastika!");
            break;
        case 'message':
            showSecretMessage();
            break;
        case 'stars':
            createStarShower();
            showNotification("✨ Make a wish on the stars!");
            break;
        case 'hearts':
            createHeartRain();
            showNotification("💕 Sending love to Swastika!");
            break;
        case 'gift':
            showVirtualGift();
            break;
        case 'confetti':
            createConfettiBlast();
            showNotification("🎉 Party time! Confetti everywhere!");
            break;
    }
}

function activateMegaSurprise() {
    // Activate all surprises at once
    createFireworksShow();
    createHeartRain();
    createStarShower();
    createConfettiBlast();
    showSecretMessage();
    showVirtualGift();
    
    // Special effects
    document.body.classList.add('mega-celebration');
    setTimeout(() => document.body.classList.remove('mega-celebration'), 3000);
    
    // Show modal
    setTimeout(() => showBirthdayModal(), 1000);
    
    showNotification("🎊 MEGA SURPRISE ACTIVATED! Ultimate celebration!");
}

function createFireworksShow() {
    const container = document.getElementById('fireworksContainer');
    const fireworkCount = 15;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createSingleFirework();
        }, i * 200);
    }
}

function createSingleFirework() {
    const container = document.getElementById('fireworksContainer');
    const firework = document.createElement('div');
    
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    const size = Math.random() * 100 + 50;
    const colors = [
        'radial-gradient(circle, rgba(255,107,139,0.8), transparent 70%)',
        'radial-gradient(circle, rgba(255,222,0,0.8), transparent 70%)',
        'radial-gradient(circle, rgba(161,140,209,0.8), transparent 70%)',
        'radial-gradient(circle, rgba(76,217,100,0.8), transparent 70%)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    firework.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        animation: fireworkExplode 1s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;
    
    container.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

function createHeartRain() {
    createFloatingHearts(50);
}

function createStarShower() {
    createFloatingStars(30);
}

function createConfettiBlast() {
    const container = document.getElementById('confettiContainer');
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        const colors = ['#ff6b8b', '#ff8e53', '#ffde00', '#4cd964', '#5ac8fa', '#a18cd1', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 5;
        const shape = Math.random() > 0.5 ? 'circle' : 'square';
        const rotation = Math.random() * 360;
        
        confetti.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -50px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${shape === 'circle' ? '50%' : '2px'};
            opacity: 0;
            animation: confettiFall ${duration}s ease-out ${delay}s forwards;
            transform: rotate(${rotation}deg);
            pointer-events: none;
            z-index: 9;
        `;
        
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

function createTimeSurprise() {
    const messages = [
        "⏰ Time flies when you're having fun!",
        "🕰️ Every moment is precious!",
        "⏳ Making memories that last forever!",
        "⌛ Cherish every second!",
        "⏱️ Time for celebration!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage);
    
    // Create clock animation
    createClockEffect();
}

function createClockEffect() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const clock = document.createElement('div');
            clock.innerHTML = '<i class="fas fa-clock"></i>';
            
            clock.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                font-size: 30px;
                color: #ffde00;
                opacity: 0;
                animation: floatUp 4s ease-in forwards, clockSpin 2s linear infinite;
                pointer-events: none;
                z-index: 1;
            `;
            
            container.appendChild(clock);
            setTimeout(() => clock.remove(), 4000);
        }, i * 300);
    }
}

function showSecretMessage() {
    const messages = [
        "💌 You're the most amazing person!",
        "💖 Your smile brightens every day!",
        "✨ You deserve all the happiness in the world!",
        "🎀 May all your dreams come true!",
        "💫 You make the world a better place!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage);
    createSparkleEffect(document.getElementById('surprises'));
}

function showVirtualGift() {
    const gifts = [
        "🎁 Virtual hug!",
        "🎀 Box of happiness!",
        "🎊 Bundle of joy!",
        "🎈 Package of smiles!",
        "💝 Gift of love!"
    ];
    
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    showNotification(randomGift);
    
    // Create gift animation
    createGiftAnimation();
}

function createGiftAnimation() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const gift = document.createElement('div');
            gift.innerHTML = '<i class="fas fa-gift"></i>';
            
            gift.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: 50px;
                color: #ff6b8b;
                opacity: 0;
                animation: giftOpen 1s ease-out forwards;
                pointer-events: none;
                z-index: 10;
                transform: translate(-50%, -50%);
            `;
            
            container.appendChild(gift);
            setTimeout(() => gift.remove(), 1000);
        }, i * 300);
    }
}

// Wishes System
function initWishes() {
    const wishes = [
        "Happy Birthday Swastika! May your day be filled with joy and laughter!",
        "Wishing you endless happiness and success in everything you do!",
        "May this special day bring you closer to all your dreams and aspirations!",
        "Sending you oceans of love and mountains of happiness on your birthday!",
        "May your birthday be as bright and beautiful as you are!",
        "Wishing you health, wealth, and happiness today and always!",
        "May all your birthday wishes come true this year!",
        "Here's to another year of amazing adventures and beautiful memories!",
        "May your birthday be the start of a year filled with good luck and great opportunities!",
        "Wishing you a day that's as special in every way as you are!"
    ];
    
    let savedWishes = [];
    
    document.getElementById('newWish').addEventListener('click', function() {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        const wishDisplay = document.getElementById('wishDisplay');
        
        // Animate wish change
        wishDisplay.style.opacity = '0';
        setTimeout(() => {
            wishDisplay.querySelector('.wish-text').textContent = randomWish;
            wishDisplay.style.opacity = '1';
            createSparkleEffect(wishDisplay);
            playWishSound();
        }, 300);
    });
    
    document.getElementById('saveWish').addEventListener('click', function() {
        const currentWish = document.querySelector('.wish-text').textContent;
        savedWishes.push(currentWish);
        showNotification("💾 Wish saved! You have " + savedWishes.length + " saved wishes.");
        createSparkleEffect(this);
        playSaveSound();
    });
    
    document.getElementById('shareWish').addEventListener('click', function() {
        const currentWish = document.querySelector('.wish-text').textContent;
        showNotification("📤 Wish shared! Spread the birthday joy!");
        createShareEffect(this);
        playShareSound();
    });
}

// Cake System
function initCake() {
    const candles = document.querySelectorAll('.candle');
    let allLit = true;
    
    candles.forEach(candle => {
        candle.addEventListener('click', function() {
            const flame = this.querySelector('.flame');
            if (flame.style.opacity !== '0') {
                // Blow out this candle
                flame.style.opacity = '0';
                flame.style.animation = 'none';
                createSmokeEffect(this);
                checkAllCandles();
                playBlowSound();
            }
        });
    });
    
    document.getElementById('blowAll').addEventListener('click', function() {
        candles.forEach(candle => {
            const flame = candle.querySelector('.flame');
            flame.style.opacity = '0';
            flame.style.animation = 'none';
        });
        allLit = false;
        createSmokeEffect(document.querySelector('.candles'));
        showNotification("🎂 All candles blown! Make a wish!");
        playBlowSound();
    });
    
    document.getElementById('makeWish').addEventListener('click', function() {
        if (!allLit) {
            showNotification("✨ Wish made! May it come true!");
            createStarShower();
            playWishSound();
            
            // Relight candles after wish
            setTimeout(() => {
                candles.forEach(candle => {
                    const flame = candle.querySelector('.flame');
                    flame.style.opacity = '1';
                    flame.style.animation = 'candleFlicker 0.5s infinite alternate';
                });
                allLit = true;
            }, 2000);
        } else {
            showNotification("💫 Make your wish and blow the candles first!");
        }
    });
    
    function checkAllCandles() {
        const flames = document.querySelectorAll('.flame');
        allLit = Array.from(flames).some(flame => flame.style.opacity !== '0');
        if (!allLit) {
            setTimeout(() => {
                showNotification("🌟 All candles out! Time to make a wish!");
            }, 500);
        }
    }
    
    function createSmokeEffect(element) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const smoke = document.createElement('div');
                smoke.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    top: -20px;
                    left: 5px;
                    opacity: 0;
                    animation: smokeRise 2s ease-out forwards;
                    pointer-events: none;
                `;
                element.appendChild(smoke);
                setTimeout(() => smoke.remove(), 2000);
            }, i * 100);
        }
    }
}

// Celebration Effects
function initCelebrationEffects() {
    document.getElementById('startCelebration').addEventListener('click', function() {
        startFullCelebration();
        playCelebrationSound();
    });
}

function startFullCelebration() {
    // Activate all effects
    createFireworksShow();
    createHeartRain();
    createStarShower();
    createConfettiBlast();
    
    // Animate all elements
    document.querySelectorAll('.letter').forEach(letter => {
        letter.style.animation = 'bounceLetter 0.5s ease 3';
    });
    
    document.querySelectorAll('.name-letter').forEach(letter => {
        letter.style.animation = 'nameGlow 0.3s ease 3';
    });
    
    // Show celebration message
    showNotification("🎊 Celebration started! Let's party!");
    
    // Show modal after delay
    setTimeout(() => {
        showBirthdayModal();
    }, 1500);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const rect = element.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                background: #ffde00;
                border-radius: 50%;
                opacity: 0;
                animation: sparklePop 0.5s ease-out forwards;
                pointer-events: none;
                z-index: 5;
            `;
            
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 500);
        }, i * 50);
    }
}

function createShareEffect(element) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const share = document.createElement('div');
            share.innerHTML = '<i class="fas fa-share"></i>';
            
            const rect = element.getBoundingClientRect();
            
            share.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top}px;
                font-size: 20px;
                color: #5ac8fa;
                opacity: 0;
                animation: shareFloat 2s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            
            document.body.appendChild(share);
            setTimeout(() => share.remove(), 2000);
        }, i * 100);
    }
}

// Modal System
function initModal() {
    const modal = document.getElementById('birthdayModal');
    const modalClose = document.getElementById('modalClose');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCelebrate = document.getElementById('modalCelebrate');
    
    function closeModal() {
        modal.style.display = 'none';
        createConfetti();
    }
    
    modalClose.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    
    modalCelebrate.addEventListener('click', function() {
        closeModal();
        startFullCelebration();
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showBirthdayModal() {
    const modal = document.getElementById('birthdayModal');
    modal.style.display = 'flex';
    
    // Add sparkles
    const modalBody = modal.querySelector('.modal-body');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 8px;
                height: 8px;
                background: #ffde00;
                border-radius: 50%;
                opacity: 0;
                animation: sparklePop 1s ease-out forwards;
            `;
            modalBody.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    const text = notification.querySelector('.notification-text');
    
    text.textContent = message;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Background Effects
function startBackgroundEffects() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) scale(1);
            }
        }
        
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        
        @keyframes balloonFloat {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
        }
        
        @keyframes fireworkExplode {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes clockSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes giftOpen {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes smokeRise {
            0% {
                opacity: 0.8;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 20 - 10}px, -100px) scale(2);
            }
        }
        
        @keyframes sparklePop {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(1.5);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        @keyframes shareFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
            }
        }
        
        .birthday-now {
            animation: partyPulse 1s ease infinite;
        }
        
        @keyframes partyPulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3); }
        }
        
        .mega-celebration {
            animation: megaPulse 0.5s ease 6;
        }
        
        @keyframes megaPulse {
            0%, 100% { filter: brightness(1) hue-rotate(0deg); }
            50% { filter: brightness(1.5) hue-rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
}

// Sound Effects (using Web Audio API for simple sounds)
function playClickSound() {
    // Simple click sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playBellSound() {
    // Bell sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playCelebrationSound() {
    // Celebration sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play multiple tones
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 500 + (i * 100);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, i * 100);
        }
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playBlowSound() {
    // Blow sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playWishSound() {
    // Wish sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playSaveSound() {
    // Save sound
    playBellSound();
}

function playShareSound() {
    // Share sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 400 + (i * 100);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            }, i * 100);
        }
    } catch (e) {
        console.log("Audio not supported");
    }
}

// Initialize photo upload (simulated)
document.getElementById('uploadBtn').addEventListener('click', function() {
    // In a real implementation, this would trigger file upload
    // For demo, we'll simulate adding a photo
    const placeholder = document.getElementById('photoPlaceholder');
    placeholder.innerHTML = `
        <div class="photo-preview">
            <div class="preview-image">
                <i class="fas fa-user-circle"></i>
            </div>
            <p>Swastika's Beautiful Photo</p>
            <small>🎂 Birthday Queen! 👑</small>
        </div>
        <div class="photo-effects">
            <div class="effect-frame"></div>
        </div>
    `;
    
    // Add effects
    createSparkleEffect(placeholder);
    showNotification("📸 Beautiful photo added! Swastika looks amazing!");
    playClickSound();
});

// Add CSS for new animations
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    .photo-preview {
        animation: photoReveal 1s ease;
    }
    
    @keyframes photoReveal {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .preview-image {
        font-size: 8rem;
        color: #ff6b8b;
        margin-bottom: 20px;
        animation: photoGlow 2s infinite alternate;
    }
    
    @keyframes photoGlow {
        0% { filter: drop-shadow(0 0 10px rgba(255, 107, 139, 0.5)); }
        100% { filter: drop-shadow(0 0 20px rgba(255, 107, 139, 0.8)); }
    }
    
    .effect-frame {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 3px solid #ffde00;
        border-radius: 10px;
        animation: framePulse 2s infinite;
    }
    
    @keyframes framePulse {
        0%, 100% { border-color: #ffde00; }
        50% { border-color: #ff6b8b; }
    }
        
`;
document.head.appendChild(extraStyles);
