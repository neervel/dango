<?php
// Файлы phpmailer
require 'class.phpmailer.php';

$name = $_POST['name'];
$phone = $_POST['phone'];   
$text = $_POST['text'];

// Настройки
$mail = new PHPMailer;
$mail->CharSet = "utf-8";



$mail->setFrom("info@dango.ru", 'Dango.ru'); // Ваш Email
$mail->addAddress('info@dango.club', 'Dango'); // Email получателя
                
// Письмо
$mail->isHTML(true); 
$mail->Subject = "Вопрос с сайта Dango"; // Заголовок письма
$mail->Body    = "Имя: $name <br>Телефон: $phone <br>Сообщение: $text "; // Текст письма

// Результат
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}
?>