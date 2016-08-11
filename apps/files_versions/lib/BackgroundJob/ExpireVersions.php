<?php
/**
 * @author Jörn Friedrich Dreyer <jfd@butonic.de>
 * @author Joas Schilling <coding@schilljs.com>
 * @author Victor Dubiniuk <dubiniuk@owncloud.com>
 *
 * @copyright Copyright (c) 2016, ownCloud GmbH.
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

namespace OCA\Files_Versions\BackgroundJob;

use OCP\IConfig;
use OCP\IUserManager;
use OCA\Files_Versions\AppInfo\Application;
use OCA\Files_Versions\Storage;
use OCA\Files_Versions\Expiration;

class ExpireVersions extends \OC\BackgroundJob\TimedJob {

	/**
	 * @var Expiration
	 */
	private $expiration;

	/**
	 * @var IConfig
	 */
	private $config;

	/**
	 * @var IUserManager
	 */
	private $userManager;

	const USERS_PER_SESSION = 1000;

	public function __construct(IConfig $config = null,
								IUserManager $userManager = null,
								Expiration $expiration = null) {
		// Run once per 30 minutes
		$this->setInterval(60 * 30);

		if (is_null($expiration) || is_null($userManager) || is_null($config)) {
			$this->fixDIForJobs();
		} else {
			$this->config = $config;
			$this->expiration = $expiration;
			$this->userManager = $userManager;
		}
	}

	protected function fixDIForJobs() {
		$application = new Application();
		$this->config = \OC::$server->getConfig();
		$this->expiration = $application->getContainer()->query('Expiration');
		$this->userManager = \OC::$server->getUserManager();
	}

	protected function run($argument) {
		$maxAge = $this->expiration->getMaxAgeAsTimestamp();
		if (!$maxAge) {
			return;
		}

		\OC::$server->getDatabaseConnection()->beginTransaction();
		// get current offset
		$offset = (int)$this->config->getAppValue('files_versions', 'cronjob_user_offset', 0);
		// check if there is at least one user at this offset
		$users = $this->userManager->search('', 1, $offset);
		if (!count($users)) {
			// no users found, reset offset to start at the beginning
			$offset = 0;
		}
		// move offset for next run
		$this->config->setAppValue('files_versions', 'cronjob_user_offset', $offset + self::USERS_PER_SESSION);
		\OC::$server->getDatabaseConnection()->commit();

		$users = $this->userManager->search('', self::USERS_PER_SESSION, $offset);

		foreach ($users as $user) {
			$uid = $user->getUID();
			if ($user->getLastLogin() === 0 || !$this->setupFS($uid)) {
				continue;
			}
			Storage::expireOlderThanMaxForUser($uid);
		}

		\OC_Util::tearDownFS();
	}

	/**
	 * Act on behalf on trash item owner
	 * @param string $user
	 * @return boolean
	 */
	protected function setupFS($user) {
		\OC_Util::tearDownFS();
		if (\OC_Util::setupFS($user)) {
			// Check if this user has a versions directory
			$view = new \OC\Files\View('/' . $user);
			if (!$view->is_dir('/files_versions')) {
				return false;
			}
		}

		return true;
	}
}
