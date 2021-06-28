<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST");

header("Access-Control-Allow-Headers: X-Requested-With");

$connect=mysqli_connect("localhost","root","","myreactproject") or die("connection failed");

    if(isset($_REQUEST['term']))
{
    $term = $_REQUEST['term'];
    $trp = mysqli_query($connect, "SELECT * from pages where name Like '%".$term."%'");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

if(isset($_REQUEST['term']))
{
    $term = $_REQUEST['term'];
    $trp = mysqli_query($connect, "SELECT * from category where catname Like '%".$term."%'");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
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