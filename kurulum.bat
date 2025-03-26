@echo off
chcp 65001 > nul
REM EkşiSözlük Debe Tarih Seçici Kurulum Betiği
REM Dosya yolu: /home/main/public_html/ai.zefre.net/eksidebe/kurulum.bat
REM 
REM Orijinal geliştiren: Muhsin İŞSEVER
REM Email: muhsin.issever@gmail.com
REM Web sitesi: https://ai.zefre.net/
REM r10 profili: https://www.r10.net/profil/193-gneral.html
REM Github: https://www.github.com/gneral

echo EkşiSözlük Debe Tarih Seçici Kurulum Betiği
echo ---------------------------------------------
echo.

REM Chrome tarayıcısı kontrolü
echo Chrome tarayıcısı kontrol ediliyor...
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    echo Chrome tarayıcısı bulundu.
    set CHROME_PATH="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) else (
    if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
        echo Chrome tarayıcısı bulundu.
        set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
    ) else (
        if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
            echo Chrome tarayıcısı bulundu.
            set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
        ) else (
            echo Chrome tarayıcısı bulunamadı.
            echo Manuel kurulum yapmanız gerekecek.
            goto MANUEL_KURULUM
        )
    )
)

REM Klasör yapısını kontrol et
echo Klasör yapısı kontrol ediliyor...
if not exist "icons" (
    echo İkon klasörü oluşturuluyor...
    mkdir icons
)

REM SVG ikonları oluştur
echo SVG ikonları oluşturuluyor...
if not exist "icons\icon16.svg" (
    copy "icon.svg" "icons\icon16.svg"
)
if not exist "icons\icon48.svg" (
    copy "icon.svg" "icons\icon48.svg"
)
if not exist "icons\icon128.svg" (
    copy "icon.svg" "icons\icon128.svg"
)

echo.
echo Tüm dosyalar hazırlandı.
echo.

:KURULUM_SECENEGI
echo Lütfen kurulum seçeneğini seçin:
echo 1. Chrome'da eklentiyi aç (önerilen)
echo 2. Manuel kurulum talimatlarını göster
echo 3. Çıkış
set /p KURULUM_SECIM=Seçiminiz (1-3): 

if "%KURULUM_SECIM%"=="1" (
    echo Chrome'da uzantılar sayfası açılıyor...
    start %CHROME_PATH% "chrome://extensions/"
    echo.
    echo Lütfen şu adımları takip edin:
    echo 1. Açılan sayfada "Geliştirici modu"nu etkinleştirin (sağ üst köşede)
    echo 2. "Paketlenmemiş öğe yükle" butonuna tıklayın
    echo 3. Bu klasörü seçin
    echo 4. Eklenti kurulacak ve aktif hale gelecektir
    echo.
    echo EkşiSözlük Debe sayfasını açmak için Enter tuşuna basın.
    pause >nul
    start %CHROME_PATH% "https://eksisozluk.com/debe"
    goto SON
) else if "%KURULUM_SECIM%"=="2" (
    goto MANUEL_KURULUM
) else if "%KURULUM_SECIM%"=="3" (
    goto SON
) else (
    echo Geçersiz seçim. Lütfen tekrar deneyin.
    goto KURULUM_SECENEGI
)

:MANUEL_KURULUM
echo.
echo Manuel Kurulum Talimatları:
echo.
echo Chrome/Edge/Opera için:
echo 1. Tarayıcınızda uzantılar sayfasını açın:
echo    - Chrome: chrome://extensions
echo    - Edge: edge://extensions
echo    - Opera: opera://extensions
echo 2. Geliştirici modunu etkinleştirin
echo 3. "Paketlenmemiş öğe yükle" butonuna tıklayın
echo 4. Bu klasörü seçin
echo.
echo Firefox için:
echo 1. Firefox tarayıcınızda about:debugging sayfasını açın
echo 2. "Bu Firefox" sekmesini seçin
echo 3. "Geçici Eklenti Yükle" butonuna tıklayın
echo 4. Bu klasördeki manifest.json dosyasını seçin
echo.
pause

:SON
echo.
echo EkşiSözlük Debe Tarih Seçici kurulum işlemi tamamlandı.
echo İyi kullanımlar!
echo.
pause