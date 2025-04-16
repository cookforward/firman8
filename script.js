// Constants
const NOTIFICATION_DURATION = 4000;
const NOTIFICATION_INTERVAL = 5000;
const NOTIFICATION_INITIAL_DELAY = 2000;
const SOUND_VOLUME = 0.7; // Slightly reduced volume for better experience
const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
const ONE_SECOND = 1000;

// Global variables
let soundEnabled = false;
let soundInitialized = false;
let currentIndex = 0;
const endTime = new Date().getTime() + ONE_DAY;

// DOM Elements
const sound = document.getElementById('notificationSound');
const timerElement = document.getElementById('timer');
const fomoNotification = document.getElementById('fomo-notification');
const fomoMessage = document.getElementById('fomo-message');

// FOMO Data
const fomoData = [
    "Andi, Palalawan, baru saja menghubungi kami untuk memesan sepeda listrik",
    "Lenny, Panam, Pekanbaru, baru saja memesan sepeda anak 16 inchi",
    "Budi, Kampar, sedang menanyakan stok sepeda gunung",
    "Siti, Marpoyan, baru saja membeli sepeda lipat",
    "Rudi, Duri, menanyakan ketersediaan sepeda BMX",
    "Maya, Bangkinang, baru saja memesan sepeda balap",
    "Doni, Siak, tertarik dengan promo sepeda listrik",
    "Lisa, Tambusai, baru saja mengambil sepeda anak",
    "Hendra, Rumbai, sedang memilih sepeda gunung",
    "Nina, Kubang, baru saja mendapatkan helm gratis",
    "Tono, Ujung Batu, menanyakan harga sepeda lipat",
    "Rina, Air Molek, baru saja membeli sepeda BMX",
    "Joko, Dumai, sedang dalam perjalanan ke toko",
    "Dewi, Taluk Kuantan, memesan sepeda balap",
    "Agus, Bengkalis, baru saja mendapat diskon spesial",
    "Linda, Pasir Pengaraian, mengambil sepeda hari ini",
    "Riko, Tembilahan, menanyakan garansi sepeda",
    "Sarah, Kandis, baru saja melihat koleksi sepeda",
    "Dedi, Pangkalan Kerinci, membeli sepeda gunung",
    "Mira, Perawang, tertarik dengan promo cuci gudang"
];

// Improved sound initialization
function initializeSound() {
    if (!sound || soundInitialized) return;
    
    // Check if audio file exists
    const audioSource = sound.querySelector('source');
    if (!audioSource || !audioSource.src) {
        console.error('Audio source not found or invalid');
        return;
    }
    
    sound.load();
    sound.volume = SOUND_VOLUME;
    
    // Play and immediately pause to enable sound
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            sound.pause();
            sound.currentTime = 0;
            soundEnabled = true;
            soundInitialized = true;
            console.log('Sound initialized successfully');
        }).catch(error => {
            console.error('Sound initialization failed:', error);
            // Try alternative initialization for iOS
            document.addEventListener('touchend', function iosSoundFix() {
                sound.play().then(() => {
                    sound.pause();
                    sound.currentTime = 0;
                    soundEnabled = true;
                    soundInitialized = true;
                    console.log('Sound initialized via iOS fix');
                }).catch(e => console.error('iOS sound fix failed:', e));
                document.removeEventListener('touchend', iosSoundFix);
            }, { once: true });
        });
    }
}

// Add multiple event listeners for better interaction capture
document.addEventListener('touchstart', initializeSound, { once: true });
document.addEventListener('click', initializeSound, { once: true });
document.addEventListener('scroll', initializeSound, { once: true });

// Countdown Timer
function updateTimer() {
    // ... existing code remains same
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Improved FOMO notifications with better sound handling
function showNotification() {
    if (!fomoNotification || !fomoMessage) return;
    
    fomoMessage.textContent = fomoData[currentIndex];
    fomoNotification.classList.remove('hidden');
    
    // Improved sound playing logic
    if (soundEnabled && sound) {
        try {
            // Reset sound position
            sound.currentTime = 0;
            
            // Use promise-based approach for better compatibility
            const playPromise = sound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Sound play failed:', error);
                    // Try to re-initialize sound on failure
                    if (!soundInitialized) {
                        initializeSound();
                    }
                });
            }
        } catch (e) {
            console.error('Sound play error:', e);
        }
    }
    
    setTimeout(() => {
        fomoNotification.classList.add('hidden');
    }, NOTIFICATION_DURATION);

    currentIndex = (currentIndex + 1) % fomoData.length;
}

// Start FOMO notifications
setTimeout(() => {
    showNotification();
    setInterval(showNotification, NOTIFICATION_INTERVAL);
}, NOTIFICATION_INITIAL_DELAY);

// Add a manual sound test button for debugging (can be removed in production)
window.testSound = function() {
    if (sound) {
        sound.currentTime = 0;
        sound.play().then(() => {
            console.log('Sound test successful');
        }).catch(e => {
            console.error('Sound test failed:', e);
        });
    }
};