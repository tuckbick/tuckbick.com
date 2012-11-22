<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="HandheldFriendly" content="True">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="tuckbick.com">
    <meta http-equiv="cleartype" content="on">
	<title>
		tuckbick.com - <?php echo $title_for_layout; ?>
	</title>
	<?php
		echo $this->fetch('meta');
		echo $this->fetch('css');
	?>
</head>
<body>
	<?php echo $this->Session->flash(); ?>
	<?php echo $this->fetch('content'); ?>
	<?php echo $this->element('sql_dump'); ?>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<?php echo $this->fetch('script'); ?>
	<script>
		// keep navigation within iPhone web app
		$( document ).on( 'click', 'a', function( event ){
		 
			// Stop the default behavior of the browser, which
			// is to change the URL of the page.
			event.preventDefault();
			 
			// Manually change the location of the page to stay in
			// "Standalone" mode and change the URL at the same time.
			location.href = $( event.target ).attr( "href" );
		});
	</script>
</body>
</html>
