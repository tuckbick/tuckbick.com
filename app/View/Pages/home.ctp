<?php
$this->start('css');
echo $this->Html->css('home');
$this->end();
?>
<div class="wrapper">

    <header>
	<h1><?php echo $this->Html->link('Tucker Truax Bickler', array('controller' => 'home'), array('title' => 'home')); ?></h1>
    </header>

    <nav>
	<?php echo $this->Html->link('resume', array('controller' => 'resume'), array('title' => 'resume')); ?>
        <span class="del">&#9733;</span>
	<?php echo $this->Html->link('projects', array('controller' => 'projects'), array('title' => 'projects')); ?>
    </nav>

    <section class="content">
	<?php echo $this->Html->image('head.jpeg', array('alt' => 'Headshot'))?>

        <ul class="contact">
            <li><a href="mailto:tuckersworld@gmail.com">tuckersworld@gmail.com</a></li>
            <li><a href="http://github.com/tuckbick">github.com/tuckbick</a></li>
            <li><a href="http://www.linkedin.com/in/tuckerbickler">linkedin.com/in/tuckerbickler</a></li>
            <li><a href="http://tuckbick.com">tuckbick.com</a></li>
            <li><a href="http://twitter.com/tuckbick">@tuckbick</a></li>
        </ul>
    </section>

</div>
