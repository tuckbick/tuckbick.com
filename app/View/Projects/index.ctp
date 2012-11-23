<?php $this->start('css');
echo $this->Html->css('projects', null, array('media' => 'all'));
$this->end() ?>

<?php $this->start('script') ?>
<script>
	
	function makeBlock(dim, x, y) {
		var el = document.createElement('div');
		el.className = 'b c' + Math.floor(Math.random() * 4);
		
		el.style.left = x + 'px';
		el.style.top = y + 'px';
		el.style.width = el.style.height = dim + 'px';

		return el;
	}

	function Map() {
		var self = this;

		self.el = document.getElementById('bg');

		self.blocks = [];
		self.widthUnits = 50;
		self.reset();
	}

	Map.prototype.addBlock = function() {
		var self = this;

		var x = Math.floor(Math.random() * self.widthUnits) * self.blockSize
		  , y = Math.floor(Math.random() * self.heightUnits) * self.blockSize
		  , b = makeBlock(self.blockSize, x, y);

		self.blocks.push(b);
		self.el.appendChild(b);
	}

	Map.prototype.reset = function() {
		var self = this;

		for (var i = 0; i < self.blocks.length; i += 1) {
			self.el.removeChild(self.blocks[i]);
			delete self.blocks[i];
		}
		self.blocks = [];

		self.width = $(document).width();
		self.height = $(document).height();

		self.blockSize = self.width / self.widthUnits;
		self.heightUnits = self.height / self.blockSize;
	}

	Map.prototype.draw = function(density) {
		var self = this;
		density = Math.max(0, density);
		self.reset();
		var num = ((self.width * self.height) * density) / (self.blockSize*self.blockSize);

		for (var i = 0; i < num; i += 1) {
			self.addBlock();
		}
	}

	var map = new Map();
	map.draw(0.0125);

	window.onresize = (function() {
		var marker;
		return function() {
			clearTimeout(marker);
			marker = setTimeout(function() {
				map.draw(0.0125);
			}, 200);
		}
	})();


</script>
<?php $this->end() ?>

<div id="bg">&nbsp;</div>
<div class="wrapper">
	<h2 class="page-title"><?php echo __('Projects'); ?></h2>
	<ul id="project-list">
	<?php
	foreach ($projects as $project): ?>
		<li>
			<div class="project">
				<h3 class="project-title"><?php echo h($project['Project']['title']); ?></h3>
				<ul class="links row">
					<li><i>&#9732;</i>&nbsp;<?php echo $this->Html->link('Demo', $project['Project']['demo_url'], array('title' => 'See a Demo')) ?></li>
					<li><i>&#9774;</i>&nbsp;<?php echo $this->Html->link('Source', $project['Project']['src_url'], array('title' => 'Browse the Source')) ?></li>
				</ul>
				<p class="body row"><?php echo h($project['Project']['body']); ?></p>
			</div>
		</li>
	<?php endforeach; ?>
	</ul>
</div>