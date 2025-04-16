// Countdown Timer
const endTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
const timerElement = document.getElementById('timer');

function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (distance < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Promo Berakhir!";
    }
}

const timerInterval = setInterval(updateTimer, 1000);

// FOMO notifications
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

const fomoNotification = document.getElementById('fomo-notification');
const fomoMessage = document.getElementById('fomo-message');
const notificationSound = document.getElementById('notificationSound');
let currentIndex = 0;

function showNotification() {
    fomoMessage.textContent = fomoData[currentIndex];
    fomoNotification.classList.remove('hidden');
    
    try {
        const sound = document.getElementById('notificationSound');
        sound.volume = 0.3;
        sound.currentTime = 0;
        const playPromise = sound.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Playback failed:', error);
            });
        }
    } catch (e) {
        console.log('Sound play failed:', e);
    }
    
    setTimeout(() => {
        fomoNotification.classList.add('hidden');
    }, 4000);

    currentIndex = (currentIndex + 1) % fomoData.length;
}

// Initialize sound on first click
document.addEventListener('click', function() {
    const sound = document.getElementById('notificationSound');
    sound.play().catch(function(error) {
        console.log('Play failed:', error);
    });
    sound.pause();
}, { once: true });

// Start FOMO notifications
setTimeout(() => {
    showNotification();
    setInterval(showNotification, 5000);
}, 2000);