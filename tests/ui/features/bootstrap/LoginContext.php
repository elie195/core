<?php
/**
* ownCloud
*
* @author Artur Neumann
* @copyright 2017 Artur Neumann info@individual-it.net
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
* License as published by the Free Software Foundation; either
* version 3 of the License, or any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU AFFERO GENERAL PUBLIC LICENSE for more details.
*
* You should have received a copy of the GNU Affero General Public
* License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*
*/

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\MinkExtension\Context\RawMinkContext;

use Page\LoginPage;

require_once 'bootstrap.php';

/**
 * Login context.
 */
class LoginContext extends RawMinkContext implements Context
{
	private $loginPage;
	private $filesPage;
	private $featureContext;

	public function __construct(LoginPage $loginPage)
	{
		$this->loginPage = $loginPage;
	}

	/**
	 * @Given I am on the login page
	 */
	public function iAmOnTheLoginPage()
	{
		$this->loginPage->open();
	}

	/**
	 * @When I login with username :username and password :password
	 */
	public function iLoginWithUsernameAndPassword($username, $password)
	{
		$this->filesPage = $this->loginPage->loginAs($username, $password);
		$this->filesPage->waitTillPageIsloaded(10);
	}

	/**
	 * @When I login as a regular user with a correct password
	 */
	public function iLoginAsARegularUserWithACorrectPassword()
	{
		$this->filesPage = $this->loginPage->loginAs(
			$this->featureContext->getRegularUserName(),
			$this->featureContext->getRegularUserPassword());
		$this->filesPage->waitTillPageIsloaded(10);
	}

	/** @BeforeScenario
	* This will run before EVERY scenario. It will set the properties for this object.
	*/
	public function before(BeforeScenarioScope $scope)
	{
		// Get the environment
		$environment = $scope->getEnvironment();
		// Get all the contexts you need in this context
		$this->featureContext = $environment->getContext('FeatureContext');
	}
}
