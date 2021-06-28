<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");

   $connect=mysqli_connect("localhost","root","","myreactproject")or die("connectin failed");
   if(isset($_POST['email']))
    {
    if($_POST['name'] && $_POST['email'] && $_POST['password']){
        $query="insert into login(name, email, password)values('".$_POST['name']."', '".$_POST['email']."', '".$_POST['password']."')" ;

        if(mysqli_query($connect,$query))
        {
           $data = array("data" => "You Data added successfully");
           echo json_encode($data);
           //return response()->json(["data" => "You Data added successfully"]);
        } 
          
            else
        {
           echo "Error: " . $query . "<br>" . $connect->error;
        }
      } 
    }
    else if (isset($_POST['pass'])) {
      $query="select * from login where name='".$_POST['na']."' and password='".$_POST['pass']."'";
      $result=mysqli_query($connect,$query);
      $count=mysqli_num_rows($result);
      if($count>0)
        {
           $data = array("data" => "Login successfully");
           echo json_encode($data);
           //return response()->json(["data" => "You Data added successfully"]);
        }
        else if (empty($_POST['na']))
        {
           $data = array("data" => "Please Enter Username and Password");
           echo json_encode($data);
           //return response()->json(["data" => "You Data added successfully"]);
        }
        else if (empty($_POST['pass']))
        {
           $data = array("data" => "Please Enter Username and Password");
           echo json_encode($data);
           //return response()->json(["data" => "You Data added successfully"]);
        }  
      else
        {
          $data = array("data" => "Username or Password did not Match");
          echo json_encode($data);
         }
    }
   


else{
    $trp = mysqli_query($connect, "SELECT * from login");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
 }
    

		
?> 





