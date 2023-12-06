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

from kraken_sdk.models.get_all_leeches_response import GetAllLeechesResponse

class TestGetAllLeechesResponse(unittest.TestCase):
    """GetAllLeechesResponse unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> GetAllLeechesResponse:
        """Test GetAllLeechesResponse
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `GetAllLeechesResponse`
        """
        model = GetAllLeechesResponse()
        if include_optional:
            return GetAllLeechesResponse(
                leeches = [
                    kraken_sdk.models.simple_leech.SimpleLeech(
                        uuid = '', 
                        name = 'leech-01', 
                        address = 'https://10.13.37.1:8081', )
                    ]
            )
        else:
            return GetAllLeechesResponse(
                leeches = [
                    kraken_sdk.models.simple_leech.SimpleLeech(
                        uuid = '', 
                        name = 'leech-01', 
                        address = 'https://10.13.37.1:8081', )
                    ],
        )
        """

    def testGetAllLeechesResponse(self):
        """Test GetAllLeechesResponse"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()