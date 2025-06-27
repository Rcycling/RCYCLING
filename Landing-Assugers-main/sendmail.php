<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Autoload PHPMailer installed via Composer
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // SMTP config
    $mail->isSMTP();
    $mail->Host       = getenv('SMTP_HOST') ?: 'smtp.office365.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = getenv('SMTP_USERNAME') ?: 'postmaster@assugeris.fr';
    $mail->Password   = getenv('SMTP_PASSWORD');
    $mail->SMTPSecure = getenv('SMTP_SECURE') ?: 'tls';
    $mail->Port       = getenv('SMTP_PORT') ?: 587;

    if (!$mail->smtpConnect()) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => 'Connexion SMTP failed: ' . $mail->ErrorInfo]);
        exit;
    }
    $mail->smtpClose();

    // Validate input
    $name    = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email   = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : '';
    $message = isset($_POST['message']) ? nl2br(htmlspecialchars($_POST['message'])) : '';

    if ($email === '' || $message === '') {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => 'Champs manquants']);
        exit;
    }

    // Prepare email
    $from = getenv('SMTP_FROM') ?: 'postmaster@assugeris.fr';
    $mail->setFrom($from, 'Site Assugeris');
    $mail->addAddress($from);
    $mail->addReplyTo($email, $name);
    $mail->Subject = '💬 [Contact] ' . $subject;
    $mail->isHTML(true);

    $body = "<html><body style='font-family:Arial,sans-serif'>" .
        "<div style='background:#a02328;color:#fff;padding:20px;text-align:center'>" .
        "<h2 style='margin:0'>Nouveau message de contact</h2></div>" .
        "<table style='width:100%;border-collapse:collapse;margin-top:15px'>" .
        "<tr><td style='padding:8px;border:1px solid #ddd'><b>Prénom</b></td><td style='padding:8px;border:1px solid #ddd'>" . $name . "</td></tr>" .
        "<tr><td style='padding:8px;border:1px solid #ddd'><b>Email</b></td><td style='padding:8px;border:1px solid #ddd'>" . $email . "</td></tr>" .
        "<tr><td style='padding:8px;border:1px solid #ddd'><b>Sujet</b></td><td style='padding:8px;border:1px solid #ddd'>" . $subject . "</td></tr>" .
        "</table>" .
        "<div style='margin-top:20px'>" . $message . "</div>" .
        "<div style='margin-top:30px;color:#888;font-size:12px;border-top:1px solid #eee;padding-top:10px'>Site Assugeris</div>" .
        "</body></html>";

    $mail->Body = $body;

    if ($mail->send()) {
        header('Location: /merci.html');
        exit;
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'error' => $e->getMessage()]);
}
