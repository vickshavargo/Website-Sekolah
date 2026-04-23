// Smooth scrolling untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks && hamburger) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// CTA Button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#tentang').scrollIntoView({
        behavior: 'smooth'
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    loadFromLocalStorage();
    setupAutoSave();
});

// ==================== LOCAL STORAGE FUNCTIONS ====================

// Simpan data ke Local Storage
function saveToLocalStorage() {
    const data = {};
    
    // Simpan semua textarea deskripsi
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        data[textarea.id] = textarea.value;
    });
    
    localStorage.setItem('prestasiWebsiteData', JSON.stringify(data));
    console.log('Data tersimpan di Local Storage ✓');
}

// Load data dari Local Storage
function loadFromLocalStorage() {
    // Load berita dari admin
    for (let i = 1; i <= 5; i++) {
        // Tampilkan foto berita
        const beritaPhoto = localStorage.getItem(`beritaPhoto${i}`);
        if (beritaPhoto) {
            const slot = document.getElementById(`beritaSlot${i}`);
            if (slot) {
                slot.innerHTML = `<img src="${beritaPhoto}" class="w-full h-full object-cover rounded-lg">`;
            }
        }
        
        // Tampilkan deskripsi berita (read-only)
        const beritaDesc = localStorage.getItem(`beritaDesc${i}`);
        if (beritaDesc) {
            const descElement = document.getElementById(`beritaDesc${i}`);
            if (descElement) {
                descElement.textContent = beritaDesc;
            }
        }
    }
    
    // Load prestasi dari admin
    for (let i = 1; i <= 5; i++) {
        // Tampilkan foto prestasi
        const prestasiPhoto = localStorage.getItem(`prestasiPhoto${i}`);
        if (prestasiPhoto) {
            const slot = document.getElementById(`prestasiSlot${i}`);
            if (slot) {
                slot.innerHTML = `<img src="${prestasiPhoto}" class="w-full h-full object-cover rounded-lg">`;
            }
        }
        
        // Tampilkan deskripsi prestasi (read-only)
        const prestasiDesc = localStorage.getItem(`prestasiDesc${i}`);
        if (prestasiDesc) {
            const descElement = document.getElementById(`prestasiDesc${i}`);
            if (descElement) {
                descElement.textContent = prestasiDesc;
            }
        }
    }

    const profileSchoolPhoto = localStorage.getItem('profileSchoolPhoto');
    if (profileSchoolPhoto) {
        const slot = document.getElementById('profileSchoolSlot');
        if (slot) {
            slot.innerHTML = `<img src="${profileSchoolPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }

    const profileStaffPhoto = localStorage.getItem('profileStaffPhoto');
    if (profileStaffPhoto) {
        const slot = document.getElementById('profileStaffSlot');
        if (slot) {
            slot.innerHTML = `<img src="${profileStaffPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }
}

// Setup auto-save untuk setiap textarea
function setupAutoSave() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            saveToLocalStorage();
        });
        textarea.addEventListener('change', () => {
            saveToLocalStorage();
        });
    });
}

// Clear Local Storage (opsional - untuk reset data)
function clearLocalStorage() {
    if (confirm('Yakin ingin menghapus semua data yang tersimpan?')) {
        localStorage.removeItem('prestasiWebsiteData');
        location.reload();
        console.log('Local Storage dihapus');
    }
}

// ==================== PROFIL SECTION FUNCTIONS ====================

// Preview image upload
function previewImage(event, previewElementId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewElement = document.getElementById(previewElementId);
            previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview" class="w-full h-full object-cover">`;
        };
        reader.readAsDataURL(file);
    }
}

function previewImages(event, previewElementId) {
    const files = Array.from(event.target.files).slice(0, 5);
    const previewElement = document.getElementById(previewElementId);
    const slots = previewElement.querySelectorAll('.preview-slot');

    if (slots.length === 0) {
        previewElement.innerHTML = '';
    }

    for (let i = 0; i < 5; i++) {
        const slot = slots[i];
        if (!slot) continue;
        slot.innerHTML = '';

        if (files[i] && files[i].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                slot.innerHTML = `<img src="${e.target.result}" alt="Preview" class="w-full h-full object-cover rounded-lg">`;
            };
            reader.readAsDataURL(files[i]);
        } else {
            slot.innerHTML = `<span class="text-gray-500">Foto ${i + 1}</span>`;
        }
    }

    if (event.target.files.length > 5) {
        alert('Hanya 5 foto pertama yang akan ditampilkan.');
    }
}
