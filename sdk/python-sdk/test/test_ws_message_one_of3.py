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

from kraken_sdk.models.ws_message_one_of3 import WsMessageOneOf3

class TestWsMessageOneOf3(unittest.TestCase):
    """WsMessageOneOf3 unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> WsMessageOneOf3:
        """Test WsMessageOneOf3
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `WsMessageOneOf3`
        """
        model = WsMessageOneOf3()
        if include_optional:
            return WsMessageOneOf3(
                search_uuid = '',
                finished_successful = True,
                type = 'SearchFinished'
            )
        else:
            return WsMessageOneOf3(
                search_uuid = '',
                finished_successful = True,
                type = 'SearchFinished',
        )
        """

    def testWsMessageOneOf3(self):
        """Test WsMessageOneOf3"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()