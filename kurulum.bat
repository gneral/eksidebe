@echo off
chcp 65001 > nul
REM EkşiSözlük Debe Tarih Seçici Kurulum Betiği (Güncellenmiş)
REM Dosya yolu: /home/main/public_html/ai.zefre.net/eksidebe/kurulum.bat
REM 
REM Orijinal geliştiren: Muhsin İŞSEVER
REM Email: muhsin.issever@gmail.com
REM Web sitesi: https://ai.zefre.net/
REM r10 profili: https://www.r10.net/profil/193-gneral.html
REM Github: https://www.github.com/gneral

echo EkşiSözlük Debe Tarih Seçici Kurulum Betiği (v1.1)
echo -------------------------------------------------
echo.

REM Chrome, Edge ve Firefox tarayıcı kontrolü
echo Tarayıcılar kontrol ediliyor...
set BROWSER_FOUND=0
set BROWSER_EXE=
set BROWSER_NAME=

REM Chrome kontrolü
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    echo Chrome tarayıcısı bulundu: %LOCALAPPDATA%\Google\Chrome\Application\chrome.exe
    set BROWSER_EXE="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
    set BROWSER_NAME=Chrome
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo Chrome tarayıcısı bulundu: C:\Program Files\Google\Chrome\Application\chrome.exe
    set BROWSER_EXE="C:\Program Files\Google\Chrome\Application\chrome.exe"
    set BROWSER_NAME=Chrome
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo Chrome tarayıcısı bulundu: C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
    set BROWSER_EXE="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    set BROWSER_NAME=Chrome
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

REM Edge kontrolü
if exist "%PROGRAMFILES(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo Microsoft Edge tarayıcısı bulundu: %PROGRAMFILES(x86)%\Microsoft\Edge\Application\msedge.exe
    set BROWSER_EXE="%PROGRAMFILES(x86)%\Microsoft\Edge\Application\msedge.exe"
    set BROWSER_NAME=Edge
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

if exist "%PROGRAMFILES%\Microsoft\Edge\Application\msedge.exe" (
    echo Microsoft Edge tarayıcısı bulundu: %PROGRAMFILES%\Microsoft\Edge\Application\msedge.exe
    set BROWSER_EXE="%PROGRAMFILES%\Microsoft\Edge\Application\msedge.exe"
    set BROWSER_NAME=Edge
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

REM Firefox kontrolü
if exist "%PROGRAMFILES%\Mozilla Firefox\firefox.exe" (
    echo Firefox tarayıcısı bulundu: %PROGRAMFILES%\Mozilla Firefox\firefox.exe
    set BROWSER_EXE="%PROGRAMFILES%\Mozilla Firefox\firefox.exe"
    set BROWSER_NAME=Firefox
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

if exist "%PROGRAMFILES(x86)%\Mozilla Firefox\firefox.exe" (
    echo Firefox tarayıcısı bulundu: %PROGRAMFILES(x86)%\Mozilla Firefox\firefox.exe
    set BROWSER_EXE="%PROGRAMFILES(x86)%\Mozilla Firefox\firefox.exe"
    set BROWSER_NAME=Firefox
    set BROWSER_FOUND=1
    goto BROWSER_FOUND
)

echo Desteklenen tarayıcılar bulunamadı. Manuel kurulum yapmanız gerekecek.
goto MANUEL_KURULUM

:BROWSER_FOUND
REM Klasör yapısını kontrol et
echo Klasör yapısı kontrol ediliyor...
if not exist "icons" (
    echo İkon klasörü oluşturuluyor...
    mkdir icons
)

REM SVG ikonları oluştur (eğer yoksa)
echo SVG ikonları kontrol ediliyor...
if not exist "icons\icon16.svg" (
    echo icon16.svg oluşturuluyor...
    copy "icon.svg" "icons\icon16.svg" >nul 2>nul
)
if not exist "icons\icon48.svg" (
    echo icon48.svg oluşturuluyor...
    copy "icon.svg" "icons\icon48.svg" >nul 2>nul
)
if not exist "icons\icon128.svg" (
    echo icon128.svg oluşturuluyor...
    copy "icon.svg" "icons\icon128.svg" >nul 2>nul
)

echo.
echo Tüm dosyalar hazırlandı.
echo.

:KURULUM_SECENEGI
echo Lütfen kurulum seçeneğini seçin:
echo 1. %BROWSER_NAME% tarayıcısında eklentiyi kur (önerilen)
echo 2. Manuel kurulum talimatlarını göster
echo 3. Çıkış
set /p KURULUM_SECIM=Seçiminiz (1-3): 

if "%KURULUM_SECIM%"=="1" (
    if "%BROWSER_FOUND%"=="1" (
        echo %BROWSER_NAME% tarayıcısında uzantılar sayfası açılıyor...
        
        if "%BROWSER_NAME%"=="Chrome" (
            start "" %BROWSER_EXE% "chrome://extensions/"
        ) else if "%BROWSER_NAME%"=="Edge" (
            start "" %BROWSER_EXE% "edge://extensions/"
        ) else if "%BROWSER_NAME%"=="Firefox" (
            start "" %BROWSER_EXE% "about:debugging#/runtime/this-firefox"
        )
        
        echo.
        echo Lütfen şu adımları takip edin:
        
        if "%BROWSER_NAME%"=="Firefox" (
            echo 1. Açılan sayfada "Bu Firefox" sekmesini seçin
            echo 2. "Geçici Eklenti Yükle" butonuna tıklayın
            echo 3. Bu klasördeki manifest.json dosyasını seçin
        ) else (
            echo 1. Açılan sayfada "Geliştirici modu"nu etkinleştirin (sağ üst köşede)
            echo 2. "Paketlenmemiş öğe yükle" butonuna tıklayın
            echo 3. Bu klasörü seçin
        )
        
        echo 4. Eklenti kurulacak ve aktif hale gelecektir
        echo.
        echo EkşiSözlük Debe sayfasını açmak için Enter tuşuna basın.
        pause >nul
        
        start "" %BROWSER_EXE% "https://eksisozluk.com/debe"
    ) else (
        echo Tarayıcı açılamadı. Lütfen manuel kurulum yapın.
        goto MANUEL_KURULUM
    )
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
echo Sorun yaşarsanız https://ai.zefre.net/ adresini ziyaret edebilirsiniz.
echo İyi kullanımlar!
echo.
pause