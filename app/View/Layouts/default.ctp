<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<title>
		tuckbick.com - <?php echo $title_for_layout; ?>
	</title>
	<?php
		// echo $this->Html->meta('icon');

		// echo $this->Html->css('cake.generic');

		echo $this->fetch('meta');
		echo $this->fetch('css');
	?>
</head>
<body>
	<?php /*
	<div id="container">
		<div id="header">
			<h1><?php echo $this->Html->link($cakeDescription, 'http://cakephp.org'); ?></h1>
		</div>
		<div id="content">

			<?php echo $this->Session->flash(); ?>

			<?php echo $this->fetch('content'); ?>
		</div>
		<div id="footer">
			<?php echo $this->Html->link(
					$this->Html->image('cake.power.gif', array('alt' => $cakeDescription, 'border' => '0')),
					'http://www.cakephp.org/',
					array('target' => '_blank', 'escape' => false)
				);
			?>
		</div>
	</div>
	*/ ?>
	<?php echo $this->Session->flash(); ?>
	<?php echo $this->fetch('content'); ?>
	<?php echo $this->element('sql_dump'); ?>
	<?php echo $this->fetch('script'); ?>
</body>
</html>
