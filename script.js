// Constants
const NOTIFICATION_DURATION = 4000;
const NOTIFICATION_INTERVAL = 5000;
const NOTIFICATION_INITIAL_DELAY = 2000;
const SOUND_VOLUME = 1.0;
const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
const ONE_SECOND = 1000;

// Global variables
let soundEnabled = false;
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

// Initialize sound for mobile
document.addEventListener('touchstart', initializeSound, { once: true });
document.addEventListener('click', initializeSound, { once: true });

function initializeSound() {
    if (!sound) return;
    
    sound.load();
    sound.volume = SOUND_VOLUME;
    
    // Play and immediately pause to enable sound
    sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
        soundEnabled = true;
        console.log('Sound initialized successfully');
    }).catch(error => {
        console.error('Sound initialization failed:', error);
    });
}

// Countdown Timer
function updateTimer() {
    if (!timerElement) return;
    
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Promo Berakhir!";
        return;
    }

    const hours = Math.floor((distance % ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor((distance % ONE_HOUR) / ONE_MINUTE);
    const seconds = Math.floor((distance % ONE_MINUTE) / ONE_SECOND);

    timerElement.textContent = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// FOMO notifications
function showNotification() {
    if (!fomoNotification || !fomoMessage) return;
    
    fomoMessage.textContent = fomoData[currentIndex];
    fomoNotification.classList.remove('hidden');
    
    // Play sound if enabled
    if (soundEnabled && sound) {
        try {
            sound.currentTime = 0;
            sound.play();
        } catch (e) {
            console.error('Sound play failed:', e);
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