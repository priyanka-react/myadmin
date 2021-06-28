<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");

   $connect=mysqli_connect("localhost","root","","myreactproject")or die("connectin failed");
   if(isset($_POST['name']))
{
    if($_POST['sl'] && $_POST['name'] && $_POST['content'] && $_POST['displayorder'] && $_POST['status']){
        $query="insert into pages(name,content,displayorder,status,sl)values('".$_POST['name']."', '".$_POST['content']."', '".$_POST['displayorder']."', '".$_POST['status']."','".$_POST['sl']."')" ;
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
    else{
        $data = array("data" => "Required fields are missing");
           echo json_encode($data);
    }
}

   //Delete user

   elseif(isset($_POST['deleteid']))
   {
      
      $sql = mysqli_query($connect, "DELETE from pages where id =".$_POST['deleteid']);
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
elseif(isset($_POST['pageid']))
{
    $trp = mysqli_query($connect, "SELECT * from pages where id =".$_POST['pageid']);
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}


//search 
else if(!empty($_REQUEST['sd']))
{
    $sd = $_REQUEST['sd'];     
    $qry="SELECT * FROM pages WHERE name LIKE '".$sd."%'";
    $trp = mysqli_query($connect,$qry);
    $count=mysqli_num_rows($trp);
    if($count>0)
    { 
                   
            $rows = array();

            while($r = mysqli_fetch_assoc($trp))
            {
                $rows[] = $r;
            }
            print json_encode($rows);

    }
    else
    {
        $data = array("data" => "page not found");
           echo json_encode($data);
    }
}


//Update user
elseif(isset($_POST["updateid"]))
{
    $sql = "UPDATE pages SET name='".$_POST["updatename"]."',content='".$_POST["updatecontent"]."',displayorder='".$_POST["updatedisplayorder"]."',status='".$_POST["updatestatus"]."'   WHERE id=".$_POST["updateid"];
    if ($connect->query($sql) === TRUE) {
    
       $data = array("data" => "Record updated successfully");
        echo json_encode($data);
    } else {
    
    $data = array("data" => "Error updating record: " . $connect->error);
    echo json_encode($data);
    }
}

else{
    $trp = mysqli_query($connect, "SELECT * from pages");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
 }
		
		
?> 
