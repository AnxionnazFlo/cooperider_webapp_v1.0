<?php
$poids_max = 7000000; // limit the volume of uploaded file
$upload_directory = "../../assets/tracks_points/";   // set up the path for uploads

 if (isset($_FILES['gpx']) && $_FILES['gpx']['error']==0){  //check for file and errors
     if ($_FILES['gpx']['type'] == 'application/gpx+xml' || $_FILES['gpx']['type'] == 'application/octet-stream' ){  //check for type of file
        if ($_FILES['gpx']['size'] < $poids_max){   //check for the max weights
            $nom_gpx = $_FILES['gpx']['name'];  //set the name
            // move the file and change the rights on it
            if (move_uploaded_file($_FILES['gpx']['tmp_name'], $upload_directory.$nom_gpx)) { 
                $url = $upload_directory.''.$nom_gpx.''; 
                chmod($upload_directory.$nom_gpx, 0777);   
                echo 4;
            } 
            else 
            { 
            echo 3;
            }      
        }
        else {
            echo 2;
        }
    }
    else {
    echo 1 ;
    }
 }
