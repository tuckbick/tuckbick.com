<?php
$this->start('css');
echo $this->Html->css('resume', null, array('media' => 'screen'));
echo $this->Html->css('resume-print', null, array('media' => 'print'));
$this->end();
?>
<div class="page">

	<header class="row">
		<h1>Tucker Truax Bickler</h1>
		<ul class="contact">
			<li><?php echo $this->Html->link('tuckersworld@gmail.com', 'mailto:tuckersworld@gmail.com', array('title' => 'Send me an email')) ?></li>
			<li><?php echo $this->Html->link('github.com/tuckbick', 'http://github.com/tuckbick', array('title' => 'GitHub - tuckbick')) ?></li>
			<li><?php echo $this->Html->link('linkedin.com/in/tuckerbickler', 'http://www.linkedin.com/in/tuckerbickler', array('title' => 'LinkedIn - Tucker Truax Bickler')) ?></li>
			<li><?php echo $this->Html->link('tuckbick.com', 'http://tuckbick.com', array('title' => 'tuckbick.com')) ?></li>
			<li><?php echo $this->Html->link('@tuckbick', 'http://twitter.com/tuckbick', array('title' => 'Twitter - @tuckbick')) ?></li>
		</ul>
	</header>

	<div class="row">

		<section class="col kittehs">
			<img class="kitteh" src="http://placekitten.com/167/200" />
			<img class="kitteh" src="http://placekitten.com/130/125" />
			<img class="kitteh" src="http://placekitten.com/145/167" />
			<img class="kitteh" src="http://placekitten.com/167/300" />
		</section>

		<section class="col content">

			<article class="area">
				<h2>Objective</h2>
				<div class="info">
					<p>To  acquire  full time employment involving  enterprise  frontend  development  and  design</p>
				</div>
			</article>

			<article class="area">
				<h2>Experience</h2>
				<div class="info">
					<div class="slice">
						<p><strong><a href="http://optaros.com">Optaros, Inc.</a></strong>, 2011 - Present </br>
							<em>Associate UX Consultant</em></p>
					</div>
					<div class="slice">
						<p><strong><a href="http://ctl.utexas.edu/">Center for Teaching and Learning</a>, at UT</strong>, 2008 - 2011 </br>
							<em>Web Developer</em></p>
						<p>I built web based tools for use by students, professors, and graduate students.
							Daily tasks involved interfacing with clients and coworkers, blueprinting frontend
							and backend website architectures, and writing code.</p>
					</div>
					<div class="slice">
						<p><strong><a href="http://technology.misd.org/">Montgomery Independent School District</a></strong>, 2007 - 2008 </br>
							<em>Computer/Network Technician</em></p>
						<p>I  helped maintain hundreds  of  student  and  teacher  computers  and  computer  networks  at  8
							district locations,  performing  required  installations,  upgrades, and
							configurations,  while overseeing the activities of other technicians.</p>
					</div>
				</div>
			</article>

			<article class="area">
				<h2>Education</h2>
				<div class="info">
					<div class="slice">
						<p><strong><a href="http://www.utexas.edu/">The University of Texas at Austin</a></strong>, Class of 2011 </br>
							<em><a href="http://www.cs.utexas.edu/">Bachelor of Science in Computer Science</a></em></p>
						<p>Relevant coursework: <a href="http://www.cs.utexas.edu/~moore/">Logic, Sets, and Functions</a>, Algorithms and Data Structures,
						<a href="http://www.cs.utexas.edu/~risto/">Computational Intelligence in Game Design (AI/Neural Networks)</a>,
						<a href="http://www.cs.utexas.edu/users/plaxton/">Design and Analysis   of Algorithms</a>, <a href="www.cs.utexas.edu/~downing">Software Engineering</a>,
						Applied Linear Algebra, and <a href="http://www.ma.utexas.edu/users/goddardb/home.html">Number Theory</a>.</p>
					</div>
					<div class="slice">
						<p><strong><a href="http://www.misd.org/sites/MHS">Montgomery High School</a></strong>, Class of 2007 </br>
							<em><a href="http://www.montgomerytexas.com/history/">Montgomery, Texas</a></em></p>
					</div>
				</div>
			</article>

			<article class="area">
				<h2>Skills</h2>
				<div class="info">
					<div class="slice">
						<p>HTML5, HTML4, DOM, JSON </br>
							WebSockets, Canvas, Geolocation, File API</p>
						<p>CSS3, CSS </br>
							Media Queries, SASS, Compass</p>
						<p>JavaScript </br>
							<code>(function(){}).prototype</code>, Backbone.js, RequireJS, jQuery, jQuery Mobile</p>
						<p>NodeJS </br>
							Express, SocketIO, BinaryJS, Grunt, NPM</p>
						<p>PHP </br>
							Wordpress, Drupal, CakePHP, Magento, SilverStripe</p>
						<p>Python </br>
							Django, Google App Engine</p>
						<p><em>other</em></br>
							SQL, YQL, phpMyAdmin, REST, Java, iOS (iPad, iPhone), Android, C, C++</p>
						<p><em>software</em></br>
							Sublime Text, PyCharm, Eclipse, OmniGraffle, Photoshop, Illustrator, MS Office Suite, Final Cut Pro</p>
					</div>
				</div>
			</article>

		</section>

	</div>

</div>