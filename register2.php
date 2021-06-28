<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");



$connect=mysqli_connect("localhost","root","","myreactproject") or die("connection failed");
  $nameerr="";
  $emailerr="";
  $passworderr="";
  $cpassworderr="";
  
if (!empty($_POST['save']))
{
  $name =$_POST['name'];
  $email =$_POST['email'];
  $password =$_POST['password'];
  $cpassword =$_POST['cpassword'];
  //name
     if(isset($_POST['name']))
      {     
        $data = array("data" => "Name is required");
            echo json_encode($data);
      }elseif (!preg_match("/^[a-zA-Z ]*$/",$name)) {  
                $data = array("data" => "Only alphabets and white space are allowed");
            echo json_encode($data);
         }  elseif (strlen($name) < 4) {
              $data = array("data" => "name was too short");
            echo json_encode($data);
 
    }
     //email
    if(empty($email))
      {
                    $data = array("data" => "email required");
            echo json_encode($data);
 
      }elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {  
                    $data = array("data" => "Invalid email format");
            echo json_encode($data);
            }  
     //password 
    if(empty($password))
      {
                $data = array("data" => "password required");
            echo json_encode($data);
      }
     //confirm
      if(empty($cpassword))
      {
        $data = array("data" => "confirm password required");
            echo json_encode($data);
      
      }elseif ($password !== $cpassword) {
    $data = array("data" => "Password and Confirm password should match!");
            echo json_encode($data);

}


else
  {
$data = array("data" => "Record not inserted");
            echo json_encode($data);
  }
  

  
  $query="insert into login(name,email,password,cpassword) values('$name','$email','$password','$cpassword')";
  
  if(mysqli_query($connect,$query))
  {

    $data = array("data" => "record inserted");
            echo json_encode($data);

  }
  
}
?>