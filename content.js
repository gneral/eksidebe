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
  
    function initDatePicker() {
      // EkşiSözlük'ün yapısına göre partial-index elementini bul
      const partialIndexEl = document.querySelector('#partial-index');
      
      if (!partialIndexEl) {
        console.error('Debe bölümü bulunamadı (partial-index elementi yok)');
        return;
      }
      
      // Mevcut tarih giriş alanını bul
      const existingDateInput = document.querySelector('#debe-subscription-popup');
      
      if (!existingDateInput) {
        console.error('Mevcut tarih giriş alanı bulunamadı');
        return;
      }
      
      // Mevcut input elementinin ebeveyn <p> etiketini al
      const parentParagraph = existingDateInput.parentElement;
      
      if (!parentParagraph) {
        console.error('Tarih giriş alanının ebeveyn elementi bulunamadı');
        return;
      }
      
      // Mevcut input değerini al ve formatla
      const currentDateValue = existingDateInput.value; // Örn: "25/3/2025"
      const [day, month, year] = currentDateValue.split('/');
      const currentDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      
      // Mevcut datepicker elementini gizle (tamamen kaldırmak yerine)
      existingDateInput.style.display = 'none';
      
      // Tarih seçici container'ı oluştur (mevcut <p> içerisine yerleştireceğiz)
      const datePickerContainer = document.createElement('div');
      datePickerContainer.className = 'date-picker-container';
      
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
      
      // Mevcut tarihi HTML date input formatına çevir (YYYY-MM-DD)
      const formattedDate = formatDate(currentDate);
      datePickerInput.value = formattedDate;
      
      // Bugünün tarihini al ve max değer olarak ayarla
      const today = new Date();
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
      
      // Mevcut <p> etiketinin içeriğini temizle ve tarih seçici container'ı ekle
      parentParagraph.innerHTML = '';
      parentParagraph.appendChild(datePickerContainer);
      
      // Tarih input'una değişiklik dinleyicisi ekle
      datePickerInput.addEventListener('change', () => {
        statusElement.textContent = '';
      });
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
      statusElement.textContent = 'Yükleniyor...';
      
      const formattedDate = formatDateForEksi(dateStr);
      const url = `https://eksisozluk.com/debe?day=${formattedDate}`;
      
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
            
            // Ayrıca mevcut input değerini de güncelle
            const existingDateInput = document.querySelector('#debe-subscription-popup');
            if (existingDateInput) {
              existingDateInput.value = formattedDate;
            }
            
            statusElement.textContent = `${formattedDate} tarihli debe yüklendi.`;
            
            // URL'yi güncelle (geçmişte gezinmeyi kolaylaştırmak için)
            const newUrl = `${window.location.pathname}?day=${formattedDate}`;
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
      const dayParam = urlParams.get('day');
      
      if (dayParam) {
        // DD/MM/YYYY formatından YYYY-MM-DD formatına çevir
        const [day, month, year] = dayParam.split('/');
        const dateStr = `${year}-${month}-${day}`;
        
        // Tarih seçici varsa değerini güncelle
        const datePickerInput = document.getElementById('debe-date-picker');
        if (datePickerInput) {
          datePickerInput.value = dateStr;
          fetchDebeByDate(dateStr);
        }
      }
    }
    
    // Sayfa yüklendikten bir süre sonra URL'deki tarih parametresini kontrol et
    setTimeout(checkUrlForDate, 500);
  })();