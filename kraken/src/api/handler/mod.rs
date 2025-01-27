use std::fmt::{Display, Formatter};
use std::sync::TryLockError;

use actix_toolbox::tb_middleware::{actix_session, Session};
use actix_web::body::BoxBody;
use actix_web::HttpResponse;
use log::{debug, error, info, trace, warn};
use rorm::executor::Executor;
use rorm::{query, Model};
use serde::{Deserialize, Deserializer, Serialize};
use serde_repr::Serialize_repr;
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;
use webauthn_rs::prelude::WebauthnError;

pub(crate) use crate::api::handler::attacks::*;
pub(crate) use crate::api::handler::auth::*;
pub(crate) use crate::api::handler::leeches::*;
pub(crate) use crate::api::handler::reporting::*;
pub(crate) use crate::api::handler::users::*;
pub(crate) use crate::api::handler::websocket::*;
pub(crate) use crate::api::handler::workspaces::*;
use crate::models::User;
use crate::modules::user::create::CreateUserError;

mod attacks;
mod auth;
mod leeches;
mod reporting;
mod users;
mod websocket;
mod workspaces;

/// Query the current user's model
pub(crate) async fn query_user(db: impl Executor<'_>, session: &Session) -> ApiResult<User> {
    let uuid: Uuid = session.get("uuid")?.ok_or(ApiError::SessionCorrupt)?;
    query!(db, User)
        .condition(User::F.uuid.equals(uuid.as_ref()))
        .optional()
        .await?
        .ok_or(ApiError::SessionCorrupt)
}

/// A common response that contains a single uuid
#[derive(Serialize, ToSchema)]
pub struct UuidResponse {
    pub(crate) uuid: Uuid,
}

/// A path with an UUID
#[derive(Deserialize, IntoParams)]
pub struct PathUuid {
    pub(crate) uuid: Uuid,
}

/// The result type of kraken.
pub type ApiResult<T> = Result<T, ApiError>;

/// This type holds all possible error types that can be returned by the API.
///
/// Numbers between 1000 and 1999 (inclusive) are client errors that can be handled by the client.
/// Numbers between 2000 and 2999 (inclusive) are server errors.
#[derive(Serialize_repr, ToSchema)]
#[repr(u16)]
#[schema(default = 1000, example = 1000)]
pub enum ApiStatusCode {
    LoginFailed = 1000,
    NotFound = 1001,
    InvalidContentType = 1002,
    InvalidJson = 1003,
    PayloadOverflow = 1004,
    Unauthenticated = 1005,
    Missing2fa = 1006,
    MissingPrivileges = 1007,
    NoSecurityKeyAvailable = 1008,
    UserAlreadyExists = 1009,
    InvalidUsername = 1010,
    InvalidAddress = 1011,
    AddressAlreadyExists = 1012,
    NameAlreadyExists = 1013,
    InvalidUuid = 1014,
    WorkspaceNotDeletable = 1015,
    EmptyJson = 1016,
    InvalidPassword = 1017,
    InvalidLeech = 1018,
    UsernameAlreadyOccupied = 1019,
    InvalidName = 1020,

    InternalServerError = 2000,
    DatabaseError = 2001,
    SessionError = 2002,
    WebauthnError = 2003,
    DehashedNotAvailable = 2004,
}

/// Representation of an error response
///
/// `status_code` holds the error code, `message` a human readable description of the error
#[derive(Serialize, ToSchema)]
pub(crate) struct ApiErrorResponse {
    status_code: ApiStatusCode,
    #[schema(example = "Error message will be here")]
    message: String,
}

impl ApiErrorResponse {
    pub(crate) fn new(status_code: ApiStatusCode, message: String) -> Self {
        Self {
            status_code,
            message,
        }
    }
}

/// All available errors that can occur while using the API.
#[derive(Debug)]
pub enum ApiError {
    LoginFailed,
    NotFound,
    InvalidContentType,
    InvalidJson(serde_json::Error),
    PayloadOverflow(String),
    InternalServerError,
    DatabaseError(rorm::Error),
    InvalidHash(argon2::password_hash::Error),
    SessionInsert(actix_session::SessionInsertError),
    SessionGet(actix_session::SessionGetError),
    Unauthenticated,
    Missing2FA,
    SessionCorrupt,
    MissingPrivileges,
    NoSecurityKeyAvailable,
    Webauthn(WebauthnError),
    UserAlreadyExists,
    InvalidUsername,
    InvalidAddress,
    AddressAlreadyExists,
    NameAlreadyExists,
    InvalidUuid,
    WorkspaceNotDeletable,
    EmptyJson,
    InvalidPassword,
    InvalidLeech,
    UsernameAlreadyOccupied,
    InvalidName,
    DehashedNotAvailable,
}

impl Display for ApiError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ApiError::LoginFailed => write!(f, "Login failed"),
            ApiError::DatabaseError(_) => write!(f, "Database error occurred"),
            ApiError::InvalidHash(_) | ApiError::InternalServerError => {
                write!(f, "Internal server error")
            }
            ApiError::SessionInsert(_) | ApiError::SessionGet(_) => {
                write!(f, "Session error occurred")
            }
            ApiError::NotFound => write!(f, "Not found"),
            ApiError::InvalidContentType => write!(f, "Content type error"),
            ApiError::InvalidJson(err) => write!(f, "Json error: {err}"),
            ApiError::PayloadOverflow(err) => write!(f, "{err}"),
            ApiError::Unauthenticated => write!(f, "Unauthenticated"),
            ApiError::Missing2FA => write!(f, "2FA is missing"),
            ApiError::SessionCorrupt => write!(f, "Corrupt session"),
            ApiError::MissingPrivileges => write!(f, "You are missing privileges"),
            ApiError::NoSecurityKeyAvailable => write!(f, "No security key available"),
            ApiError::Webauthn(_) => write!(f, "Webauthn error"),
            ApiError::UserAlreadyExists => write!(f, "User does already exist"),
            ApiError::InvalidUsername => write!(f, "Invalid username"),
            ApiError::InvalidAddress => write!(f, "Invalid address"),
            ApiError::AddressAlreadyExists => write!(f, "Address already exists"),
            ApiError::NameAlreadyExists => write!(f, "Name already exists"),
            ApiError::InvalidUuid => write!(f, "Invalid UUID"),
            ApiError::WorkspaceNotDeletable => write!(f, "Workspace is not deletable"),
            ApiError::EmptyJson => write!(f, "Received an empty json request"),
            ApiError::InvalidPassword => write!(f, "Invalid password supplied"),
            ApiError::InvalidLeech => write!(f, "Invalid leech"),
            ApiError::UsernameAlreadyOccupied => write!(f, "Username is already occupied"),
            ApiError::InvalidName => write!(f, "Invalid name specified"),
            ApiError::DehashedNotAvailable => write!(f, "Dehashed is not available"),
        }
    }
}

impl actix_web::ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse<BoxBody> {
        match self {
            ApiError::LoginFailed => {
                trace!("Login failed");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::LoginFailed,
                    self.to_string(),
                ))
            }
            ApiError::DatabaseError(err) => {
                error!("Database error occurred: {err}");

                HttpResponse::InternalServerError().json(ApiErrorResponse::new(
                    ApiStatusCode::DatabaseError,
                    self.to_string(),
                ))
            }
            ApiError::InvalidHash(err) => {
                error!("Got invalid password hash from db: {err}");

                HttpResponse::InternalServerError().json(ApiErrorResponse::new(
                    ApiStatusCode::InternalServerError,
                    self.to_string(),
                ))
            }
            ApiError::SessionInsert(err) => {
                error!("Session insert error: {err}");

                HttpResponse::InternalServerError().json(ApiErrorResponse::new(
                    ApiStatusCode::SessionError,
                    self.to_string(),
                ))
            }
            ApiError::SessionGet(err) => {
                error!("Session get error: {err}");

                HttpResponse::InternalServerError().json(ApiErrorResponse::new(
                    ApiStatusCode::SessionError,
                    self.to_string(),
                ))
            }
            ApiError::NotFound => HttpResponse::NotFound().json(ApiErrorResponse::new(
                ApiStatusCode::NotFound,
                self.to_string(),
            )),
            ApiError::InvalidContentType => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::InvalidContentType,
                self.to_string(),
            )),
            ApiError::InvalidJson(err) => {
                debug!("Received invalid json: {err}");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::InvalidJson,
                    self.to_string(),
                ))
            }
            ApiError::InternalServerError => HttpResponse::InternalServerError().json(
                ApiErrorResponse::new(ApiStatusCode::InternalServerError, self.to_string()),
            ),
            ApiError::PayloadOverflow(err) => {
                debug!("Payload overflow: {err}");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::PayloadOverflow,
                    self.to_string(),
                ))
            }
            ApiError::Unauthenticated => {
                trace!("Unauthenticated");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::Unauthenticated,
                    self.to_string(),
                ))
            }
            ApiError::Missing2FA => {
                trace!("Missing 2fa");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::Missing2fa,
                    self.to_string(),
                ))
            }
            ApiError::SessionCorrupt => {
                warn!("Corrupt session");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::SessionError,
                    self.to_string(),
                ))
            }
            ApiError::MissingPrivileges => {
                trace!("Missing privileges");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::MissingPrivileges,
                    self.to_string(),
                ))
            }
            ApiError::NoSecurityKeyAvailable => {
                debug!("Missing security key");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::NoSecurityKeyAvailable,
                    self.to_string(),
                ))
            }
            ApiError::Webauthn(err) => {
                info!("Webauthn error: {err}");

                HttpResponse::InternalServerError().json(ApiErrorResponse::new(
                    ApiStatusCode::WebauthnError,
                    self.to_string(),
                ))
            }
            ApiError::UserAlreadyExists => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::UserAlreadyExists,
                self.to_string(),
            )),
            ApiError::InvalidUsername => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::InvalidUsername,
                self.to_string(),
            )),
            ApiError::InvalidAddress => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::InvalidAddress,
                self.to_string(),
            )),
            ApiError::AddressAlreadyExists => HttpResponse::BadRequest().json(
                ApiErrorResponse::new(ApiStatusCode::AddressAlreadyExists, self.to_string()),
            ),
            ApiError::NameAlreadyExists => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::NameAlreadyExists,
                self.to_string(),
            )),
            ApiError::InvalidUuid => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::InvalidUuid,
                self.to_string(),
            )),
            ApiError::WorkspaceNotDeletable => HttpResponse::BadRequest().json(
                ApiErrorResponse::new(ApiStatusCode::WorkspaceNotDeletable, self.to_string()),
            ),
            ApiError::EmptyJson => {
                trace!("Received an empty json");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::EmptyJson,
                    self.to_string(),
                ))
            }
            ApiError::InvalidPassword => {
                debug!("Invalid password supplied");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::InvalidPassword,
                    self.to_string(),
                ))
            }
            ApiError::InvalidLeech => {
                debug!("Invalid leech id");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::InvalidLeech,
                    self.to_string(),
                ))
            }
            ApiError::UsernameAlreadyOccupied => {
                debug!("Username already occupied");

                HttpResponse::BadRequest().json(ApiErrorResponse::new(
                    ApiStatusCode::UsernameAlreadyOccupied,
                    self.to_string(),
                ))
            }
            ApiError::InvalidName => HttpResponse::BadRequest().json(ApiErrorResponse::new(
                ApiStatusCode::InvalidName,
                self.to_string(),
            )),
            ApiError::DehashedNotAvailable => HttpResponse::InternalServerError().json(
                ApiErrorResponse::new(ApiStatusCode::DehashedNotAvailable, self.to_string()),
            ),
        }
    }
}

impl From<rorm::Error> for ApiError {
    fn from(value: rorm::Error) -> Self {
        Self::DatabaseError(value)
    }
}

impl From<argon2::password_hash::Error> for ApiError {
    fn from(value: argon2::password_hash::Error) -> Self {
        Self::InvalidHash(value)
    }
}

impl From<actix_session::SessionInsertError> for ApiError {
    fn from(value: actix_session::SessionInsertError) -> Self {
        Self::SessionInsert(value)
    }
}

impl From<actix_session::SessionGetError> for ApiError {
    fn from(value: actix_session::SessionGetError) -> Self {
        Self::SessionGet(value)
    }
}

impl From<WebauthnError> for ApiError {
    fn from(value: WebauthnError) -> Self {
        Self::Webauthn(value)
    }
}

impl From<CreateUserError> for ApiError {
    fn from(value: CreateUserError) -> Self {
        match value {
            CreateUserError::DatabaseError(err) => Self::DatabaseError(err),
            CreateUserError::UsernameAlreadyExists => Self::UserAlreadyExists,
            CreateUserError::HashError(err) => Self::InvalidHash(err),
        }
    }
}

impl<T> From<TryLockError<T>> for ApiError {
    fn from(_: TryLockError<T>) -> Self {
        Self::InternalServerError
    }
}

/// Custom serializer to enable the distinction of missing keys vs null values in JSON requests
///
/// # Example
/// ```rust
/// #[derive(Deserialize)]
///  pub(crate) struct UpdateRequest {
///     name: Option<String>,
///
///     #[serde(default)]
///     #[serde(deserialize_with = "crate::api::handler::de_optional")]
///     description: Option<Option<String>>,
/// }
/// ```
pub(crate) fn de_optional<'de, D, T>(d: D) -> Result<Option<Option<T>>, D::Error>
where
    D: Deserializer<'de>,
    T: Deserialize<'de>,
{
    Ok(Some(Option::deserialize(d)?))
}
