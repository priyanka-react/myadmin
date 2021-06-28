<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");


  //$btnchange= filter_input(INPUT_POST, "btnchange");
   $connect=mysqli_connect("localhost","root","","myreactproject")or die("connectin failed");

  if(isset($_POST['pass']))
  {
    if($_POST['pass'] && $_POST['newpass'] && $_POST['confpass']){

    $query="select * from login where password='".$_POST['pass']."'";
    $run=mysqli_query($connect,$query);
    $rows=mysqli_fetch_array($run);
    if($rows['password'] == $_POST['pass'])
    {
      if ($_POST['newpass']==$_POST['confpass'])
      {
        $update_query="update login set password='".$_POST['newpass']."' where password='".$_POST['pass']."'";
        $update_run= mysqli_query($connect, $update_query);

        if($update_query)
        {
          $data = array("data" => "Password Change Successfully");
          echo json_encode($data);
        }   
        else
        {
          $data = array("data" => "Password Change Failed");
          echo json_encode($data);
        }
      }
      else
      {
        $data = array("data" => "Confirm Password Dose Not Match");
          echo json_encode($data);
      }
    }
  }
    else
      {
        $data = array("data" => "Old Password Dose Not Match");
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








