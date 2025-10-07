document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi fitur utama di semua halaman
    initActiveNav();
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initSearchFunction(); // Search functionality

    // Cek halaman saat ini untuk menjalankan fungsi spesifik
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'geografis.html') initGeografisForm();
    if (currentPage === 'event.html') initEventForm();
});


// Efek Scroll pada Header
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const logoImage = document.querySelector('.logo-image');
    const logoText = document.querySelector('.logo-text'); // ambil teks Ubud

    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');

            // Ganti logo ke hitam saat scroll
            if (logoImage) {
                logoImage.src = logoImage.src.includes('page/')
                    ? '../asset/logo-ubud-hitam.png'
                    : '../asset/logo-ubud-hitam.png';
            }

            // Ganti teks Ubud ke hitam
            if (logoText) logoText.style.color = "#000";
        } else {
            header.classList.remove('scrolled');

            // Kembalikan logo ke putih saat di atas
            if (logoImage) {
                logoImage.src = logoImage.src.includes('page/')
                    ? '../asset/logo-ubud.png'
                    : 'asset/logo-ubud.png';
            }

            // Kembalikan teks Ubud ke putih (atau warna awal)
            if (logoText) logoText.style.color = "#fff";
        }
    });
}


// Mengatur Tautan Navigasi Aktif
function initActiveNav() {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        link.classList.remove('active');

        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Fungsionalitas Menu Mobile
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        menuBtn.innerHTML = navLinks.classList.contains('mobile-open') ? '&#10005;' : '&#9776;';
    });
}


// Search Function 
function initSearchFunction() {
    const searchForms = document.querySelectorAll('.search-form');
    if (!searchForms.length) return;

    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const searchInput = this.querySelector('.search-input');
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const currentPath = window.location.pathname;
            const isInPageFolder = currentPath.includes('/page/');

            const searchMap = {
                // Kategori utama
                'geografis': 'geografis.html',
                'geografi': 'geografis.html',
                'alam': '#jelajahi',
                'lembah': 'geografis.html',
                'perbukitan': 'geografis.html',
                'sungai': 'geografis.html',

                // Budaya
                'budaya': 'budaya.html',
                'culture': 'budaya.html',
                'pakaian': 'budaya.html',
                'adat': 'budaya.html',
                'tari': 'budaya.html',
                'seni': 'budaya.html',
                'bahasa': 'budaya.html',
                'makanan': 'budaya.html',

                // Wisata
                'wisata': 'wisata.html',
                'tourism': 'wisata.html',
                'monkey forest': 'wisata.html',
                'kera': 'wisata.html',
                'pasar': 'wisata.html',
                'pasar seni': 'wisata.html',
                'pura': 'wisata.html',
                'saraswati': 'wisata.html',
                'air terjun': 'wisata.html',
                'tegenungan': 'wisata.html',
                'goa gajah': 'wisata.html',
                'tirta empul': 'wisata.html',

                // Sejarah
                'sejarah': 'sejarah.html',
                'history': 'sejarah.html',
                'markandeya': 'sejarah.html',
                'pita maha': 'sejarah.html',
                'walter spies': 'sejarah.html',

                // Event
                'event': 'event.html',
                'acara': 'event.html',
                'festival': 'event.html',
                'galungan': 'event.html',
                'uwrf': 'event.html',
                'balispirit': 'event.html',

                // Umum
                'beranda': 'index.html',
                'home': 'index.html',
                'kategori': '#jelajahi'
            };

            let destination = searchMap[query];

            if (!destination) {
                for (let keyword in searchMap) {
                    if (query.includes(keyword) || keyword.includes(query)) {
                        destination = searchMap[keyword];
                        break;
                    }
                }
            }

            if (destination) {
                navigateTo(destination, isInPageFolder);
                searchInput.value = '';
            } else {
                alert(`Hasil untuk "${query}" tidak ditemukan. Menampilkan semua kategori.`);
                navigateTo('#jelajahi', isInPageFolder);
                searchInput.value = '';
            }
        });
    });
}

// Helper Navigation Function
function navigateTo(destination, isInPageFolder) {
    if (destination.startsWith('#')) {
        // Anchor navigation
        if (isInPageFolder) {
            window.location.href = '../index.html' + destination;
        } else {
            const targetElement = document.querySelector(destination);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.href = 'index.html' + destination;
            }
        }
    } else {
        // Page navigation
        window.location.href = isInPageFolder ? destination : 'page/' + destination;
    }
}


// Fungsionalitas Form Event
function initEventForm() {
    const form = document.getElementById('event-form');
    if (!form) return;

    const judulInput = document.getElementById('event-judul');
    const tanggalInput = document.getElementById('event-tanggal');
    const deskripsiInput = document.getElementById('event-deskripsi');
    const eventList = document.getElementById('event-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const judul = judulInput.value.trim();
        const tanggal = tanggalInput.value;
        const deskripsi = deskripsiInput.value.trim();

        if (judul && tanggal && deskripsi) {
            const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const newItem = document.createElement('div');
            newItem.className = 'dynamic-item';
            newItem.innerHTML = `
                <h3>${judul}</h3>
                <p>${deskripsi}</p>
                <small>Tanggal: ${formattedDate}</small><br>
                <button class="hapus-btn">Hapus</button>
            `;

            // Tambah event baru di bawah judul daftar
            const h2 = eventList.querySelector('h2');
            if (h2 && h2.nextElementSibling) {
                h2.parentNode.insertBefore(newItem, h2.nextElementSibling);
            } else {
                eventList.appendChild(newItem);
            }

            // Kosongkan form
            form.reset();

            // Scroll ke item baru
            setTimeout(() => {
                newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });

    // Hapus event kalau tombol hapus diklik
    eventList.addEventListener('click', function(e) {
        if (e.target.classList.contains('hapus-btn')) {
            e.target.parentElement.remove();
        }
    });
}



// Animasi Scroll & Efek Klik Card
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".upacara-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
});


// Animasi saat Scroll Umum
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));
}
