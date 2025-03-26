<?php
/**
 * EkşiSözlük Debe Tarih Seçici - setup.php
 * Dosya yolu: /home/main/public_html/ai.zefre.net/eksidebe/setup.php
 * 
 * Orijinal geliştiren: Muhsin İŞSEVER
 * Email: muhsin.issever@gmail.com
 * Web sitesi: https://ai.zefre.net/
 * r10 profili: https://www.r10.net/profil/193-gneral.html
 * Github: https://www.github.com/gneral
 */

// Hata raporlamayı etkinleştir
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Yüklemeyi başlat
echo "EkşiSözlük Debe Tarih Seçici Kurulum Betiği\n";
echo "---------------------------------------------\n\n";

// Sunucu ortamını kontrol et
echo "Sunucu bilgileri kontrol ediliyor...\n";
$server_info = [
    'PHP Sürümü' => PHP_VERSION,
    'İşletim Sistemi' => php_uname(),
    'Web Sunucusu' => $_SERVER['SERVER_SOFTWARE'] ?? 'Bilinmiyor',
    'Çalışma Dizini' => getcwd()
];

foreach ($server_info as $key => $value) {
    echo "- $key: $value\n";
}
echo "\n";

// Dizin yapısını oluştur
$project_name = 'eksidebe';
$base_dir = '/home/main/public_html/ai.zefre.net/' . $project_name;

echo "Dizin yapısı oluşturuluyor: $base_dir\n";

// Ana dizini oluştur
if (!file_exists($base_dir)) {
    if (mkdir($base_dir, 0755, true)) {
        echo "- Ana dizin oluşturuldu: $base_dir\n";
    } else {
        echo "- HATA: Ana dizin oluşturulamadı: $base_dir\n";
        exit(1);
    }
} else {
    echo "- Ana dizin zaten mevcut: $base_dir\n";
}

// Alt dizinleri oluştur
$subdirs = ['icons'];
foreach ($subdirs as $subdir) {
    $path = $base_dir . '/' . $subdir;
    if (!file_exists($path)) {
        if (mkdir($path, 0755, true)) {
            echo "- Alt dizin oluşturuldu: $path\n";
        } else {
            echo "- HATA: Alt dizin oluşturulamadı: $path\n";
        }
    } else {
        echo "- Alt dizin zaten mevcut: $path\n";
    }
}
echo "\n";

// Dosyaları oluştur
$files = [
    'manifest.json' => '{"manifest_version":3,"name":"EkşiSözlük Debe Tarih Seçici","version":"1.0","description":"EkşiSözlük Debe sayfasına tarih seçme özelliği ekler","author":"Muhsin İŞSEVER","icons":{"16":"icons/icon16.svg","48":"icons/icon48.svg","128":"icons/icon128.svg"},"content_scripts":[{"matches":["*://eksisozluk.com/debe*"],"js":["content.js"],"css":["styles.css"]}],"permissions":["activeTab"],"host_permissions":["*://eksisozluk.com/*"]}',
    'content.js' => '// EkşiSözlük Debe Tarih Seçici - content.js içeriği',
    'styles.css' => '/* EkşiSözlük Debe Tarih Seçici - styles.css içeriği */',
    'icons/icon16.svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="2" fill="#81C14B"/><text x="8" y="12" font-family="Arial" font-size="10" fill="white" text-anchor="middle">D</text></svg>',
    'icons/icon48.svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="6" fill="#81C14B"/><text x="24" y="32" font-family="Arial" font-size="24" fill="white" text-anchor="middle">D</text></svg>',
    'icons/icon128.svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#81C14B"/><rect x="24" y="32" width="80" height="72" rx="4" fill="white"/><rect x="24" y="32" width="80" height="16" rx="4" fill="#444"/><circle cx="44" cy="68" r="8" fill="#81C14B"/><circle cx="64" cy="68" r="8" fill="#81C14B"/><circle cx="84" cy="68" r="8" fill="#81C14B"/><circle cx="44" cy="88" r="8" fill="#81C14B"/><circle cx="64" cy="88" r="8" fill="#81C14B" stroke="#444" stroke-width="2"/><circle cx="84" cy="88" r="8" fill="#81C14B"/><text x="64" y="24" font-family="Arial, sans-serif" font-size="16" fill="white" font-weight="bold" text-anchor="middle">DEBE</text></svg>',
    'README.md' => '# EkşiSözlük Debe Tarih Seçici\n\nBu tarayıcı eklentisi, EkşiSözlük\'ün debe (dünün en beğenilen entry\'leri) sayfasına tarih seçme özelliği ekler.\n\n## Geliştiren\n\nMuhsin İŞSEVER\nEmail: muhsin.issever@gmail.com\nWeb sitesi: https://ai.zefre.net/\nr10 profili: https://www.r10.net/profil/193-gneral.html\nGithub: https://www.github.com/gneral'
];

echo "Dosyalar oluşturuluyor...\n";
foreach ($files as $file => $content) {
    $path = $base_dir . '/' . $file;
    $dir = dirname($path);
    
    // Dizin yoksa oluştur
    if (!file_exists($dir)) {
        mkdir($dir, 0755, true);
    }
    
    if (file_put_contents($path, $content) !== false) {
        echo "- Dosya oluşturuldu: $path\n";
    } else {
        echo "- HATA: Dosya oluşturulamadı: $path\n";
    }
}
echo "\n";

// .env dosyası oluştur
$env_file = $base_dir . '/.env';
$env_content = "# EkşiSözlük Debe Tarih Seçici - Ortam Değişkenleri\n";
$env_content .= "EXTENSION_VERSION=1.0\n";
$env_content .= "EXTENSION_AUTHOR=\"Muhsin İŞSEVER\"\n";
$env_content .= "EXTENSION_WEBSITE=https://ai.zefre.net/\n";
$env_content .= "EXTENSION_GITHUB=https://www.github.com/gneral\n";
$env_content .= "EXTENSION_DOMAIN=https://ai.zefre.net/eksidebe\n";

if (file_put_contents($env_file, $env_content) !== false) {
    echo "- .env dosyası oluşturuldu: $env_file\n";
} else {
    echo "- HATA: .env dosyası oluşturulamadı: $env_file\n";
}

// ZIP arşivi oluştur
$zip_file = $base_dir . '/eksidebe.zip';
echo "\nZIP arşivi oluşturuluyor: $zip_file\n";

if (extension_loaded('zip')) {
    $zip = new ZipArchive();
    if ($zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
        // Ana dizindeki dosyaları ekle
        $files_to_zip = ['manifest.json', 'content.js', 'styles.css', 'README.md'];
        foreach ($files_to_zip as $file) {
            $zip->addFile($base_dir . '/' . $file, $file);
        }
        
        // İkon dosyalarını ekle
        foreach (['icon16.svg', 'icon48.svg', 'icon128.svg'] as $icon) {
            $zip->addFile($base_dir . '/icons/' . $icon, 'icons/' . $icon);
        }
        
        $zip->close();
        echo "- ZIP arşivi başarıyla oluşturuldu: $zip_file\n";
    } else {
        echo "- HATA: ZIP arşivi oluşturulamadı\n";
    }
} else {
    echo "- HATA: ZIP uzantısı yüklü değil. Arşiv oluşturulamadı.\n";
}

// Kurulum tamamlandı
echo "\nKurulum tamamlandı!\n";
echo "Eklenti dosyalarına şu dizinden erişebilirsiniz: $base_dir\n";
echo "Web üzerinden erişim: https://ai.zefre.net/$project_name/\n";