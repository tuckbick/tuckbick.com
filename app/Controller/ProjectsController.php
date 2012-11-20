<?php
App::uses('AppController', 'Controller');
/**
 * Projects Controller
 *
 */
class ProjectsController extends AppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public $scaffold;

	public $helpers = array('Html', 'Form');

	public function index() {
		$this->set('posts', $this->Post->find('all'));
	}

}
