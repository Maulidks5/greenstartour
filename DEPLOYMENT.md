# cPanel Shared Hosting Deployment

This project is Laravel 12 + Inertia.js + React + Vite + MySQL. For production, the web root must serve Laravel's `public` directory only.

## Blank Page Warning

This is a Laravel/Inertia project, so do not open or deploy any Vite `index.html` file. If cPanel has an `index.html` in the addon domain document root, delete it because Apache may serve it before Laravel and the page can look blank/black. The app must be served through Laravel's `public/index.php`.

For local testing, use `npm run dev` and open `http://127.0.0.1:8010`. Do not use the Vite URL as the website URL for this Laravel/Inertia build.

## Current Default App

The old static Vite build is not used anymore. The production site must always load:

```text
public/index.php
public/build/manifest.json
```

Do not deploy a `dist/` folder. Do not keep an old `index.html` in the domain document root. If the hosting document root contains old static files, rename or delete them before deploying this Laravel/Inertia version.

If your addon domain accidentally points to the project root instead of `public/`, the root `.htaccess` included in this project rewrites requests safely into `public/` and blocks direct access to Laravel core folders. The recommended setup is still to point the addon domain document root directly to `public/`.

## Recommended cPanel Structure

Best option for an addon domain:

```text
/home/CPANEL_USER/greenstar-app/              Laravel core files
/home/CPANEL_USER/greenstar-app/app
/home/CPANEL_USER/greenstar-app/bootstrap
/home/CPANEL_USER/greenstar-app/config
/home/CPANEL_USER/greenstar-app/database
/home/CPANEL_USER/greenstar-app/resources
/home/CPANEL_USER/greenstar-app/routes
/home/CPANEL_USER/greenstar-app/storage
/home/CPANEL_USER/greenstar-app/vendor

/home/CPANEL_USER/public_html/addon-domain/   addon domain document root
/home/CPANEL_USER/public_html/addon-domain/index.php
/home/CPANEL_USER/public_html/addon-domain/.htaccess
/home/CPANEL_USER/public_html/addon-domain/build
/home/CPANEL_USER/public_html/addon-domain/uploads
/home/CPANEL_USER/public_html/addon-domain/storage
```

If your host lets you set the addon domain document root to `/home/CPANEL_USER/greenstar-app/public`, use that. Then you do not need to edit `public/index.php`.

If your host cannot point the addon domain to `/public`, copy the contents of `public/` into the addon domain document root and replace its `index.php` with `deployment/cpanel-addon-index.php`. Edit this line:

```php
$laravelRoot = '/home/CPANEL_USER/greenstar-app';
```

Use the absolute path to the Laravel core folder.

## Local Build Before Upload

Run these locally:

```bash
npm install
npm run build
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

Do not upload `node_modules`. Upload `public/build`.

Do not upload `public/hot`. It is only for the Vite dev server.

## Upload Steps

1. Create the addon domain in cPanel.
2. Create a MySQL database and database user in cPanel.
3. Upload Laravel core files outside the addon document root if possible.
4. Upload the contents of `public/` to the addon domain document root, or point the addon domain document root directly to `public/`.
5. Create a production `.env` on the server from `.env.example`.
6. Set the server `.env` values:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
APP_KEY=base64:...

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cpanel_database_name
DB_USERNAME=cpanel_database_user
DB_PASSWORD="cpanel_database_password"

SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax

MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=465
MAIL_USERNAME=your_email_username
MAIL_PASSWORD="your_email_password"
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=hello@your-domain.com
MAIL_FROM_NAME="${APP_NAME}"
```

7. Generate the application key on the server if needed:

```bash
php artisan key:generate --force
```

8. Run database migrations:

```bash
php artisan migrate --force
php artisan db:seed --force
```

9. Cache production config/routes/views after `.env` is correct:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

10. Create the storage symlink:

```bash
php artisan storage:link
```

If `storage:link` fails on cPanel, create a symlink manually from the addon document root:

```bash
ln -s /home/CPANEL_USER/greenstar-app/storage/app/public /home/CPANEL_USER/public_html/addon-domain/storage
```

## Permissions

Set writable directories:

```bash
chmod -R 775 storage bootstrap/cache
```

If the host requires stricter permissions:

```bash
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod -R 775 storage bootstrap/cache
```

## Production Checklist

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://your-domain.com`
- `SESSION_SECURE_COOKIE=true` when HTTPS is active
- `public/hot` does not exist
- `public/build/manifest.json` exists
- `public/hot` does not exist on production
- `storage` and `bootstrap/cache` are writable
- cPanel PHP version is 8.2 or newer
- MySQL credentials are correct
- SMTP credentials are configured if email notifications should send
- WhatsApp Cloud API keys are optional; manual WhatsApp links still work

## Useful Commands

```bash
php artisan about
php artisan route:list
php artisan migrate --force
php artisan config:clear
php artisan cache:clear
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Notes

The Laravel core files should not be publicly accessible. Only files inside `public/` should be web-accessible.

The existing `public/index.php` is correct when the web root is the Laravel `public/` folder. Use `deployment/cpanel-addon-index.php` only for the split cPanel structure where the Laravel core sits outside the document root.
