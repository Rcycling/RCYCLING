<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// PHPMailer manual include
$base = __DIR__ . '/PHPMailer/src/';
$files = ['Exception.php', 'PHPMailer.php', 'SMTP.php'];
foreach ($files as $f) {
    if (!file_exists($base . $f)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => 'PHPMailer non trouvé']);
        exit;
    }
    require_once $base . $f;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // SMTP config
    $mail->isSMTP();
    $mail->Host       = 'smtp.office365.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'postmaster@assugeris.fr';
    $mail->Password   = 'TON_MOT_DE_PASSE';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

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
    $mail->setFrom('postmaster@assugeris.fr', 'Site Assugeris');
    $mail->addAddress('postmaster@assugeris.fr');
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
