<?php
//php is a server side scripting language
//retrieve all 6 values send by ajax using POST
//field1=fdsis&field2=sksak&....

//all variables in PHP start with $
$email = $_POST["email"]; //field1=fdsis => $field1 contains "fdsis"
$subject = $_POST["subject"];
$message = $_POST["message"];

//all 6 values have now been retrieved into variables to interact with

//do error checking (just like JS) => IN FALL

//as response, we will just send the data back to the client in a string
echo "email: $email, subject: $subject, message: $message";
?>
