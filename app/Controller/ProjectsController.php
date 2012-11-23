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
		$this->layout = 'default';
		$this->set('projects', $this->Project->find('all'));
	}

	public function soundon() {
		$this->layout = false;
	}

}
