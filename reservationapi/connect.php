<?php

  // Database connection settings
  define('DB_HOST', 'localhost');
  define('DB_USER', 'root');
  define('DB_PASS', '');
  define('DB_NAME', 'conservation_area');

  // Create a connection to the database
  function connect() {
      $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

      // Check if the connection was successful
      if(mysqli_connect_errno()) {
          die("Connection failed: " . mysqli_connect_error());
      }
      mysqli_set_charset($connect, "utf8");
      return $connect;
  }
  $con = connect();

?>