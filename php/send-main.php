<?php
// Файлы phpmailer
require 'class.phpmailer.php';

$number = $_POST['number'];

// Настройки
$mail = new PHPMailer;
$mail->CharSet = "utf-8";



$mail->setFrom("info@dango.ru", 'Dango.ru'); // Ваш Email
$mail->addAddress('info@dango.club', 'Dango'); // Email получателя
                
// Письмо
$mail->isHTML(true); 
$mail->Subject = "Телефон для ссылки Dango"; // Заголовок письма
$mail->Body    = "Телефон: $number "; // Текст письма

// Результат
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}
?>