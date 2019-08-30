#[macro_use]
extern crate serde_derive;
extern crate serde;

/// A placeholder, currently holds no information. Use BotFather to set up
/// your game.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CallbackGame {
  
}

/// This object represents the contents of a file to be uploaded. Must be
/// posted using multipart/form-data in the usual way that files are
/// uploaded via the browser.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InputFile {
  
}

/// Contains information about Telegram Passport data shared with the bot by
/// the user.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PassportData {
  
  pub data: Vec<Box<EncryptedPassportElement>>,

  
  pub credentials: Box<EncryptedCredentials>,
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct EncryptedPassportElement {
  
}

/// Contains data required for decrypting and authenticating
/// EncryptedPassportElement. See the Telegram Passport Documentation for a
/// complete description of the data decryption and authentication processes.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct EncryptedCredentials {
  
}
