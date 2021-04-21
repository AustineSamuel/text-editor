<?php
function rndName($len){
  $Rname=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  $mainName="";
  for ($i=0; $i < $len; $i++) { 
    $mainName.=$Rname[rand(0,count($Rname)-1)];
  }
return $mainName;
}
//echo rndName(10).".html";
$name=rndName(10).".html";
function save($data){
global $name;
$file=fopen($name,"w");
if(fwrite($file,$data)){
  echo $name;
} 
}

function del($file){
  if(file_exists($file)){
    unlink($file);
    echo "finished";
  }
  else{
    echo "file not found";
  }
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
$action=$_POST["action"];
$data=$_POST["data"];
if($action=="save"){
save($data);
}
else if($action=="del"){
  del($data);
}
}