# emberg.consulting

Личный сайт Эмберга Манасаряна. Статика без сборки: HTML + CSS + JS, шрифты в репозитории.

## Публикация на GitHub Pages

1. Создать репозиторий `emberg-consulting` и запушить содержимое папки в ветку `main`
2. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`
3. Файл `CNAME` уже лежит в корне. У регистратора (Porkbun) добавить DNS-записи:
   - `A` для `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` для `www` → `<github-username>.github.io`
4. В Settings → Pages включить Enforce HTTPS после выпуска сертификата (до часа)

## Перед запуском

- `assets/main.js` → `METRIKA_ID` - вставить номер счётчика Яндекс.Метрики
- `assets/main.js` → `TG` - проверить ник рабочего Telegram
- Заменить заглушки фото: `.hero-photo` и `.about-photo` в `index.html` (вставить `<img src="assets/img/..webp">`)
- `assets/img/og.jpg` - заменить на кадр 2 из ТЗ на съёмку (1200×630)
- Проверить подстановку текста в кнопках Telegram на iOS, Android и десктопе
- Подключить Яндекс.Вебмастер и отправить `sitemap.xml`

## Структура

- Шрифты встроены в `assets/style.css` (base64) - сайт корректно открывается даже с диска
- `index.html` - главная, 14 блоков по ТЗ, кнопки C01-C17 через `data-cta`
- `privacy.html`, `consent.html`, `cookies.html` - юридические страницы
- `404.html` - GitHub Pages подхватывает автоматически
- `assets/style.css` - стили, `assets/main.js` - шейдер, кнопки, cookie-баннер, анимации
