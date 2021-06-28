<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: X-Requested-With");
	//print_r($_FILES);
	$connect=mysqli_connect("localhost","root","","myreactproject")or die("connection failed");
	/*prient_r($_POST);
	print_r($_FILES);*/
	if(!empty($_FILES['myFile']['name'])){
		$filename=$_FILES['myFile']['name'];
		$filepath=$_FILES['myFile']['tmp_name'];
		$e=explode('.',$filename);
		$ext=end($e);
		$query="show table status like 'product'";
		$result=mysqli_query($connect,$query);
		$row=mysqli_fetch_assoc($result);
		/*print_r($row);
		exit;*/
		$ip=$row['Auto_increment'];
		$fullfilename=$ip.".".$ext;
		$query="insert into product(productimage) values('$fullfilename')";
		if(mysqli_query($connect,$query)){
			move_uploaded_file($filepath,"images1/".$fullfilename);
			$data = array("data" => "File Uploaded Successfully");
			echo json_encode($data);
		}
		else{
			$data = array("data" => "File Uploaded Not Successfully");
			echo json_encode($data);
		}
	}
?>