/**
 * EkşiSözlük Debe Tarih Seçici - content.js
 * Dosya yolu: /home/main/public_html/ai.zefre.net/eksidebe/content.js
 * 
 * Orijinal geliştiren: Muhsin İŞSEVER
 * Email: muhsin.issever@gmail.com
 * Web sitesi: https://ai.zefre.net/
 * r10 profili: https://www.r10.net/profil/193-gneral.html
 * Github: https://www.github.com/gneral
 */

(() => {
  'use strict';

  // Sayfanın yüklendiğinden emin olmak için
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDatePicker);
  } else {
    initDatePicker();
  }

  // Sayfa değişikliklerini izleme (SPA uygulamaları için)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && document.querySelector('#partial-index')) {
        initDatePicker();
        observer.disconnect();
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function initDatePicker() {
    // EkşiSözlük'ün yapısına göre main container'ı bul
    const mainContainer = document.querySelector('#main');
    
    if (!mainContainer) {
      console.error('Ana konteyner bulunamadı (#main elementi yok)');
      return;
    }
    
    // Debe bölümünü bul
    const partialIndexEl = document.querySelector('#partial-index');
    
    if (!partialIndexEl) {
      console.error('Debe bölümü bulunamadı (partial-index elementi yok)');
      return;
    }
    
    // Mevcut tarih seçim bölgesini bulalım
    // Önce h2 başlığını bulalım
    const debeHeaderEl = partialIndexEl.querySelector('h2');
    if (!debeHeaderEl) {
      console.error('Debe başlığı bulunamadı (h2 elementi yok)');
      return;
    }
    
    // Başlık üstüne tarih seçici ekleyelim
    const datePickerContainer = document.createElement('div');
    datePickerContainer.className = 'date-picker-container';
    datePickerContainer.id = 'debe-date-picker-container';
    
    // Eğer zaten bir tarih seçici eklenmiş ise, tekrar eklemeyelim
    if (document.getElementById('debe-date-picker-container')) {
      console.log('Tarih seçici zaten mevcut');
      return;
    }
    
    // Bugünün tarihini al
    const today = new Date();
    
    // Tarih seçici etiketi
    const datePickerLabel = document.createElement('label');
    datePickerLabel.htmlFor = 'debe-date-picker';
    datePickerLabel.textContent = 'Tarih Seç: ';
    datePickerContainer.appendChild(datePickerLabel);
    
    // Tarih giriş alanı
    const datePickerInput = document.createElement('input');
    datePickerInput.type = 'date';
    datePickerInput.id = 'debe-date-picker';
    datePickerInput.className = 'debe-date-picker';
    
    // Mevcut tarihi al (URL'den veya bugün)
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    
    let currentDate = today;
    
    if (dateParam) {
      // URL'de tarih parametresi varsa, onu kullan
      const [day, month, year] = dateParam.split('/');
      if (day && month && year) {
        currentDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        
        // Geçersiz tarih kontrolü
        if (isNaN(currentDate.getTime())) {
          currentDate = today;
        }
      }
    }
    
    // HTML date input formatına çevir (YYYY-MM-DD)
    datePickerInput.value = formatDate(currentDate);
    
    // Bugünün tarihini max değer olarak ayarla
    datePickerInput.max = formatDate(today);
    
    // Eski debe tarihi, şu anki tarihten 1 yıl öncesi olsun
    const oldestDate = new Date();
    oldestDate.setFullYear(oldestDate.getFullYear() - 1);
    datePickerInput.min = formatDate(oldestDate);
    
    datePickerContainer.appendChild(datePickerInput);
    
    // Getir butonu
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Getir';
    fetchButton.className = 'debe-fetch-button';
    fetchButton.addEventListener('click', () => fetchDebeByDate(datePickerInput.value));
    datePickerContainer.appendChild(fetchButton);
    
    // Durum bilgisi elementi
    const statusElement = document.createElement('span');
    statusElement.id = 'debe-status';
    statusElement.className = 'debe-status';
    datePickerContainer.appendChild(statusElement);
    
    // Tarih seçiciyi H2 başlığının üzerine ekleyelim
    debeHeaderEl.parentNode.insertBefore(datePickerContainer, debeHeaderEl);
    
    // Tarih input'una değişiklik dinleyicisi ekle
    datePickerInput.addEventListener('change', () => {
      statusElement.textContent = '';
    });
    
    // Sayfa yüklendikten hemen sonra URL'deki tarih parametresini kontrol et
    setTimeout(checkUrlForDate, 500);
  }

  // Tarihi YYYY-MM-DD formatına çevirir
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Tarihi DD/MM/YYYY formatına çevirir (eksisozluk için)
  function formatDateForEksi(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  // Belirli bir tarihe ait debe içeriğini getir
  function fetchDebeByDate(dateStr) {
    const statusElement = document.getElementById('debe-status');
    if (!statusElement) {
      console.error('Durum elementi bulunamadı');
      return;
    }
    
    statusElement.textContent = 'Yükleniyor...';
    
    const formattedDate = formatDateForEksi(dateStr);
    
    // EkşiSözlük site yapısı değişiklikleri için query parametresi değişimi
    // URL'de date parametresi kullanılıyor, day değil
    const url = `https://eksisozluk.com/debe?date=${formattedDate}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Debe içeriğini güncelle
        const debeContentEl = document.querySelector('#content-body');
        const newDebeContentEl = doc.querySelector('#content-body');
        
        if (debeContentEl && newDebeContentEl) {
          debeContentEl.innerHTML = newDebeContentEl.innerHTML;
          
          // Başlığı güncelle (h2 elementini bul)
          const debeHeaderEl = document.querySelector('#partial-index h2');
          if (debeHeaderEl) {
            // Orijinal başlığı sakla
            if (!debeHeaderEl.hasAttribute('data-original-text')) {
              debeHeaderEl.setAttribute('data-original-text', debeHeaderEl.textContent);
            }
            
            // Tarihi göster
            debeHeaderEl.textContent = `dünün en beğenilen entry'leri - ${formattedDate}`;
          }
          
          statusElement.textContent = `${formattedDate} tarihli debe yüklendi.`;
          
          // URL'yi güncelle (geçmişte gezinmeyi kolaylaştırmak için)
          // date parametresi kullanıyoruz, day değil
          const newUrl = `${window.location.pathname}?date=${formattedDate}`;
          window.history.pushState({}, '', newUrl);
        } else {
          statusElement.textContent = 'İçerik yüklenemedi, sayfayı yenileyin.';
        }
      })
      .catch(error => {
        console.error('Debe verileri getirilirken hata oluştu:', error);
        statusElement.textContent = 'Hata: Veriler getirilemedi!';
      });
  }
  
  // URL'den tarih parametresini kontrol et ve uygula
  function checkUrlForDate() {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date'); // date parametresi kullanıyoruz, day değil
    
    if (dateParam) {
      // DD/MM/YYYY formatından YYYY-MM-DD formatına çevir
      const [day, month, year] = dateParam.split('/');
      if (day && month && year) {
        const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        // Tarih seçici varsa değerini güncelle
        const datePickerInput = document.getElementById('debe-date-picker');
        if (datePickerInput) {
          datePickerInput.value = dateStr;
          fetchDebeByDate(dateStr);
        }
      }
    }
  }
})();