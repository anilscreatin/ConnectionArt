# 🎨 İnteraktif Parçacık Sanatı

Modern ve etkileyici bir web tabanlı parçacık sanat uygulaması. 5 farklı parametre ile tamamen özelleştirilebilir interaktif parçacık sistemi.

## ✨ Özellikler

### 🎛️ 8 Ana Parametre
1. **Parçacık Sayısı** (50-500): Ekrandaki parçacık miktarını kontrol eder
2. **Hız** (0.1-3.0): Parçacıkların hareket hızını ayarlar
3. **Boyut** (1-10): Parçacıkların görsel boyutunu belirler
4. **Boyut Rastgeleliği** (0.0-1.0): Parçacıkların boyutlarının ne kadar rastgele olacağını kontrol eder
5. **Bağlantı Mesafesi** (50-200): Parçacıklar arası bağlantı çizgilerinin mesafesini kontrol eder
6. **Mouse Bağlantı Mesafesi** (100-400): Mouse parçacığı ile diğer parçacıklar arası bağlantı mesafesini kontrol eder
7. **Mouse Çekim Gücü** (-2.0-2.0): Mouse'un parçacıkları çekme veya itme gücünü kontrol eder
8. **Renk Şeması**: 5 farklı uzay ve galaksi teması seçeneği
   - 🌌 Galaksi (Mor tonları)
   - 🌊 Nebula (Mavi tonları)
   - ⭐ Kozmik (Turuncu tonları)
   - ✨ Yıldız Tozu (Pembe tonları)
   - 🌟 Aurora (Yeşil tonları)

### 🎮 İnteraktif Özellikler
- **Fare Etkileşimi**: Fare imlecini takip eden parçacıklar
- **Gerçek Zamanlı Kontrol**: Parametreler anında uygulanır
- **Duraklat/Devam Et**: Animasyonu kontrol edebilme
- **Sıfırlama**: Parçacıkları başlangıç pozisyonlarına döndürme
- **Tam Ekran Modu**: Tam ekran deneyimi

### 🎨 Görsel Efektler
- **Gradient Parçacıklar**: Her parçacık için özel gradient efektleri
- **Glow Efekti**: Parçacıklarda ışıma efekti
- **Bağlantı Çizgileri**: Yakın parçacıklar arası dinamik bağlantılar
- **Glassmorphism UI**: Modern, şeffaf kontrol paneli
- **Responsive Tasarım**: Tüm cihazlarda uyumlu

## 🚀 Kurulum ve Çalıştırma

1. Projeyi bilgisayarınıza indirin
2. `index.html` dosyasını bir web tarayıcısında açın
3. İnteraktif parçacık sanatının keyfini çıkarın!

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- JavaScript desteği
- Canvas API desteği

## 🎯 Kullanım

### Temel Kontroller
- **Fare**: Parçacıkları etkilemek için fare imlecini hareket ettirin
- **Kaydırıcılar**: Parametreleri ayarlamak için kaydırıcıları kullanın
- **Renk Şeması**: Dropdown menüden renk teması seçin

### Butonlar
- **Sıfırla**: Parçacıkları rastgele pozisyonlara yerleştirir
- **Duraklat/Devam Et**: Animasyonu duraklatır veya devam ettirir
- **Tam Ekran**: Tam ekran moduna geçer

## 🛠️ Teknik Detaylar

### Teknolojiler
- **HTML5 Canvas**: Parçacık animasyonları için
- **Vanilla JavaScript**: OOP yaklaşımı ile yazılmış
- **CSS3**: Modern görsel efektler ve responsive tasarım
- **RequestAnimationFrame**: Smooth animasyonlar için

### Performans
- Optimize edilmiş parçacık sistemi
- Efficient collision detection
- Smooth 60fps animasyonlar
- Memory leak koruması

## 🎨 Özelleştirme

### Yeni Renk Şeması Ekleme
```javascript
this.colorSchemes.newTheme = ['#color1', '#color2', '#color3'];
```

### Parçacık Davranışını Değiştirme
`ParticleSystem` sınıfındaki `updateParticles()` metodunu düzenleyerek parçacık davranışlarını özelleştirebilirsiniz.

## 📱 Responsive Tasarım

Uygulama tüm cihaz boyutlarında optimize edilmiştir:
- **Desktop**: Tam genişlik kontrol paneli
- **Tablet**: Uyarlanabilir layout
- **Mobile**: Dikey düzen ve dokunmatik optimizasyon

## 🔧 Geliştirme

### Proje Yapısı
```
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript kodu
└── README.md           # Bu dosya
```

### Katkıda Bulunma
1. Projeyi fork edin
2. Yeni özellik dalı oluşturun
3. Değişikliklerinizi commit edin
4. Pull request gönderin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Keyifli kullanımlar! 🎨✨** 