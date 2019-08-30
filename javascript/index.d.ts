/**
 * A placeholder, currently holds no information. Use BotFather to set up 
 * your game.
 */
export interface CallbackGame {}

/**
 * This object represents the contents of a file to be uploaded. Must be 
 * posted using multipart/form-data in the usual way that files are 
 * uploaded via the browser.
 */
export interface InputFile {}

/**
 * Contains information about Telegram Passport data shared with the bot by 
 * the user.
 */
export interface PassportData {
  /**
  
   */
  data: EncryptedPassportElement[];

  /**
  
   */
  credentials: EncryptedCredentials;
}

/**

 */
export interface EncryptedPassportElement {}

/**
 * Contains data required for decrypting and authenticating 
 * EncryptedPassportElement. See the Telegram Passport Documentation for a 
 * complete description of the data decryption and authentication processes.
 */
export interface EncryptedCredentials {}