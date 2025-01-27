//!
//! This module holds all database related definitions of workspace related structs
//!

use rorm::fields::{BackRef, ForeignModel};
use rorm::{field, Model, Patch};
use uuid::Uuid;

use crate::models::{Attack, User};

/// A workspace member has the privileges to access and modify a workspace of another user
///
/// The owner of the workspace can add and remove members at any time
#[derive(Model)]
pub struct WorkspaceMember {
    /// Unique identifier of the workspace member
    #[rorm(id)]
    pub id: i64,

    /// The user to grant access
    #[rorm(on_delete = "Cascade", on_update = "Cascade")]
    pub member: ForeignModel<User>,

    /// The workspace to grant access to
    #[rorm(on_delete = "Cascade", on_update = "Cascade")]
    pub workspace: ForeignModel<Workspace>,

    /// The point in time the member was granted access to the workspace
    #[rorm(auto_create_time)]
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Patch)]
#[rorm(model = "WorkspaceMember")]
pub(crate) struct WorkspaceMemberInsert {
    pub(crate) member: ForeignModel<User>,
    pub(crate) workspace: ForeignModel<Workspace>,
}

/// Representation of a set of connected data.
///
/// Workspaces are owned by a user and can be shared with others.
#[derive(Model)]
pub struct Workspace {
    /// Unique identifier of the workspace
    #[rorm(primary_key)]
    pub uuid: Uuid,

    /// Name of the workspace
    #[rorm(max_length = 255)]
    pub name: String,

    /// Optional description of the workspace
    #[rorm(max_length = 65535)]
    pub description: Option<String>,

    /// The user that owns this workspace
    #[rorm(index)]
    pub owner: ForeignModel<User>,

    /// States, if the workspace can be deleted
    #[rorm(default = true)]
    pub deletable: bool,

    /// Timestamp when the workspace was created
    #[rorm(auto_create_time)]
    pub created_at: chrono::NaiveDateTime,

    /// The workspace's members
    pub members: BackRef<field!(WorkspaceMember::F.workspace)>,

    /// All attacks started in this workspace
    pub attacks: BackRef<field!(Attack::F.workspace)>,
}

#[derive(Patch)]
#[rorm(model = "Workspace")]
pub(crate) struct WorkspaceInsert {
    pub(crate) uuid: Uuid,
    pub(crate) name: String,
    pub(crate) description: Option<String>,
    pub(crate) owner: ForeignModel<User>,
    pub(crate) deletable: bool,
}
