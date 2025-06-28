<?php declare(strict_types=1);
if (getenv('APP_DEBUG') === 'true') {
    error_reporting(E_ALL);
} else {
    error_reporting(0);
}

/*** CONFIG ***/
$dest      = getenv('MAIL_DEST');
$fromEmail = getenv('MAIL_FROM');

/*** HONEYPOT ***/
if(!empty($_POST['website'])) exit;

/*** BODY HTML ***/
$rows = '';
if(isset($_POST['selectedProduct']) && $_POST['selectedProduct'] !== ''){
  $prod = htmlspecialchars($_POST['selectedProduct']);
  $rows .= "<tr><td style='padding:6px 10px;border:1px solid #ddd'><b>Produit</b></td>
                <td style='padding:6px 10px;border:1px solid #ddd'>$prod</td></tr>";
}
foreach($_POST as $k=>$v){
  if(in_array($k,['website','selectedProduct']) || $v==='') continue;
  $label = ucfirst(str_replace('_',' ', $k));
  $rows .= "<tr><td style='padding:6px 10px;border:1px solid #ddd'><b>$label</b></td>
                <td style='padding:6px 10px;border:1px solid #ddd'>".htmlspecialchars($v)."</td></tr>";
}
$body = "
<html><body style='font-family:Arial;font-size:14px'>
  <p>Nouveau lead landing :</p>
  <table style='border-collapse:collapse'>$rows</table>
  <p style='color:#888;font-size:12px'>Assugeris · ".date('d/m/Y H:i')."</p>
</body></html>";

/*** HEADERS ***/
$safeEmail = str_replace(["\n","\r"], '', filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$headers  = "From: Landing Assugeris <$fromEmail>\r\n";
$headers .= "Reply-To: $safeEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

/*** SEND ***/
if(mail($dest, 'Nouveau lead landing', $body, $headers)){
  header('Location: /merci.html');
} else {
  http_response_code(500);
  echo 'error';
}
?>
