<?php

namespace Test\Theme;

use OC\Theme\Theme;

class ThemeTest extends \PHPUnit\Framework\TestCase {

	/**
	 * @var Theme
	 */
	private $sut;

	protected function setUp() {
		$this->sut = new Theme();
		parent::setUp();
	}

	public function testConstructorSetsNameAndDirectory() {
		$this->assertEmpty($this->sut->getName());
		$this->assertEmpty($this->sut->getDirectory());
		$this->sut = new Theme('name', 'directory/directory');
		$this->assertEquals('name', $this->sut->getName());
		$this->assertEquals('directory/directory', $this->sut->getDirectory());
	}

	public function testDirectoryCanBeSet() {
		$this->assertEmpty($this->sut->getDirectory());
		$this->sut->setDirectory('test/directory');
		$this->assertEquals('test/directory', $this->sut->getDirectory());
	}
<<<<<<< HEAD
=======

	public function testNameCanBeSet() {
		$this->assertEmpty($this->sut->getName());
		$this->sut->setName('some-name');
		$this->assertEquals('some-name', $this->sut->getName());
	}
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
}
