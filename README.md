# EkşiSözlük Debe Tarih Seçici

Bu tarayıcı eklentisi, EkşiSözlük'ün debe (dünün en beğenilen entry'leri) sayfasına tarih seçme özelliği ekler. Kullanıcılar, herhangi bir tarihe ait debe içeriğini kolayca görüntüleyebilirler.

## Özellikler

- EkşiSözlük debe sayfasına entegre tarih seçici
- Geçmiş tarihlerdeki debe içeriklerini görüntüleme
- Kullanıcı dostu arayüz
- Responsive tasarım (mobil uyumlu)
- URL üzerinden tarih paylaşımı

## Kurulum

### Chrome/Edge/Opera (Manuel Kurulum)

1. Bu repository'yi bilgisayarınıza indirin veya klonlayın
2. Tarayıcınızda uzantılar sayfasını açın (chrome://extensions, edge://extensions veya opera://extensions)
3. Geliştirici modunu etkinleştirin
4. "Paketlenmemiş öğe yükle" butonuna tıklayın
5. İndirdiğiniz klasörü seçin
6. Eklenti kurulacak ve aktif hale gelecektir

### Firefox (Manuel Kurulum)

1. Bu repository'yi bilgisayarınıza indirin veya klonlayın
2. Firefox tarayıcınızda `about:debugging` sayfasını açın
3. "Bu Firefox" sekmesini seçin
4. "Geçici Eklenti Yükle" butonuna tıklayın
5. İndirdiğiniz klasördeki `manifest.json` dosyasını seçin
6. Eklenti geçici olarak kurulacak ve aktif hale gelecektir

## Kullanım

1. EkşiSözlük'te debe sayfasını açın (https://eksisozluk.com/debe)
2. Sayfa başlığının altında tarih seçici görünecektir
3. İstediğiniz tarihi seçin
4. "Getir" butonuna tıklayın
5. Seçilen tarihe ait debe içeriği yüklenecektir

## Teknik Detaylar

- Tarayıcı eklentisi olarak geliştirilmiştir (Manifest V3)
- İleri düzey DOM manipülasyonu kullanır
- EkşiSözlük'ün mevcut CSS stillerine uyumlu olarak tasarlanmıştır

## Dosya Yapısı

```
├── manifest.json       # Eklenti manifesti
├── content.js          # Ana işlevselliği sağlayan script
├── styles.css          # Eklenti stilleri
├── icons/              # İkon dosyaları
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md           # Bu dosya
```

## Geliştirme

### Gereksinimler

- Modern bir web tarayıcı (Chrome, Firefox, Edge, Opera)
- Temel JavaScript, HTML ve CSS bilgisi

### Test

Eklentiyi test etmek için:

1. Kod değişikliklerinizi yapın
2. Tarayıcı uzantılar sayfasından eklentiyi yeniden yükleyin
3. EkşiSözlük debe sayfasını açın ve değişiklikleri test edin

## Lisans

Bu proje açık kaynak olarak sunulmuştur.

## Geliştiren

Muhsin İŞSEVER
Email: muhsin.issever@gmail.com
Web sitesi: https://ai.zefre.net/
r10 profili: https://www.r10.net/profil/193-gneral.html
Github: https://www.github.com/gneral

## Kurulum Betiği (Windows)

Eklentiyi Windows'ta hızlıca kurmak için `kurulum.bat` dosyasını çalıştırabilirsiniz.