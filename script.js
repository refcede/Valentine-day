// ==========================================
// 0. PENGATURAN AWAL (SCROLL LOCK) - BARU
// ==========================================
// Kunci scroll saat website baru dibuka agar tetap di overlay
document.body.style.overflow = 'hidden'; 


// ==========================================
// 1. GENERATOR BINTANG 3D (WARP EFFECT)
// ==========================================
function createWarpStars() {
    const container = document.querySelector('.warp-container');
    const numberOfStars = 300; // Jumlah bintang

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const x = (Math.random() * 200 - 50) + '%';
        const y = (Math.random() * 200 - 50) + '%';
        star.style.left = x;
        star.style.top = y;

        // Durasi: 3s sampai 9s (Sedikit lebih cepat dari sebelumnya agar kerasa "warp"-nya)
        const duration = Math.random() * 6 + 6 + 's'; 
        const delay = Math.random() * -7 + 's'; 

        star.style.animation = `warpMove ${duration} linear infinite ${delay}`;

        container.appendChild(star);
    }
}
createWarpStars();


// ==========================================
// 2. LOGIKA OVERLAY SPACE JOURNEY
// ==========================================
const music = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const musicBtn = document.querySelector('.music-btn');
const overlay = document.getElementById('space-overlay');
const startTriggerBox = document.getElementById('start-trigger-box');
const textSequenceBox = document.getElementById('text-sequence-box');
let isPlaying = false;

function beginJourney() {
    music.volume = 0.6;
    music.play().then(() => { isPlaying = true; }).catch(err => { console.log("Gagal autoplay: " + err); });

    startTriggerBox.style.display = 'none';
    textSequenceBox.style.display = 'block';

    const text1 = document.querySelector('.text-1');
    const text2 = document.querySelector('.text-2');
    const text3 = document.querySelector('.text-3');
    const textFinal = document.querySelector('.text-final');
    const finalBtn = document.getElementById('final-open-btn');

    setTimeout(() => { text1.classList.add('show'); }, 500); 
    setTimeout(() => { text1.classList.remove('show'); }, 3500); 

    setTimeout(() => { text2.classList.add('show'); }, 4500); 
    setTimeout(() => { text2.classList.remove('show'); }, 7500);

    setTimeout(() => { text3.classList.add('show'); }, 8500); 
    setTimeout(() => { text3.classList.remove('show'); }, 11500);

    setTimeout(() => { textFinal.classList.add('show-drop'); }, 12500);

    setTimeout(() => { 
        finalBtn.classList.remove('hidden');
        finalBtn.classList.add('visible'); 
    }, 14000); 
}

function enterWebsite() {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        musicBtn.style.display = 'flex';
        
        // --- UPDATE BARU: IZINKAN SCROLL SETELAH MASUK ---
        document.body.style.overflow = 'auto'; 
        // -------------------------------------------------

        initScrollAnimations();
    }, 1500);
}

// Toggle Musik
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        isPlaying = false;
    } else {
        music.play();
        musicIcon.innerHTML = '<i class="fa-solid fa-music"></i>';
        isPlaying = true;
    }
}


// ==========================================
// 3. ANIMASI SCROLL
// ==========================================
function initScrollAnimations() {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });
}


// ==========================================
// 4. FITUR LAIN (MODAL & HEARTS)
// ==========================================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalStory = document.getElementById("modal-story");

function openModal(element) {
    const imgSrc = element.querySelector('img').src;
    const title = element.getAttribute('data-title');
    const story = element.getAttribute('data-story');
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalStory.innerText = story;
    modal.classList.add("show");
}
function closeModal() { modal.classList.remove("show"); }
window.onclick = function(event) { if (event.target == modal) closeModal(); }

// Floating Hearts
function createHearts() {
    const container = document.getElementById('heart-container');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 10000);
}
setInterval(createHearts, 400);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});


// ==========================================
// 5. BUKA SURAT INTERAKTIF (ANIMASI HALUS)
// ==========================================
function openLetter() {
    const cover = document.getElementById('envelope-cover');
    const letter = document.getElementById('main-letter');

    // 1. Hilangkan Amplop Perlahan
    cover.classList.add('fade-out');

    // 2. Tunggu 0.5 detik, lalu munculkan surat
    setTimeout(() => {
        cover.style.display = 'none'; 
        
        letter.classList.add('show-letter-content');
        
        letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 500); 
}