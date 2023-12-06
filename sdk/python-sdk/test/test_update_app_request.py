# coding: utf-8

"""
    kraken

    The core component of kraken-project

    The version of the OpenAPI document: 0.1.0
    Contact: git@omikron.dev
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


import unittest
import datetime

from kraken_sdk.models.update_app_request import UpdateAppRequest

class TestUpdateAppRequest(unittest.TestCase):
    """UpdateAppRequest unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> UpdateAppRequest:
        """Test UpdateAppRequest
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `UpdateAppRequest`
        """
        model = UpdateAppRequest()
        if include_optional:
            return UpdateAppRequest(
                name = 'Trustworthy application',
                redirect_uri = 'http://127.0.0.1:8080'
            )
        else:
            return UpdateAppRequest(
        )
        """

    def testUpdateAppRequest(self):
        """Test UpdateAppRequest"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()