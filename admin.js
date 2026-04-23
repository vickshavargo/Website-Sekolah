// ==================== ADMIN AUTHENTICATION ====================
const ADMIN_PASSWORD = 'smpn4kelua2026'; // Ubah password ini!

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === ADMIN_PASSWORD) {
        // Login berhasil
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminDashboard();
        loadAdminData();
    } else {
        // Login gagal
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.classList.remove('hidden');
        setTimeout(() => {
            errorMsg.classList.add('hidden');
        }, 3000);
    }
}

function logout() {
    if (confirm('Yakin ingin logout?')) {
        localStorage.setItem('adminLoggedIn', 'false');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
        document.getElementById('passwordInput').value = '';
        document.getElementById('errorMessage').classList.add('hidden');
    }
}

function showAdminDashboard() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
}

function goBackToPublic() {
    window.location.href = 'index.html';
}

// Check jika sudah login
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showAdminDashboard();
        loadAdminData();
    }

    // Setup file input event listeners
    setupFileInputListeners();
});

// Setup file input listeners
function setupFileInputListeners() {
    console.log('Setting up file input listeners');

    // Wait for DOM to be fully loaded
    setTimeout(() => {
        const schoolInput = document.getElementById('profileSchoolPhotoInput');
        const staffInput = document.getElementById('profileStaffPhotoInput');

        if (schoolInput) {
            schoolInput.addEventListener('change', function(event) {
                previewAdminPhoto(event, 'profileSchoolPreview');
            });
        }

        if (staffInput) {
            staffInput.addEventListener('change', function(event) {
                previewAdminPhoto(event, 'profileStaffPreview');
            });
        }
    }, 1000); // Wait 1 second for DOM to be ready
}

// ==================== PHOTO PREVIEW ====================

function previewAdminPhoto(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewDiv = document.getElementById(previewId);
            if (previewDiv) {
                previewDiv.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-lg">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

// ==================== DATA MANAGEMENT ====================

function loadAdminData() {
    // Load Berita descriptions and photos
    for (let i = 1; i <= 5; i++) {
        const textarea = document.getElementById(`beritaDesc${i}`);
        const savedDesc = localStorage.getItem(`beritaDesc${i}`);
        if (textarea && savedDesc) {
            textarea.value = savedDesc;
        }
        
        const savedPhoto = localStorage.getItem(`beritaPhoto${i}`);
        if (savedPhoto) {
            const previewDiv = document.getElementById(`beritaPreview${i}`);
            previewDiv.innerHTML = `<img src="${savedPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }
    
    // Load Prestasi descriptions and photos
    for (let i = 1; i <= 5; i++) {
        const textarea = document.getElementById(`prestasiDesc${i}`);
        const savedDesc = localStorage.getItem(`prestasiDesc${i}`);
        if (textarea && savedDesc) {
            textarea.value = savedDesc;
        }
        
        const savedPhoto = localStorage.getItem(`prestasiPhoto${i}`);
        if (savedPhoto) {
            const previewDiv = document.getElementById(`prestasiPreview${i}`);
            previewDiv.innerHTML = `<img src="${savedPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }

    // Load Profil Sekolah photos
    const profileSchoolPhoto = localStorage.getItem('profileSchoolPhoto');
    if (profileSchoolPhoto) {
        const previewDiv = document.getElementById('profileSchoolPreview');
        if (previewDiv) {
            previewDiv.innerHTML = `<img src="${profileSchoolPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }

    const profileStaffPhoto = localStorage.getItem('profileStaffPhoto');
    if (profileStaffPhoto) {
        const previewDiv = document.getElementById('profileStaffPreview');
        if (previewDiv) {
            previewDiv.innerHTML = `<img src="${profileStaffPhoto}" class="w-full h-full object-cover rounded-lg">`;
        }
    }
}

function saveBerita() {
    for (let i = 1; i <= 5; i++) {
        // Save description
        const descValue = document.getElementById(`beritaDesc${i}`).value;
        localStorage.setItem(`beritaDesc${i}`, descValue);
        
        // Save photo if exists
        const photoInput = document.getElementById(`beritaPhoto${i}`);
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem(`beritaPhoto${i}`, e.target.result);
            };
            reader.readAsDataURL(photoInput.files[0]);
        }
    }
    showStatus('Berita berhasil disimpan!');
}

function savePrestasi() {
    for (let i = 1; i <= 5; i++) {
        // Save description
        const descValue = document.getElementById(`prestasiDesc${i}`).value;
        localStorage.setItem(`prestasiDesc${i}`, descValue);
        
        // Save photo if exists
        const photoInput = document.getElementById(`prestasiPhoto${i}`);
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem(`prestasiPhoto${i}`, e.target.result);
            };
            reader.readAsDataURL(photoInput.files[0]);
        }
    }
    showStatus('Prestasi berhasil disimpan!');
}

function saveProfilePhotos() {
    const photoFields = [
        { inputId: 'profileSchoolPhotoInput', storageKey: 'profileSchoolPhoto' },
        { inputId: 'profileStaffPhotoInput', storageKey: 'profileStaffPhoto' }
    ];

    photoFields.forEach(field => {
        const fileInput = document.getElementById(field.inputId);
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem(field.storageKey, e.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    showStatus('Foto profil berhasil disimpan!');
}

function showStatus(message) {
    const status = document.getElementById('statusMessage');
    status.textContent = message + ' ✓';
    status.classList.remove('hidden');
    setTimeout(() => {
        status.classList.add('hidden');
    }, 3000);
}

// ==================== EXPORT & IMPORT ====================

function exportData() {
    const data = {};
    
    // Collect all data from localStorage
    for (let i = 1; i <= 5; i++) {
        data[`beritaDesc${i}`] = localStorage.getItem(`beritaDesc${i}`) || '';
        data[`prestasiDesc${i}`] = localStorage.getItem(`prestasiDesc${i}`) || '';
        data[`beritaPhoto${i}`] = localStorage.getItem(`beritaPhoto${i}`) || '';
        data[`prestasiPhoto${i}`] = localStorage.getItem(`prestasiPhoto${i}`) || '';
    }
    data.profileSchoolPhoto = localStorage.getItem('profileSchoolPhoto') || '';
    data.profileStaffPhoto = localStorage.getItem('profileStaffPhoto') || '';
    
    // Create JSON and download
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-smpn4kelua-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showStatus('Data berhasil di-export! File backup tersimpan.');
}

function importData() {
    document.getElementById('fileInput').click();
}

function importDataFromFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // Restore data to localStorage
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            });
            
            loadAdminData();
            showStatus('Data berhasil di-import! Semua data telah di-restore.');
        } catch (error) {
            alert('Error: File backup tidak valid!');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    fileInput.value = '';
}

function clearAllData() {
    if (confirm('⚠️ PERINGATAN: Ini akan menghapus SEMUA data! Yakin ingin lanjut?')) {
        if (confirm('Tekan OK lagi untuk konfirmasi penghapusan PERMANENT.')) {
            // Clear all data
            for (let i = 1; i <= 5; i++) {
                localStorage.removeItem(`beritaDesc${i}`);
                localStorage.removeItem(`prestasiDesc${i}`);
                localStorage.removeItem(`beritaPhoto${i}`);
                localStorage.removeItem(`prestasiPhoto${i}`);
            }
            localStorage.removeItem('profileSchoolPhoto');
            localStorage.removeItem('profileStaffPhoto');
            localStorage.removeItem('adminLoggedIn');
            loadAdminData();
            showStatus('Semua data berhasil dihapus!');
        }
    }
}

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keypress', (e) => {
    // Alt + S untuk save
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        saveBerita();
        savePrestasi();
    }
    
    // Alt + L untuk logout
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        logout();
    }
});
