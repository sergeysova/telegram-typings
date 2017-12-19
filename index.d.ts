/**
 * This object represents an incoming update.At most one of the optional 
 * parameters can be present in any given update.
 */
export interface Update {}

/**
 * Contains information about the current status of a webhook.
 */
export interface WebhookInfo {}

/**
 * This object represents a Telegram user or bot.
 */
export interface User {}

/**
 * This object represents a chat.
 */
export interface Chat {}

/**
 * This object represents a message.
 */
export interface Message {}

/**
 * This object represents one special entity in a text message. For 
 * example, hashtags, usernames, URLs, etc. 
 */
export interface MessageEntity {}

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 */
export interface PhotoSize {}

/**
 * This object represents an audio file to be treated as music by the 
 * Telegram clients.
 */
export interface Audio {}

/**
 * This object represents a general file (as opposed to photos, voice 
 * messages and audio files).
 */
export interface Document {}

/**
 * This object represents a video file.
 */
export interface Video {}

/**
 * This object represents a voice note.
 */
export interface Voice {}

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 */
export interface VideoNote {}

/**
 * This object represents a phone contact.
 */
export interface Contact {}

/**
 * This object represents a point on the map.
 */
export interface Location {}

/**
 * This object represents a venue.
 */
export interface Venue {}

/**
 * This object represent a user's profile pictures.
 */
export interface UserProfilePhotos {}

/**
 * This object represents a file ready to be downloaded. The file can be 
 * downloaded via the link 
 * https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed 
 * that the link will be valid for at least 1 hour. When the link expires, 
 * a new one can be requested by calling getFile.
 */
export interface File {}

/**
 * This object represents a custom keyboard with reply options (see 
 * Introduction to bots for details and examples).
 */
export interface ReplyKeyboardMarkup {}

/**
 * This object represents one button of the reply keyboard. For simple text 
 * buttons String can be used instead of this object to specify text of the 
 * button. Optional fields are mutually exclusive.
 */
export interface KeyboardButton {}

/**
 * Upon receiving a message with this object, Telegram clients will remove 
 * the current custom keyboard and display the default letter-keyboard. By 
 * default, custom keyboards are displayed until a new keyboard is sent by 
 * a bot. An exception is made for one-time keyboards that are hidden 
 * immediately after the user presses a button (see ReplyKeyboardMarkup).
 */
export interface ReplyKeyboardRemove {}

/**
 * This object represents an inline keyboard that appears right next to the 
 * message it belongs to.
 */
export interface InlineKeyboardMarkup {}

/**
 * This object represents one button of an inline keyboard. You must use 
 * exactly one of the optional fields.
 */
export interface InlineKeyboardButton {}

/**
 * This object represents an incoming callback query from a callback button 
 * in an inline keyboard. If the button that originated the query was 
 * attached to a message sent by the bot, the field message will be 
 * present. If the button was attached to a message sent via the bot (in 
 * inline mode), the field inline_message_id will be present. Exactly one 
 * of the fields data or game_short_name will be present.
 */
export interface CallbackQuery {}

/**
 * Upon receiving a message with this object, Telegram clients will display 
 * a reply interface to the user (act as if the user has selected the bot‘s 
 * message and tapped ’Reply'). This can be extremely useful if you want to 
 * create user-friendly step-by-step interfaces without having to sacrifice 
 * privacy mode.
 */
export interface ForceReply {}

/**
 * This object represents a chat photo.
 */
export interface ChatPhoto {}

/**
 * This object contains information about one member of a chat.
 */
export interface ChatMember {}

/**
 * Contains information about why a request was unsuccessful.
 */
export interface ResponseParameters {}

/**
 * Represents a photo to be sent.
 */
export interface InputMediaPhoto {}

/**
 * Represents a video to be sent.
 */
export interface InputMediaVideo {}

/**
 * This object represents a sticker.
 */
export interface Sticker {}

/**
 * This object represents a sticker set.
 */
export interface StickerSet {}

/**
 * This object describes the position on faces where a mask should be 
 * placed by default.
 */
export interface MaskPosition {}

/**
 * This object represents an incoming inline query. When the user sends an 
 * empty query, your bot could return some default or trending results.
 */
export interface InlineQuery {}

/**
 * Represents a link to an article or web page.
 */
export interface InlineQueryResultArticle {}

/**
 * Represents a link to a photo. By default, this photo will be sent by the 
 * user with optional caption. Alternatively, you can use 
 * input_message_content to send a message with the specified content 
 * instead of the photo.
 */
export interface InlineQueryResultPhoto {}

/**
 * Represents a link to an animated GIF file. By default, this animated GIF 
 * file will be sent by the user with optional caption. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the animation.
 */
export interface InlineQueryResultGif {}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without 
 * sound). By default, this animated MPEG-4 file will be sent by the user 
 * with optional caption. Alternatively, you can use input_message_content 
 * to send a message with the specified content instead of the animation.
 */
export interface InlineQueryResultMpeg4Gif {}

/**
 * Represents a link to a page containing an embedded video player or a 
 * video file. By default, this video file will be sent by the user with an 
 * optional caption. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the video.
 */
export interface InlineQueryResultVideo {}

/**
 * Represents a link to an mp3 audio file. By default, this audio file will 
 * be sent by the user. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the audio.
 */
export interface InlineQueryResultAudio {}

/**
 * Represents a link to a voice recording in an .ogg container encoded with 
 * OPUS. By default, this voice recording will be sent by the user. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the the voice message.
 */
export interface InlineQueryResultVoice {}

/**
 * Represents a link to a file. By default, this file will be sent by the 
 * user with an optional caption. Alternatively, you can use 
 * input_message_content to send a message with the specified content 
 * instead of the file. Currently, only .PDF and .ZIP files can be sent 
 * using this method.
 */
export interface InlineQueryResultDocument {}

/**
 * Represents a location on a map. By default, the location will be sent by 
 * the user. Alternatively, you can use input_message_content to send a 
 * message with the specified content instead of the location.
 */
export interface InlineQueryResultLocation {}

/**
 * Represents a venue. By default, the venue will be sent by the user. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the venue.
 */
export interface InlineQueryResultVenue {}

/**
 * Represents a contact with a phone number. By default, this contact will 
 * be sent by the user. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the contact.
 */
export interface InlineQueryResultContact {}

/**
 * Represents a Game.
 */
export interface InlineQueryResultGame {}

/**
 * Represents a link to a photo stored on the Telegram servers. By default, 
 * this photo will be sent by the user with an optional caption. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the photo.
 */
export interface InlineQueryResultCachedPhoto {}

/**
 * Represents a link to an animated GIF file stored on the Telegram 
 * servers. By default, this animated GIF file will be sent by the user 
 * with an optional caption. Alternatively, you can use 
 * input_message_content to send a message with specified content instead 
 * of the animation.
 */
export interface InlineQueryResultCachedGif {}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without 
 * sound) stored on the Telegram servers. By default, this animated MPEG-4 
 * file will be sent by the user with an optional caption. Alternatively, 
 * you can use input_message_content to send a message with the specified 
 * content instead of the animation.
 */
export interface InlineQueryResultCachedMpeg4Gif {}

/**
 * Represents a link to a sticker stored on the Telegram servers. By 
 * default, this sticker will be sent by the user. Alternatively, you can 
 * use input_message_content to send a message with the specified content 
 * instead of the sticker.
 */
export interface InlineQueryResultCachedSticker {}

/**
 * Represents a link to a file stored on the Telegram servers. By default, 
 * this file will be sent by the user with an optional caption. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the file.
 */
export interface InlineQueryResultCachedDocument {}

/**
 * Represents a link to a video file stored on the Telegram servers. By 
 * default, this video file will be sent by the user with an optional 
 * caption. Alternatively, you can use input_message_content to send a 
 * message with the specified content instead of the video.
 */
export interface InlineQueryResultCachedVideo {}

/**
 * Represents a link to a voice message stored on the Telegram servers. By 
 * default, this voice message will be sent by the user. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the voice message.
 */
export interface InlineQueryResultCachedVoice {}

/**
 * Represents a link to an mp3 audio file stored on the Telegram servers. 
 * By default, this audio file will be sent by the user. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the audio.
 */
export interface InlineQueryResultCachedAudio {}

/**
 * Represents the content of a text message to be sent as the result of an 
 * inline query. 
 */
export interface InputTextMessageContent {}

/**
 * Represents the content of a location message to be sent as the result of 
 * an inline query. 
 */
export interface InputLocationMessageContent {}

/**
 * Represents the content of a venue message to be sent as the result of an 
 * inline query. 
 */
export interface InputVenueMessageContent {}

/**
 * Represents the content of a contact message to be sent as the result of 
 * an inline query. 
 */
export interface InputContactMessageContent {}

/**
 * Represents a result of an inline query that was chosen by the user and 
 * sent to their chat partner. 
 */
export interface ChosenInlineResult {}

/**
 * This object represents a portion of the price for goods or services.
 */
export interface LabeledPrice {}

/**
 * This object contains basic information about an invoice.
 */
export interface Invoice {}

/**
 * This object represents a shipping address.
 */
export interface ShippingAddress {}

/**
 * This object represents information about an order.
 */
export interface OrderInfo {}

/**
 * This object represents one shipping option.
 */
export interface ShippingOption {}

/**
 * This object contains basic information about a successful payment.
 */
export interface SuccessfulPayment {}

/**
 * This object contains information about an incoming shipping query.
 */
export interface ShippingQuery {}

/**
 * This object contains information about an incoming pre-checkout query.
 */
export interface PreCheckoutQuery {}

/**
 * This object represents a game. Use BotFather to create and edit games, 
 * their short names will act as unique identifiers.
 */
export interface Game {}

/**
 * You can provide an animation for your game so that it looks stylish in 
 * chats (check out Lumberjack for an example). This object represents an 
 * animation file to be displayed in the message containing a game.
 */
export interface Animation {}

/**
 * This object represents one row of the high scores table for a game.
 */
export interface GameHighScore {}