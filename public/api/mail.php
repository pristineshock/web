<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Origin: *");

require_once './config/config.php';
require_once './vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $return = null;

  // Post Name Sanitation and Validation
  if (isset($_REQUEST["name"])) {
    $name = htmlspecialchars($_REQUEST["name"]);

    if (strlen($name) <= 2) {
      $return["nameErr"] = "Name must be at least 3 characters long.";
    }
  } else $return["nameErr"] = "Please, complete this field";

  // Post Mail Sanitation and Validation
  if (isset($_REQUEST["mail"])) {
    $mail = htmlspecialchars($_REQUEST["mail"]);

    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
      $return["mailErr"] = "$mail is not a valid email address";
    }
  } else $return["mailErr"] = "Please, complete this field";

  // Post Message Sanitation and Validation
  if (isset($_REQUEST["message"])) {
    $message = htmlspecialchars($_REQUEST["message"]);

    if (strlen($message) <= 20) {
      $return["messageErr"] = "Message must be at least 20 characters long.";
    }
  } else $return["messageErr"] = "Please, complete this field";

  // Check if there are errors
  if (!empty($return["nameErr"]) || !empty($return["mailErr"]) || !empty($return["messageErr"])) {
    $return["status"] = "failed";
    $return["message"] = "Please, check all fields for errors.";
    echo json_encode($return);
    return;
  }

  // Try to send the mail
  $mailer = new PHPMailer(true);

  try {
    $mailer->isSMTP();
    $mailer->Host       = MAIL_HOST;
    $mailer->SMTPAuth   = true;
    $mailer->Username   = MAIL_USER;
    $mailer->Password   = MAIL_PASS;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mailer->Port       = MAIL_PORT;

    $mailer->setFrom(MAIL_FROM, 'PristineShock');
    $mailer->addAddress(MAIL_TO, 'Matias');
    $mailer->addReplyTo(MAIL_FROM, 'PristineShock');

    $mailer->isHTML(true);
    $mailer->Subject = "There is a new message in PristineShock.";
    $mailer->Body    = 'There is a new message in PristineShock.<br /><br />Message from: ' . $name . ' ( ' . $mail . ' ) <br /><br />' . $message;
    $mailer->AltBody = "There is a new message in PristineShock./n/nMessage from: " . $name . " ( " . $mail . " ) /n/n" . $message;

    $mailer->send();
    $return["status"] = "success";
    $return["message"] = "Thank you for sending this message. We will send you a email as soon as possible.";
    echo json_encode($return);
  } catch (Exception $e) {
    $return["status"] = "failed";
    $return["message"] = "There was an error sending this message. Please try again later or contact the administrator at " . MAIL_FROM;
    echo json_encode($return);
  }
} else {
  // Redirect if not a POST method
  header("Location: /");
  die();
}
