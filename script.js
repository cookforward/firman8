/**
 * Sound and notification configuration
 */
let soundEnabled = false;
const NOTIFICATION_DURATION = 4000;
const NOTIFICATION_INTERVAL = 5000;
const NOTIFICATION_INITIAL_DELAY = 2000;
const SOUND_VOLUME = 0.5;

// Initialize sound
const sound = document.getElementById('notificationSound');
if (sound) {
    // Force load the audio
    sound.load();
    sound.volume = SOUND_VOLUME;
    sound.muted = false;
}

// Enable sound on first user interaction (required by browsers)
const enableSound = async () => {
    try {
        if (!sound) return;
        
        // Unmute and play a silent part
        sound.muted = false;
        sound.volume = SOUND_VOLUME;
        await sound.play();
        sound.pause();
        sound.currentTime = 0;
        soundEnabled = true;
    } catch (error) {
        console.error('Sound initialization failed:', error);
    }
};

// Initialize sound for both mobile and desktop
['touchstart', 'click'].forEach(event => {
    document.addEventListener(event, enableSound, { once: true });
});
/**
 * Countdown Timer Configuration
 */
const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
const ONE_SECOND = 1000;

const endTime = new Date().getTime() + ONE_DAY; // 24 hours from now
const timerElement = document.getElementById('timer');

/**
 * Updates the countdown timer display
 */
function updateTimer() {
    if (!timerElement) {
        console.error('Timer element not found');
        clearInterval(timerInterval);
        return;
    }

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

/**
 * FOMO Notification Data and Configuration
 */
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

const elements = {
    notification: document.getElementById('fomo-notification'),
    message: document.getElementById('fomo-message')
};

let currentIndex = 0;

/**
 * Display FOMO notification with sound
 */
function showNotification() {
    if (!elements.notification || !elements.message) {
        console.error('FOMO notification elements not found');
        return;
    }

    elements.message.textContent = fomoData[currentIndex];
    elements.notification.classList.remove('hidden');
    
    // Play notification sound if enabled
    if (soundEnabled && sound) {
        try {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error('Sound playback failed:', error);
            });
        } catch (error) {
            console.error('Sound play error:', error);
        }
    }
    
    setTimeout(() => {
        elements.notification.classList.add('hidden');
    }, NOTIFICATION_DURATION);

    currentIndex = (currentIndex + 1) % fomoData.length;
}

// Start FOMO notifications with initial delay
setTimeout(() => {
    showNotification();
    setInterval(showNotification, NOTIFICATION_INTERVAL);
}, NOTIFICATION_INITIAL_DELAY);