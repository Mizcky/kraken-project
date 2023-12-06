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

from kraken_sdk.api.workspace_tags_api import WorkspaceTagsApi


class TestWorkspaceTagsApi(unittest.TestCase):
    """WorkspaceTagsApi unit test stubs"""

    def setUp(self) -> None:
        self.api = WorkspaceTagsApi()

    def tearDown(self) -> None:
        pass

    def test_create_workspace_tag(self) -> None:
        """Test case for create_workspace_tag

        Create a workspace tag.
        """
        pass

    def test_delete_workspace_tag(self) -> None:
        """Test case for delete_workspace_tag

        Delete a workspace tag
        """
        pass

    def test_get_all_workspace_tags(self) -> None:
        """Test case for get_all_workspace_tags

        Retrieve all workspace tags
        """
        pass

    def test_update_workspace_tag(self) -> None:
        """Test case for update_workspace_tag

        Update a workspace tag
        """
        pass


if __name__ == '__main__':
    unittest.main()