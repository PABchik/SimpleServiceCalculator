<?
require_once 'mail_config.php';

function sendMails($text) {
	foreach (getMails() as $email)
		mail($email, 'new ticket', $text, 'from service');

	
	// $text = mb_convert_encoding($text, 'utf-8', mb_detect_encoding($text));
}