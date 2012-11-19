<?php
$this->start('css');
echo $this->Html->css('home');
$this->end();
?>
<div class="wrapper">

	<header>
	<h1><?php echo $this->Html->link('Tucker Truax Bickler', array('controller' => 'home'), array('title' => 'home')) ?></h1>
	</header>

	<nav>
		<?php echo $this->Html->link('resume', array('controller' => 'resume'), array('title' => 'resume')) ?>
		<span class="del">&#9733;</span>
		<?php echo $this->Html->link('projects', array('controller' => 'projects'), array('title' => 'projects')) ?>
	</nav>

	<section class="content">
		<?php echo $this->Html->image('head.jpeg', array('alt' => 'Headshot'))?>

		<ul class="contact">
			<li><?php echo $this->Html->link('tuckersworld@gmail.com', 'mailto:tuckersworld@gmail.com', array('title' => 'Send me an email')) ?></li>
			<li><?php echo $this->Html->link('github.com/tuckbick', 'http://github.com/tuckbick', array('title' => 'GitHub - tuckbick')) ?></li>
			<li><?php echo $this->Html->link('linkedin.com/in/tuckerbickler', 'http://www.linkedin.com/in/tuckerbickler', array('title' => 'LinkedIn - Tucker Truax Bickler')) ?></li>
			<li><?php echo $this->Html->link('@tuckbick', 'http://twitter.com/tuckbick', array('title' => 'Twitter - @tuckbick')) ?></li>
		</ul>
	</section>

</div>
