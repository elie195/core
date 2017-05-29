<?php
<<<<<<< HEAD

=======
/**
 * @author Philipp Schaffrath <github@philippschaffrath.de>
 * @author Philipp Schaffrath <github@philipp.schaffrath.email>
 *
 * @copyright Copyright (c) 2017, ownCloud GmbH
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
namespace OC\Theme;

class Theme {

	/**
	 * @var string
	 */
	private $name;

	/**
	 * @var string
	 */
	private $directory;

	/**
	 * Theme constructor.
	 *
	 * @param string $name
	 * @param string $directory
	 */
	public function __construct($name = '', $directory = '') {
		$this->name = $name;
		$this->directory = $directory;
	}

	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
<<<<<<< HEAD
=======
	 * @param $name
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
	 * @return string
	 */
	public function getDirectory() {
		return $this->directory;
	}

	/**
	 * @param string $directory
	 */
	public function setDirectory($directory) {
		$this->directory = $directory;
	}
}
