@api
Feature: sharing
As an admin
I want to be able to disable sharing functionality 
So that ownCloud users cannot share file or folder

	Background:
		And using old DAV path
		And user "user0" has been created
		And user "user1" has been created

	Scenario Outline: user tries to share a file with another user when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to share file "welcome.txt" with user "user1" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to share a folder with another user when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to share folder "/FOLDER" with user "user1" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to share a file with group when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user1" has been added to group "sharinggroup"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to share file "welcome.txt" with group "sharinggroup" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to share a folder with group when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user1" has been added to group "sharinggroup"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to share folder "/FOLDER" with group "sharinggroup" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to create public share of a file when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to create public share of file "welcome.txt" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to create public share of a folder when the sharing api has been disabled
		Given using API version "<ocs_api_version>"
		When parameter "shareapi_enabled" of app "core" has been set to "no"
		Then user "user0" should not be able to create public share of folder "/FOLDER" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user tries to share a file with user who is not in his group when sharing outside the group has been restricted
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user0" has been added to group "sharinggroup"
		When parameter "shareapi_only_share_with_group_members" of app "core" has been set to "yes"
		Then user "user0" should not be able to share file "welcome.txt" with user "user1" using the API
		And the OCS status code should be "403"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |403             |

	Scenario Outline: user shares a file with user who is in his group when sharing outside the group has been restricted
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user0" has been added to group "sharinggroup"
		And user "user1" has been added to group "sharinggroup"
		When parameter "shareapi_only_share_with_group_members" of app "core" has been set to "yes"
		Then user "user0" should be able to share file "welcome.txt" with user "user1" using the API
		And the OCS status code should be "<ocs_status_code>"
		And the HTTP status code should be "200"
		Examples:
			|ocs_api_version|ocs_status_code|
			|1              |100            |
			|2              |200            |

	Scenario Outline: user shares a file with the group he is not member of when sharing outside the group has been restricted
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And group "anothersharinggroup" has been created
		And user "user0" has been added to group "sharinggroup"
		And user "user1" has been added to group "anothersharinggroup"
		When parameter "shareapi_only_share_with_group_members" of app "core" has been set to "yes"
		Then user "user0" should be able to share file "welcome.txt" with group "anothersharinggroup" using the API
		And the OCS status code should be "<ocs_status_code>"
		And the HTTP status code should be "200"
		Examples:
			|ocs_api_version|ocs_status_code|
			|1              |100            |
			|2              |200            |

	Scenario Outline: user who is not a member of a group tries to share a file in the group when group sharing has been disabled
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user1" has been added to group "sharinggroup"
		When parameter "shareapi_allow_group_sharing" of app "core" has been set to "no"
		Then user "user0" should not be able to share file "welcome.txt" with group "sharinggroup" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |

	Scenario Outline: user who is a member of a group tries to share a file in the group when group sharing has been disabled
		Given using API version "<ocs_api_version>"
		And group "sharinggroup" has been created
		And user "user0" has been added to group "sharinggroup"
		And user "user1" has been added to group "sharinggroup"
		When parameter "shareapi_allow_group_sharing" of app "core" has been set to "no"
		Then user "user0" should not be able to share file "welcome.txt" with group "sharinggroup" using the API
		And the OCS status code should be "404"
		And the HTTP status code should be "<http_status_code>"
		Examples:
			|ocs_api_version|http_status_code|
			|1              |200             |
			|2              |404             |