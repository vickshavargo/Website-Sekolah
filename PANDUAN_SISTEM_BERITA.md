# 📰 Panduan Sistem Berita SMPN 4 KELUA

## 🎯 Cara Kerja Sistem

Sistem berita Anda menggunakan **LocalStorage** untuk menyimpan data berita tanpa server. Hanya admin yang bisa menambah/edit berita.

```
┌─────────────────────┐
│   ADMIN PANEL       │
│  (admin.html)       │
│  - Input berita     │
│  - Upload foto      │
│  - Simpan ke cache  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   LOCALSTORAGE      │
│  (Browser Cache)    │
│  - Berita 1-5       │
│  - Foto 1-5         │
│  - Prestasi 1-5     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   HALAMAN PUBLIK    │
│  (index.html)       │
│  - Tampil berita    │
│  - Tampil prestasi  │
│  - Read-only        │
└─────────────────────┘
```

---

## 🔐 Login Admin

**URL Admin:** [admin.html](admin.html)

**Password Default:** `smpn4kelua2026`

⚠️ **PENTING:** Ubah password di `admin.js` pada line 1:

```javascript
const ADMIN_PASSWORD = 'password_baru_anda';
```

---

## 📝 Cara Menambah Berita

### Dari Halaman Publik:
1. Klik tombol **🔐 Admin** di navbar
2. Masukkan password admin
3. Dashboard admin akan terbuka

### Di Dashboard Admin:
1. Isi deskripsi berita di kolom teks
2. Upload foto untuk berita (max 5 berita)
3. Preview foto akan muncul otomatis
4. Klik **💾 Simpan Berita** untuk menyimpan

---

## 📊 Data yang Tersimpan

Semua data disimpan di **LocalStorage** dengan key:

### Berita:
- `beritaDesc1` hingga `beritaDesc5` - Deskripsi berita
- `beritaPhoto1` hingga `beritaPhoto5` - Foto berita (format base64)

### Prestasi:
- `prestasiDesc1` hingga `prestasiDesc5` - Deskripsi prestasi  
- `prestasiPhoto1` hingga `prestasiPhoto5` - Foto prestasi (format base64)

### Admin:
- `adminLoggedIn` - Status login (true/false)

---

## 🔄 Fitur di Admin Dashboard

### ✅ Yang Bisa Dilakukan Admin:

1. **Edit Berita & Prestasi**
   - Ubah deskripsi
   - Upload/ganti foto
   - Simpan perubahan

2. **Export Data**
   - Backup semua data ke file JSON
   - Simpan untuk keamanan

3. **Import Data**
   - Restore dari file backup JSON
   - Gunakan jika ada masalah

4. **Logout**
   - Keluar dari dashboard admin

---

## 🌐 Halaman Publik (index.html)

Pengunjung website hanya bisa:
- ✅ Melihat berita yang sudah ditambahkan admin
- ✅ Melihat prestasi yang sudah ditambahkan admin
- ✅ Tidak bisa upload atau edit

---

## ⚙️ Struktur File

```
📁 MEMBUAT WEBSITE SEKOLAH
├── 📄 index.html          → Halaman publik
├── 📄 admin.html          → Halaman admin (butuh password)
├── 📄 script.js           → Script untuk halaman publik
├── 📄 admin.js            → Script untuk admin panel
├── 📄 style.css           → Styling
├── 📄 logo.png            → Logo sekolah (optional)
├── 📄 background.jpg      → Background (optional)
└── 📄 PANDUAN_SISTEM_BERITA.md → Panduan ini
```

---

## 🛡️ Keamanan

### ✅ Yang Sudah Aman:
- Password-protected admin panel
- Data tidak bisa diubah pengunjung
- Upload file otomatis compressed (base64)

### ⚠️ Catatan:
- LocalStorage terbatas ~5-10MB per domain
- Data hilang jika browser cache dihapus
- Untuk keamanan maksimal, backup data secara berkala

---

## 🔧 Troubleshooting

### ❓ Foto tidak muncul di halaman publik:
1. Pastikan sudah login admin dan upload foto
2. Refresh browser (F5)
3. Buka DevTools (F12) → Application → LocalStorage → cek data

### ❓ Lupa password admin:
1. Buka `admin.js` di code editor
2. Ubah line 1: `const ADMIN_PASSWORD = 'password_baru';`
3. Refresh halaman admin

### ❓ Ingin reset semua data:
```javascript
// Buka Developer Tools (F12) → Console
localStorage.clear();
location.reload();
```

---

## 📱 Tips & Trik

### Ukuran Foto:
- Gunakan foto berukuran 500x500px untuk optimal
- Maksimal 2MB per foto
- Format: JPG, PNG, WebP

### Backup Regular:
- Setiap minggu, export data dari admin
- Simpan file JSON di tempat aman
- Gunakan untuk recovery jika diperlukan

### Custom Password:
- Ganti password admin secara berkala
- Jangan gunakan password yang mudah ditebak
- Contoh baik: `smpn4kelua2024@admin`

---

## 📞 Dukungan

Jika ada masalah:
1. Cek console browser (F12)
2. Pastikan JavaScript enabled
3. Hapus cache browser dan coba lagi
4. Hubungi developer untuk bantuan lebih lanjut

---

**Terakhir diupdate:** April 2026
