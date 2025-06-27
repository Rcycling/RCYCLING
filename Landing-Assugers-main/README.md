# Landing Assugers

## Mailing setup

The `sendmail.php` script relies on [PHPMailer](https://github.com/PHPMailer/PHPMailer) installed via Composer. Before running the project, install PHP dependencies:

```bash
composer install
```

Configure the following environment variables to match your SMTP server:

- `SMTP_HOST` (default: `smtp.office365.com`)
- `SMTP_USERNAME` (default: `postmaster@assugeris.fr`)
- `SMTP_PASSWORD` **required**
- `SMTP_SECURE` (default: `tls`)
- `SMTP_PORT` (default: `587`)
- `SMTP_FROM` (email used as sender and recipient)

Export these variables or add them to your hosting configuration. `SMTP_PASSWORD` must not be hard coded.
