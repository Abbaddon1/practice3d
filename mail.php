<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$response = array(
    'success' => false,
    'message' => 'Возникла ошибка при отправке сообщения.'
);

try {
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.yandex.ru';                       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'testpolyaninpro@yandex.ru';            //SMTP username
    $mail->Password   = 'ocxlvxwusrshvosj';                     //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('testpolyaninpro@yandex.ru', 'Практика 3д');
    $mail->addAddress('testpolyaninpro@yandex.ru', 'получатель');     //Add a recipient

    //Content
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    // $formid = $_POST['formid'];
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Великолепная заявка с сайта! ';
    $mail->Body    = 'Имя: ' . $name . '<br>' . 'Номер телефона: ' . $phone . '<br>' . 'Сообщение: ' . $message;

    // Отправляем письмо
    $mail->send();

    // Устанавливаем успешный ответ
    $response['success'] = true;
    $response['message'] = 'Письмо успешно отправлено!';
} catch (Exception $e) {
    // В случае ошибки устанавливаем сообщение об ошибке
    $response['message'] = "Сообщение не отправлено. Ошибка: {$mail->ErrorInfo}";
}

// Возвращаем ответ в формате JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
