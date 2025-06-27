<?php
error_reporting(0);

/*** CONFIG ***/
$dest      = 'assugeris83200@gmail.com';
$fromEmail = 'contact@assugeris-assurances.fr';

/*** HONEYPOT ***/
if(!empty($_POST['website'])) exit;

/*** BODY HTML ***/
$rows = '';
foreach($_POST as $k=>$v){
  if(in_array($k,['website']) || $v==='') continue;
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
$headers  = "From: Landing Assugeris <$fromEmail>\r\n";
$headers .= "Reply-To: ".$_POST['email']."\r\n";
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
