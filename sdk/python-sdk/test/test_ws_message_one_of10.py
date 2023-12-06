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

from kraken_sdk.models.ws_message_one_of10 import WsMessageOneOf10

class TestWsMessageOneOf10(unittest.TestCase):
    """WsMessageOneOf10 unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> WsMessageOneOf10:
        """Test WsMessageOneOf10
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `WsMessageOneOf10`
        """
        model = WsMessageOneOf10()
        if include_optional:
            return WsMessageOneOf10(
                attack_uuid = '',
                source = '',
                destination = '',
                type = 'DnsResolutionResult'
            )
        else:
            return WsMessageOneOf10(
                attack_uuid = '',
                source = '',
                destination = '',
                type = 'DnsResolutionResult',
        )
        """

    def testWsMessageOneOf10(self):
        """Test WsMessageOneOf10"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()