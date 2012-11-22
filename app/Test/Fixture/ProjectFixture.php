<?php
/**
 * ProjectFixture
 *
 */
class ProjectFixture extends CakeTestFixture {

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => null, 'length' => 10, 'key' => 'primary'),
		'title' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 200, 'collate' => 'utf8_unicode_ci', 'charset' => 'utf8'),
		'demo_url' => array('type' => 'string', 'null' => false, 'default' => null, 'length' => 200, 'collate' => 'utf8_unicode_ci', 'charset' => 'utf8'),
		'src_url' => array('type' => 'string', 'null' => false, 'default' => null, 'length' => 200, 'collate' => 'utf8_unicode_ci', 'charset' => 'utf8'),
		'body' => array('type' => 'text', 'null' => true, 'default' => null, 'collate' => 'utf8_unicode_ci', 'charset' => 'utf8'),
		'created' => array('type' => 'datetime', 'null' => true, 'default' => null),
		'modified' => array('type' => 'datetime', 'null' => true, 'default' => null),
		'indexes' => array(
			'PRIMARY' => array('column' => 'id', 'unique' => 1)
		),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_unicode_ci', 'engine' => 'MyISAM')
	);

/**
 * Records
 *
 * @var array
 */
	public $records = array(
		array(
			'id' => '1',
			'title' => 'Listr',
			'demo_url' => 'http://sharp-light-9215.herokuapp.com/',
			'src_url' => 'https://github.com/tuckbick/Listr',
			'body' => 'A simple tool for creating lists on-the-go.',
			'created' => '2012-11-21 00:43:32',
			'modified' => '2012-11-21 19:02:07'
		),
		array(
			'id' => '2',
			'title' => 'Pool',
			'demo_url' => 'http://localhost:3000/',
			'src_url' => 'https://github.com/tuckbick/Pool',
			'body' => 'Share photos with your friends! Live!',
			'created' => '2012-11-21 19:01:40',
			'modified' => '2012-11-21 19:01:40'
		),
	);

}
