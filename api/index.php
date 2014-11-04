<?php
include '../../config.php';

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/terms', 'getTerms');
$app->get('/terms/:id', 'getTerm');
$app->post('/terms', 'addTerm');
$app->put('/terms/:id', 'updateTerm');
$app->delete('/terms/:id',   'deleteTerm');

$app->run();

function getTerms() {

  $db = getConn();
  $data = array();
  $sql = "select * from terms order by acronym ";

  if(!$results = $db->query($sql)) {
    echo "error :" . $db->error;
  } else {
    while( $row = $results->fetch_assoc() ) {
      $data[] = array("id"=>$row["id"], "term"=>$row["term"], "acronym"=>$row["acronym"], "description"=>$row["description"]);
    }
    echo json_encode($data);
  }

  $results->free();
  $db->close();

}

function getTerm($id) {

  $db = getConn();
  $sql = "select * from terms where id = " . $id;

  if( !$results = $db->query($sql) ) {
    echo "error :" . $db->error;
  } else {
    while( $row = $results->fetch_assoc() ) {
      $data[] = array("id"=>$row["id"], "term"=>$row["term"], "acronym"=>$row["acronym"], "description"=>$row["description"]);
    }
    echo json_encode($data);
  }

  $results->free();
  $db->close();

}

function deleteTerm($id) {

  $db = getConn();
  $sql = "delete from terms where id = " . $id;

  $db->query($sql);
  if( $db->affected_rows == 0) {
    echo "Record not found";
  }

  $db->close();

}

function updateTerm($id) {

  $request = Slim::getInstance()->request();
  $body = $request->getBody();
  $data = json_decode($body);

  $db = getConn();
  $sql = "update glossary.terms set
           term = '" . $data->term . "',
            acronym = '" . $data->acronym . "',
             description = '" . $data->description . "'
              where id = " . $data->id;

  $db->query($sql);
  if($db->affected_rows == 0) {
    echo "No matching record";
  }

  $db->close();

}

function addTerm() {
  $request = Slim::getInstance()->request();
  $body = $request->getBody();
  $data = json_decode($body);

  $db = getConn();
  $sql = "insert into glossary.terms (term, acronym, description)
          values ('" . $data->term . "', '" . $data->acronym . "', '" . $data->description . "')";

  $db->query($sql);
  if($db->affected_rows == 0) {
     echo "Record not added";
  }

  $data->id = $db->insert_id;
  echo json_encode($data);

  $db->close();

}


?>
