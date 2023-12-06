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

from kraken_sdk.models.ws_message_one_of7 import WsMessageOneOf7

class TestWsMessageOneOf7(unittest.TestCase):
    """WsMessageOneOf7 unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> WsMessageOneOf7:
        """Test WsMessageOneOf7
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `WsMessageOneOf7`
        """
        model = WsMessageOneOf7()
        if include_optional:
            return WsMessageOneOf7(
                attack_uuid = '',
                address = '',
                port = 0,
                type = 'ScanTcpPortsResult'
            )
        else:
            return WsMessageOneOf7(
                attack_uuid = '',
                address = '',
                port = 0,
                type = 'ScanTcpPortsResult',
        )
        """

    def testWsMessageOneOf7(self):
        """Test WsMessageOneOf7"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()