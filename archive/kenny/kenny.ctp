<?php
$this->start('css');
echo $this->Html->css('kenny');
$this->end();
?>

<?php echo $this->Html->image('kenny/waves_bg.jpg', array('class' => 'waves bg hide')); ?>
<?php echo $this->Html->media(
    array(
      array('src' => 'kenny/waves.mp4.mp4', 'type' => "video/mp4"),
      array('src' => 'kenny/waves.webmsd.webm', 'type' => "video/webm"),
      array('src' => 'kenny/waves.oggtheora.ogv', 'type' => "video/ogg")
    ),
    array('loop', 'class' => 'waves hide')
 ); ?>

<!-- <div class="brief">
  <h1>Kenny Cagle</h1>
  <h2>artist</h2>
</div> -->

<?php echo $this->Html->script('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'); ?>
<?php echo $this->Html->script('kenny/jquery.detectMobile.js'); ?>
<?php echo $this->Html->script('kenny/app.js'); ?>