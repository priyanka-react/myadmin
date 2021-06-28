<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");

   $connect=mysqli_connect("localhost","root","","myreactproject")or die("connectin failed");
   if(isset($_POST['categoryid']))
{
       
    if($_POST['categoryid'] && $_POST['pname'] && $_FILES['myFile']['name'] && $_POST['pprice'] && $_POST['pcontent'] && $_POST['pdisplayorder'] && $_POST['pstatus']){
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
        $query="insert into product(categoryid, pname,productimage,pprice,pcontent,pdisplayorder,pstatus)values('".$_POST['categoryid']."', '".$_POST['pname']."', '".$fullfilename."', '".$_POST['pprice']."', '".$_POST['pcontent']."', '".$_POST['pdisplayorder']."', '".$_POST['pstatus']."')" ;
        if(mysqli_query($connect,$query))
        {
            move_uploaded_file($filepath,"images1/".$fullfilename);  
           $data = array("data" => "You Data added successfully");
           echo json_encode($data);
           //return response()->json(["data" => "You Data added successfully"]);
        }
        else
        {
           echo "Error: " . $query . "<br>" . $connect->error;
        }
    }
    else{
        $data = array("data" => "Required fields are missing");
           echo json_encode($data);
    }
}

   //Delete user

   elseif(isset($_POST['deleteid']))
   {
      
      $sql = mysqli_query($connect, "DELETE from product where id =".$_POST['deleteid']);
      if ($sql) {
          
          //Success Message
          $data = array("data" => "Record deleted successfully");
          echo json_encode($data);
        } else {
        
          $data = array("data" =>"Error deleting record: " . mysqli_error($connect));
          echo json_encode($data);
        }
   }
//Get single user details
elseif(isset($_POST['productid']))
{
    $trp = mysqli_query($connect, "SELECT * from product where id =".$_POST['productid']);
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

//Update user
elseif(isset($_POST["updateid"]))
{
    $sql = "UPDATE product SET categoryid='".$_POST["updatecategoryid"]."',pname='".$_POST["updatepname"]."',pprice='".$_POST["updatepprice"]."',pcontent='".$_POST["updatepcontent"]."',pdisplayorder='".$_POST["updatepdisplayorder"]."',pstatus='".$_POST["updatepstatus"]."'   WHERE id=".$_POST["updateid"];
    if ($connect->query($sql) === TRUE) {
    
       $data = array("data" => "Record updated successfully");
        echo json_encode($data);
    } else {
    
    $data = array("data" => "Error updating record: " . $connect->error);
    echo json_encode($data);
    }
}

else{
    $trp = mysqli_query($connect, "SELECT * from product");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
 }
		
		
?> 
