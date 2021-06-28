<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");

   $connect=mysqli_connect("localhost","root","","myreactproject")or die("connectin failed");
   
    if(!empty($_POST['npass'])) {
    	$name=$_POST['name'];
		$pass=$_POST['pass'];
		$npass=$_POST['npass'];
		$cnewpassword=$_POST['cnewpassword'];
		if($npass==$cnewpassword)
		{
			$query="select * from login where name='$name' and password='$pass'";
			$res=mysqli_query($connect,$query);
			$count=mysqli_num_rows($res);
			if($count>0)
			{
				$query="update login set password='$npass' where password='$pass' and name='$name'";
				mysqli_query($connect,$query);
				$data = array("data" => "Password Updated");
				echo json_encode($data);
			}
			else
			{
				$data = array("data" => "Password Not Match");
				echo json_encode($data);
			}
		}
		else
		{
			$data = array("data" => "New and Confirm New Password Does not Match");
			echo json_encode($data);
		}
    } 

    

		
?> 
