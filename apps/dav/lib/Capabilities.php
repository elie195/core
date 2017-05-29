<?php
/**
 * @author Thomas Müller <thomas.mueller@tmit.eu>
 *
<<<<<<< HEAD:apps/dav/lib/Capabilities.php
 * @copyright Copyright (c) 2016, ownCloud GmbH
=======
 * @copyright Copyright (c) 2017, ownCloud GmbH
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e:apps/dav/lib/Capabilities.php
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


namespace OCA\DAV;

use OCP\Capabilities\ICapability;

class Capabilities implements ICapability {

	public function getCapabilities() {
		return [
			'dav' => [
				'chunking' => '1.0',
			]
		];
	}
}
