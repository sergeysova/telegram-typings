/**
 * A placeholder, currently holds no information. Use BotFather to set up 
 * your game.
 */
export interface CallbackGame {}

/**
 * This object represents the content of a message to be sent as a result 
 * of an inline query.
 */
export type InputMessageContent = InputTextMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent;

/**
 * Test
 */
export interface InputFile {}

/**
 * Test
 */
export interface InputMedia {}

/**
 * Test
 */
export interface InlineQueryResult {}

/**
 * TODO parse union properly
 */
export type Integer or String = Integer | String;

/**
 * TODO parse union properly
 */
export type InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply = InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;

/**
 * TODO parse union properly
 */
export type InputFile or String = InputFile | String;

/**
 * This object represents an incoming update.At most one of the optional 
 * parameters can be present in any given update.
 * @see https://core.telegram.org/bots/api#available-types
 */
export interface Update {
  /**
   * The update‘s unique identifier. Update identifiers start from a certain 
   * positive number and increase sequentially. This ID becomes especially 
   * handy if you’re using Webhooks, since it allows you to ignore repeated 
   * updates or to restore the correct update sequence, should they get out 
   * of order. If there are no new updates for at least a week, then 
   * identifier of the next update will be chosen randomly instead of sequentially.
   * @see https://core.telegram.org/bots/api#setwebhook
   */
  update_id: number;

  /**
   * New incoming message of any kind — text, photo, sticker, etc.
   */
  message?: Message;

  /**
   * New version of a message that is known to the bot and was edited
   */
  edited_message?: Message;

  /**
   * New incoming channel post of any kind — text, photo, sticker, etc.
   */
  channel_post?: Message;

  /**
   * New version of a channel post that is known to the bot and was edited
   */
  edited_channel_post?: Message;

  /**
   * New incoming inline query
   * @see https://core.telegram.org/bots/api#inline-mode
   */
  inline_query?: InlineQuery;

  /**
   * The result of an inline query that was chosen by a user and sent to 
   * their chat partner. Please see our documentation on the feedback 
   * collecting for details on how to enable these updates for your bot.
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api/bots/inline#collecting-feedback
   */
  chosen_inline_result?: ChosenInlineResult;

  /**
   * New incoming callback query
   */
  callback_query?: CallbackQuery;

  /**
   * New incoming shipping query. Only for invoices with flexible price
   */
  shipping_query?: ShippingQuery;

  /**
   * New incoming pre-checkout query. Contains full information about checkout
   */
  pre_checkout_query?: PreCheckoutQuery;
}

/**
 * Contains information about the current status of a webhook.
 */
export interface WebhookInfo {
  /**
   * Webhook URL, may be empty if webhook is not set up
   */
  url: string;

  /**
   * True, if a custom certificate was provided for webhook certificate checks
   */
  has_custom_certificate: boolean;

  /**
   * Number of updates awaiting delivery
   */
  pending_update_count: number;

  /**
   * Unix time for the most recent error that happened when trying to deliver 
   * an update via webhook
   */
  last_error_date?: number;

  /**
   * Error message in human-readable format for the most recent error that 
   * happened when trying to deliver an update via webhook
   */
  last_error_message?: string;

  /**
   * Maximum allowed number of simultaneous HTTPS connections to the webhook 
   * for update delivery
   */
  max_connections?: number;

  /**
   * A list of update types the bot is subscribed to. Defaults to all update types
   */
  allowed_updates?: string[];
}

/**
 * This object represents a Telegram user or bot.
 */
export interface User {
  /**
   * Unique identifier for this user or bot
   */
  id: number;

  /**
   * True, if this user is a bot
   */
  is_bot: boolean;

  /**
   * User‘s or bot’s first name
   */
  first_name: string;

  /**
   * User‘s or bot’s last name
   */
  last_name?: string;

  /**
   * User‘s or bot’s username
   */
  username?: string;

  /**
   * IETF language tag of the user's language
   * @see https://en.wikipedia.org/wiki/IETF_language_tag
   */
  language_code?: string;
}

/**
 * This object represents a chat.
 */
export interface Chat {
  /**
   * Unique identifier for this chat. This number may be greater than 32 bits 
   * and some programming languages may have difficulty/silent defects in 
   * interpreting it. But it is smaller than 52 bits, so a signed 64 bit 
   * integer or double-precision float type are safe for storing this identifier.
   */
  id: number;

  /**
   * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
   */
  type: string;

  /**
   * Title, for supergroups, channels and group chats
   */
  title?: string;

  /**
   * Username, for private chats, supergroups and channels if available
   */
  username?: string;

  /**
   * First name of the other party in a private chat
   */
  first_name?: string;

  /**
   * Last name of the other party in a private chat
   */
  last_name?: string;

  /**
   * True if a group has ‘All Members Are Admins’ enabled.
   */
  all_members_are_administrators?: boolean;

  /**
   * Chat photo. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  photo?: ChatPhoto;

  /**
   * Description, for supergroups and channel chats. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  description?: string;

  /**
   * Chat invite link, for supergroups and channel chats. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  invite_link?: string;

  /**
   * Pinned message, for supergroups and channel chats. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  pinned_message?: Message;

  /**
   * For supergroups, name of group sticker set. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  sticker_set_name?: string;

  /**
   * True, if the bot can change the group sticker set. Returned only in getChat.
   * @see https://core.telegram.org/bots/api#getchat
   */
  can_set_sticker_set?: boolean;
}

/**
 * This object represents a message.
 */
export interface Message {
  /**
   * Unique message identifier inside this chat
   */
  message_id: number;

  /**
   * Sender, empty for messages sent to channels
   */
  from?: User;

  /**
   * Date the message was sent in Unix time
   */
  date: number;

  /**
   * Conversation the message belongs to
   */
  chat: Chat;

  /**
   * For forwarded messages, sender of the original message
   */
  forward_from?: User;

  /**
   * For messages forwarded from channels, information about the original channel
   */
  forward_from_chat?: Chat;

  /**
   * For messages forwarded from channels, identifier of the original message 
   * in the channel
   */
  forward_from_message_id?: number;

  /**
   * For messages forwarded from channels, signature of the post author if present
   */
  forward_signature?: string;

  /**
   * For forwarded messages, date the original message was sent in Unix time
   */
  forward_date?: number;

  /**
   * For replies, the original message. Note that the Message object in this 
   * field will not contain further reply_to_message fields even if it itself 
   * is a reply.
   */
  reply_to_message?: Message;

  /**
   * Date the message was last edited in Unix time
   */
  edit_date?: number;

  /**
   * The unique identifier of a media message group this message belongs to
   */
  media_group_id?: string;

  /**
   * Signature of the post author for messages in channels
   */
  author_signature?: string;

  /**
   * For text messages, the actual UTF-8 text of the message, 0-4096 characters.
   */
  text?: string;

  /**
   * For text messages, special entities like usernames, URLs, bot commands, 
   * etc. that appear in the text
   */
  entities?: MessageEntity[];

  /**
   * For messages with a caption, special entities like usernames, URLs, bot 
   * commands, etc. that appear in the caption
   */
  caption_entities?: MessageEntity[];

  /**
   * Message is an audio file, information about the file
   */
  audio?: Audio;

  /**
   * Message is a general file, information about the file
   */
  document?: Document;

  /**
   * Message is a game, information about the game. More about games »
   * @see https://core.telegram.org/bots/api#games
   */
  game?: Game;

  /**
   * Message is a photo, available sizes of the photo
   */
  photo?: PhotoSize[];

  /**
   * Message is a sticker, information about the sticker
   */
  sticker?: Sticker;

  /**
   * Message is a video, information about the video
   */
  video?: Video;

  /**
   * Message is a voice message, information about the file
   */
  voice?: Voice;

  /**
   * Message is a video note, information about the video message
   * @see https://telegram.org/blog/video-messages-and-telescope
   */
  video_note?: VideoNote;

  /**
   * Caption for the audio, document, photo, video or voice, 0-200 characters
   */
  caption?: string;

  /**
   * Message is a shared contact, information about the contact
   */
  contact?: Contact;

  /**
   * Message is a shared location, information about the location
   */
  location?: Location;

  /**
   * Message is a venue, information about the venue
   */
  venue?: Venue;

  /**
   * New members that were added to the group or supergroup and information 
   * about them (the bot itself may be one of these members)
   */
  new_chat_members?: User[];

  /**
   * A member was removed from the group, information about them (this member 
   * may be the bot itself)
   */
  left_chat_member?: User;

  /**
   * A chat title was changed to this value
   */
  new_chat_title?: string;

  /**
   * A chat photo was change to this value
   */
  new_chat_photo?: PhotoSize[];

  /**
   * Service message: the chat photo was deleted
   */
  delete_chat_photo?: true;

  /**
   * Service message: the group has been created
   */
  group_chat_created?: true;

  /**
   * Service message: the supergroup has been created. This field can‘t be 
   * received in a message coming through updates, because bot can’t be a 
   * member of a supergroup when it is created. It can only be found in 
   * reply_to_message if someone replies to a very first message in a 
   * directly created supergroup.
   */
  supergroup_chat_created?: true;

  /**
   * Service message: the channel has been created. This field can‘t be 
   * received in a message coming through updates, because bot can’t be a 
   * member of a channel when it is created. It can only be found in 
   * reply_to_message if someone replies to a very first message in a channel.
   */
  channel_chat_created?: true;

  /**
   * The group has been migrated to a supergroup with the specified 
   * identifier. This number may be greater than 32 bits and some programming 
   * languages may have difficulty/silent defects in interpreting it. But it 
   * is smaller than 52 bits, so a signed 64 bit integer or double-precision 
   * float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;

  /**
   * The supergroup has been migrated from a group with the specified 
   * identifier. This number may be greater than 32 bits and some programming 
   * languages may have difficulty/silent defects in interpreting it. But it 
   * is smaller than 52 bits, so a signed 64 bit integer or double-precision 
   * float type are safe for storing this identifier.
   */
  migrate_from_chat_id?: number;

  /**
   * Specified message was pinned. Note that the Message object in this field 
   * will not contain further reply_to_message fields even if it is itself a reply.
   */
  pinned_message?: Message;

  /**
   * Message is an invoice for a payment, information about the invoice. More 
   * about payments »
   * @see https://core.telegram.org/bots/api#payments
   */
  invoice?: Invoice;

  /**
   * Message is a service message about a successful payment, information 
   * about the payment. More about payments »
   * @see https://core.telegram.org/bots/api#payments
   */
  successful_payment?: SuccessfulPayment;

  /**
   * The domain name of the website on which the user has logged in. More 
   * about Telegram Login »
   * @see https://core.telegram.org/bots/api/widgets/login
   */
  connected_website?: string;
}

/**
 * This object represents one special entity in a text message. For 
 * example, hashtags, usernames, URLs, etc.
 */
export interface MessageEntity {
  /**
   * Type of the entity. Can be mention (@username), hashtag, bot_command, 
   * url, email, bold (bold text), italic (italic text), code (monowidth 
   * string), pre (monowidth block), text_link (for clickable text URLs), 
   * text_mention (for users without usernames)
   * @see https://telegram.org/blog/edit#new-mentions
   */
  type: string;

  /**
   * Offset in UTF-16 code units to the start of the entity
   */
  offset: number;

  /**
   * Length of the entity in UTF-16 code units
   */
  length: number;

  /**
   * For “text_link” only, url that will be opened after user taps on the text
   */
  url?: string;

  /**
   * For “text_mention” only, the mentioned user
   */
  user?: User;
}

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 * @see https://core.telegram.org/bots/api#document
 * @see https://core.telegram.org/bots/api#sticker
 */
export interface PhotoSize {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Photo width
   */
  width: number;

  /**
   * Photo height
   */
  height: number;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents an audio file to be treated as music by the 
 * Telegram clients.
 */
export interface Audio {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Duration of the audio in seconds as defined by sender
   */
  duration: number;

  /**
   * Performer of the audio as defined by sender or by audio tags
   */
  performer?: string;

  /**
   * Title of the audio as defined by sender or by audio tags
   */
  title?: string;

  /**
   * MIME type of the file as defined by sender
   */
  mime_type?: string;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a general file (as opposed to photos, voice 
 * messages and audio files).
 * @see https://core.telegram.org/bots/api#photosize
 * @see https://core.telegram.org/bots/api#voice
 * @see https://core.telegram.org/bots/api#audio
 */
export interface Document {
  /**
   * Unique file identifier
   */
  file_id: string;

  /**
   * Document thumbnail as defined by sender
   */
  thumb?: PhotoSize;

  /**
   * Original filename as defined by sender
   */
  file_name?: string;

  /**
   * MIME type of the file as defined by sender
   */
  mime_type?: string;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a video file.
 */
export interface Video {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Video width as defined by sender
   */
  width: number;

  /**
   * Video height as defined by sender
   */
  height: number;

  /**
   * Duration of the video in seconds as defined by sender
   */
  duration: number;

  /**
   * Video thumbnail
   */
  thumb?: PhotoSize;

  /**
   * Mime type of a file as defined by sender
   */
  mime_type?: string;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a voice note.
 */
export interface Voice {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Duration of the audio in seconds as defined by sender
   */
  duration: number;

  /**
   * MIME type of the file as defined by sender
   */
  mime_type?: string;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 * @see https://telegram.org/blog/video-messages-and-telescope
 */
export interface VideoNote {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Video width and height as defined by sender
   */
  length: number;

  /**
   * Duration of the video in seconds as defined by sender
   */
  duration: number;

  /**
   * Video thumbnail
   */
  thumb?: PhotoSize;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a phone contact.
 */
export interface Contact {
  /**
   * Contact's phone number
   */
  phone_number: string;

  /**
   * Contact's first name
   */
  first_name: string;

  /**
   * Contact's last name
   */
  last_name?: string;

  /**
   * Contact's user identifier in Telegram
   */
  user_id?: number;
}

/**
 * This object represents a point on the map.
 */
export interface Location {
  /**
   * Longitude as defined by sender
   */
  longitude: number;

  /**
   * Latitude as defined by sender
   */
  latitude: number;
}

/**
 * This object represents a venue.
 */
export interface Venue {
  /**
   * Venue location
   */
  location: Location;

  /**
   * Name of the venue
   */
  title: string;

  /**
   * Address of the venue
   */
  address: string;

  /**
   * Foursquare identifier of the venue
   */
  foursquare_id?: string;
}

/**
 * This object represent a user's profile pictures.
 */
export interface UserProfilePhotos {
  /**
   * Total number of profile pictures the target user has
   */
  total_count: number;

  /**
   * Requested profile pictures (in up to 4 sizes each)
   */
  photos: PhotoSize[][];
}

/**
 * This object represents a file ready to be downloaded. The file can be 
 * downloaded via the link 
 * https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed 
 * that the link will be valid for at least 1 hour. When the link expires, 
 * a new one can be requested by calling getFile.
 * @see https://core.telegram.org/bots/api#getfile
 */
export interface File {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * File size, if known
   */
  file_size?: number;

  /**
   * File path. Use https://api.telegram.org/file/bot<token>/<file_path> to 
   * get the file.
   */
  file_path?: string;
}

/**
 * This object represents a custom keyboard with reply options (see 
 * Introduction to bots for details and examples).
 * @see https://core.telegram.org/bots#keyboards
 */
export interface ReplyKeyboardMarkup {
  /**
   * Array of button rows, each represented by an Array of KeyboardButton objects
   * @see https://core.telegram.org/bots/api#keyboardbutton
   */
  keyboard: KeyboardButton[][];

  /**
   * Requests clients to resize the keyboard vertically for optimal fit 
   * (e.g., make the keyboard smaller if there are just two rows of buttons). 
   * Defaults to false, in which case the custom keyboard is always of the 
   * same height as the app's standard keyboard.
   */
  resize_keyboard?: boolean;

  /**
   * Requests clients to hide the keyboard as soon as it's been used. The 
   * keyboard will still be available, but clients will automatically display 
   * the usual letter-keyboard in the chat – the user can press a special 
   * button in the input field to see the custom keyboard again. Defaults to false.
   */
  one_time_keyboard?: boolean;

  /**
   * Use this parameter if you want to show the keyboard to specific users 
   * only. Targets: 1) users that are @mentioned in the text of the Message 
   * object; 2) if the bot's message is a reply (has reply_to_message_id), 
   * sender of the original message.Example: A user requests to change the 
   * bot‘s language, bot replies to the request with a keyboard to select the 
   * new language. Other users in the group don’t see the keyboard.
   * @see https://core.telegram.org/bots/api#message
   */
  selective?: boolean;
}

/**
 * This object represents one button of the reply keyboard. For simple text 
 * buttons String can be used instead of this object to specify text of the 
 * button. Optional fields are mutually exclusive.
 */
export interface KeyboardButton {
  /**
   * Text of the button. If none of the optional fields are used, it will be 
   * sent as a message when the button is pressed
   */
  text: string;

  /**
   * If True, the user's phone number will be sent as a contact when the 
   * button is pressed. Available in private chats only
   */
  request_contact?: boolean;

  /**
   * If True, the user's current location will be sent when the button is 
   * pressed. Available in private chats only
   */
  request_location?: boolean;
}

/**
 * Upon receiving a message with this object, Telegram clients will remove 
 * the current custom keyboard and display the default letter-keyboard. By 
 * default, custom keyboards are displayed until a new keyboard is sent by 
 * a bot. An exception is made for one-time keyboards that are hidden 
 * immediately after the user presses a button (see ReplyKeyboardMarkup).
 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
 */
export interface ReplyKeyboardRemove {
  /**
   * Requests clients to remove the custom keyboard (user will not be able to 
   * summon this keyboard; if you want to hide the keyboard from sight but 
   * keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup)
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   */
  remove_keyboard: true;

  /**
   * Use this parameter if you want to remove the keyboard for specific users 
   * only. Targets: 1) users that are @mentioned in the text of the Message 
   * object; 2) if the bot's message is a reply (has reply_to_message_id), 
   * sender of the original message.Example: A user votes in a poll, bot 
   * returns confirmation message in reply to the vote and removes the 
   * keyboard for that user, while still showing the keyboard with poll 
   * options to users who haven't voted yet.
   * @see https://core.telegram.org/bots/api#message
   */
  selective?: boolean;
}

/**
 * This object represents an inline keyboard that appears right next to the 
 * message it belongs to.
 * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
 */
export interface InlineKeyboardMarkup {
  /**
   * Array of button rows, each represented by an Array of 
   * InlineKeyboardButton objects
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   */
  inline_keyboard: InlineKeyboardButton[][];
}

/**
 * This object represents one button of an inline keyboard. You must use 
 * exactly one of the optional fields.
 */
export interface InlineKeyboardButton {
  /**
   * Label text on the button
   */
  text: string;

  /**
   * HTTP url to be opened when button is pressed
   */
  url?: string;

  /**
   * Data to be sent in a callback query to the bot when button is pressed, 
   * 1-64 bytes
   * @see https://core.telegram.org/bots/api#callbackquery
   */
  callback_data?: string;

  /**
   * If set, pressing the button will prompt the user to select one of their 
   * chats, open that chat and insert the bot‘s username and the specified 
   * inline query in the input field. Can be empty, in which case just the 
   * bot’s username will be inserted.Note: This offers an easy way for users 
   * to start using your bot in inline mode when they are currently in a 
   * private chat with it. Especially useful when combined with switch_pm… 
   * actions – in this case the user will be automatically returned to the 
   * chat they switched from, skipping the chat selection screen.
   * @see https://core.telegram.org/bots/api/bots/inline
   * @see https://core.telegram.org/bots/api#answerinlinequery
   */
  switch_inline_query?: string;

  /**
   * If set, pressing the button will insert the bot‘s username and the 
   * specified inline query in the current chat's input field. Can be empty, 
   * in which case only the bot’s username will be inserted.This offers a 
   * quick way for the user to open your bot in inline mode in the same chat 
   * – good for selecting something from multiple options.
   */
  switch_inline_query_current_chat?: string;

  /**
   * Description of the game that will be launched when the user presses the 
   * button.NOTE: This type of button must always be the first button in the 
   * first row.
   */
  callback_game?: CallbackGame;

  /**
   * Specify True, to send a Pay button.NOTE: This type of button must always 
   * be the first button in the first row.
   * @see https://core.telegram.org/bots/api#payments
   */
  pay?: boolean;
}

/**
 * This object represents an incoming callback query from a callback button 
 * in an inline keyboard. If the button that originated the query was 
 * attached to a message sent by the bot, the field message will be 
 * present. If the button was attached to a message sent via the bot (in 
 * inline mode), the field inline_message_id will be present. Exactly one 
 * of the fields data or game_short_name will be present.
 * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
 * @see https://core.telegram.org/bots/api#inline-mode
 */
export interface CallbackQuery {
  /**
   * Unique identifier for this query
   */
  id: string;

  /**
   * Sender
   */
  from: User;

  /**
   * Message with the callback button that originated the query. Note that 
   * message content and message date will not be available if the message is 
   * too old
   */
  message?: Message;

  /**
   * Identifier of the message sent via the bot in inline mode, that 
   * originated the query.
   */
  inline_message_id?: string;

  /**
   * Global identifier, uniquely corresponding to the chat to which the 
   * message with the callback button was sent. Useful for high scores in games.
   * @see https://core.telegram.org/bots/api#games
   */
  chat_instance: string;

  /**
   * Data associated with the callback button. Be aware that a bad client can 
   * send arbitrary data in this field.
   */
  data?: string;

  /**
   * Short name of a Game to be returned, serves as the unique identifier for 
   * the game
   * @see https://core.telegram.org/bots/api#games
   */
  game_short_name?: string;
}

/**
 * Upon receiving a message with this object, Telegram clients will display 
 * a reply interface to the user (act as if the user has selected the bot‘s 
 * message and tapped ’Reply'). This can be extremely useful if you want to 
 * create user-friendly step-by-step interfaces without having to sacrifice 
 * privacy mode.
 * @see https://core.telegram.org/bots/api/bots#privacy-mode
 */
export interface ForceReply {
  /**
   * Shows reply interface to the user, as if they manually selected the 
   * bot‘s message and tapped ’Reply'
   */
  force_reply: true;

  /**
   * Use this parameter if you want to force reply from specific users only. 
   * Targets: 1) users that are @mentioned in the text of the Message object; 
   * 2) if the bot's message is a reply (has reply_to_message_id), sender of 
   * the original message.
   * @see https://core.telegram.org/bots/api#message
   */
  selective?: boolean;
}

/**
 * This object represents a chat photo.
 */
export interface ChatPhoto {
  /**
   * Unique file identifier of small (160x160) chat photo. This file_id can 
   * be used only for photo download.
   */
  small_file_id: string;

  /**
   * Unique file identifier of big (640x640) chat photo. This file_id can be 
   * used only for photo download.
   */
  big_file_id: string;
}

/**
 * This object contains information about one member of a chat.
 */
export interface ChatMember {
  /**
   * Information about the user
   */
  user: User;

  /**
   * The member's status in the chat. Can be “creator”, “administrator”, 
   * “member”, “restricted”, “left” or “kicked”
   */
  status: string;

  /**
   * Restricted and kicked only. Date when restrictions will be lifted for 
   * this user, unix time
   */
  until_date?: number;

  /**
   * Administrators only. True, if the bot is allowed to edit administrator 
   * privileges of that user
   */
  can_be_edited?: boolean;

  /**
   * Administrators only. True, if the administrator can change the chat 
   * title, photo and other settings
   */
  can_change_info?: boolean;

  /**
   * Administrators only. True, if the administrator can post in the channel, 
   * channels only
   */
  can_post_messages?: boolean;

  /**
   * Administrators only. True, if the administrator can edit messages of 
   * other users and can pin messages, channels only
   */
  can_edit_messages?: boolean;

  /**
   * Administrators only. True, if the administrator can delete messages of 
   * other users
   */
  can_delete_messages?: boolean;

  /**
   * Administrators only. True, if the administrator can invite new users to 
   * the chat
   */
  can_invite_users?: boolean;

  /**
   * Administrators only. True, if the administrator can restrict, ban or 
   * unban chat members
   */
  can_restrict_members?: boolean;

  /**
   * Administrators only. True, if the administrator can pin messages, 
   * supergroups only
   */
  can_pin_messages?: boolean;

  /**
   * Administrators only. True, if the administrator can add new 
   * administrators with a subset of his own privileges or demote 
   * administrators that he has promoted, directly or indirectly (promoted by 
   * administrators that were appointed by the user)
   */
  can_promote_members?: boolean;

  /**
   * Restricted only. True, if the user can send text messages, contacts, 
   * locations and venues
   */
  can_send_messages?: boolean;

  /**
   * Restricted only. True, if the user can send audios, documents, photos, 
   * videos, video notes and voice notes, implies can_send_messages
   */
  can_send_media_messages?: boolean;

  /**
   * Restricted only. True, if the user can send animations, games, stickers 
   * and use inline bots, implies can_send_media_messages
   */
  can_send_other_messages?: boolean;

  /**
   * Restricted only. True, if user may add web page previews to his 
   * messages, implies can_send_media_messages
   */
  can_add_web_page_previews?: boolean;
}

/**
 * Contains information about why a request was unsuccessful.
 */
export interface ResponseParameters {
  /**
   * The group has been migrated to a supergroup with the specified 
   * identifier. This number may be greater than 32 bits and some programming 
   * languages may have difficulty/silent defects in interpreting it. But it 
   * is smaller than 52 bits, so a signed 64 bit integer or double-precision 
   * float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;

  /**
   * In case of exceeding flood control, the number of seconds left to wait 
   * before the request can be repeated
   */
  retry_after?: number;
}

/**
 * Represents a photo to be sent.
 */
export interface InputMediaPhoto {
  /**
   * Type of the result, must be photo
   */
  type: string;

  /**
   * File to send. Pass a file_id to send a file that exists on the Telegram 
   * servers (recommended), pass an HTTP URL for Telegram to get a file from 
   * the Internet, or pass "attach://<file_attach_name>" to upload a new one 
   * using multipart/form-data under <file_attach_name> name. More info on 
   * Sending Files »
   * @see https://core.telegram.org/bots/api#sending-files
   */
  media: string;

  /**
   * Caption of the photo to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;
}

/**
 * Represents a video to be sent.
 */
export interface InputMediaVideo {
  /**
   * Type of the result, must be video
   */
  type: string;

  /**
   * File to send. Pass a file_id to send a file that exists on the Telegram 
   * servers (recommended), pass an HTTP URL for Telegram to get a file from 
   * the Internet, or pass "attach://<file_attach_name>" to upload a new one 
   * using multipart/form-data under <file_attach_name> name. More info on 
   * Sending Files »
   * @see https://core.telegram.org/bots/api#sending-files
   */
  media: string;

  /**
   * Caption of the video to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Video width
   */
  width?: number;

  /**
   * Video height
   */
  height?: number;

  /**
   * Video duration
   */
  duration?: number;

  /**
   * Pass True, if the uploaded video is suitable for streaming
   */
  supports_streaming?: boolean;
}

/**
 * This object represents a sticker.
 */
export interface Sticker {
  /**
   * Unique identifier for this file
   */
  file_id: string;

  /**
   * Sticker width
   */
  width: number;

  /**
   * Sticker height
   */
  height: number;

  /**
   * Sticker thumbnail in the .webp or .jpg format
   */
  thumb?: PhotoSize;

  /**
   * Emoji associated with the sticker
   */
  emoji?: string;

  /**
   * Name of the sticker set to which the sticker belongs
   */
  set_name?: string;

  /**
   * For mask stickers, the position where the mask should be placed
   */
  mask_position?: MaskPosition;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents a sticker set.
 */
export interface StickerSet {
  /**
   * Sticker set name
   */
  name: string;

  /**
   * Sticker set title
   */
  title: string;

  /**
   * True, if the sticker set contains masks
   */
  contains_masks: boolean;

  /**
   * List of all set stickers
   */
  stickers: Sticker[];
}

/**
 * This object describes the position on faces where a mask should be 
 * placed by default.
 */
export interface MaskPosition {
  /**
   * The part of the face relative to which the mask should be placed. One of 
   * “forehead”, “eyes”, “mouth”, or “chin”.
   */
  point: string;

  /**
   * Shift by X-axis measured in widths of the mask scaled to the face size, 
   * from left to right. For example, choosing -1.0 will place mask just to 
   * the left of the default mask position.
   */
  x_shift: number;

  /**
   * Shift by Y-axis measured in heights of the mask scaled to the face size, 
   * from top to bottom. For example, 1.0 will place the mask just below the 
   * default mask position.
   */
  y_shift: number;

  /**
   * Mask scaling coefficient. For example, 2.0 means double size.
   */
  scale: number;
}

/**
 * This object represents an incoming inline query. When the user sends an 
 * empty query, your bot could return some default or trending results.
 */
export interface InlineQuery {
  /**
   * Unique identifier for this query
   */
  id: string;

  /**
   * Sender
   */
  from: User;

  /**
   * Sender location, only for bots that request user location
   */
  location?: Location;

  /**
   * Text of the query (up to 512 characters)
   */
  query: string;

  /**
   * Offset of the results to be returned, can be controlled by the bot
   */
  offset: string;
}

/**
 * Represents a link to an article or web page.
 */
export interface InlineQueryResultArticle {
  /**
   * Type of the result, must be article
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 Bytes
   */
  id: string;

  /**
   * Title of the result
   */
  title: string;

  /**
   * Content of the message to be sent
   */
  input_message_content: InputMessageContent;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * URL of the result
   */
  url?: string;

  /**
   * Pass True, if you don't want the URL to be shown in the message
   */
  hide_url?: boolean;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Url of the thumbnail for the result
   */
  thumb_url?: string;

  /**
   * Thumbnail width
   */
  thumb_width?: number;

  /**
   * Thumbnail height
   */
  thumb_height?: number;
}

/**
 * Represents a link to a photo. By default, this photo will be sent by the 
 * user with optional caption. Alternatively, you can use 
 * input_message_content to send a message with the specified content 
 * instead of the photo.
 */
export interface InlineQueryResultPhoto {
  /**
   * Type of the result, must be photo
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL of the photo. Photo must be in jpeg format. Photo size must 
   * not exceed 5MB
   */
  photo_url: string;

  /**
   * URL of the thumbnail for the photo
   */
  thumb_url: string;

  /**
   * Width of the photo
   */
  photo_width?: number;

  /**
   * Height of the photo
   */
  photo_height?: number;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Caption of the photo to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the photo
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to an animated GIF file. By default, this animated GIF 
 * file will be sent by the user with optional caption. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the animation.
 */
export interface InlineQueryResultGif {
  /**
   * Type of the result, must be gif
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL for the GIF file. File size must not exceed 1MB
   */
  gif_url: string;

  /**
   * Width of the GIF
   */
  gif_width?: number;

  /**
   * Height of the GIF
   */
  gif_height?: number;

  /**
   * Duration of the GIF
   */
  gif_duration?: number;

  /**
   * URL of the static thumbnail for the result (jpeg or gif)
   */
  thumb_url: string;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Caption of the GIF file to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the GIF animation
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without 
 * sound). By default, this animated MPEG-4 file will be sent by the user 
 * with optional caption. Alternatively, you can use input_message_content 
 * to send a message with the specified content instead of the animation.
 */
export interface InlineQueryResultMpeg4Gif {
  /**
   * Type of the result, must be mpeg4_gif
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL for the MP4 file. File size must not exceed 1MB
   */
  mpeg4_url: string;

  /**
   * Video width
   */
  mpeg4_width?: number;

  /**
   * Video height
   */
  mpeg4_height?: number;

  /**
   * Video duration
   */
  mpeg4_duration?: number;

  /**
   * URL of the static thumbnail (jpeg or gif) for the result
   */
  thumb_url: string;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Caption of the MPEG-4 file to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the video animation
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a page containing an embedded video player or a 
 * video file. By default, this video file will be sent by the user with an 
 * optional caption. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the video.
 */
export interface InlineQueryResultVideo {
  /**
   * Type of the result, must be video
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL for the embedded video player or video file
   */
  video_url: string;

  /**
   * Mime type of the content of video url, “text/html” or “video/mp4”
   */
  mime_type: string;

  /**
   * URL of the thumbnail (jpeg only) for the video
   */
  thumb_url: string;

  /**
   * Title for the result
   */
  title: string;

  /**
   * Caption of the video to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Video width
   */
  video_width?: number;

  /**
   * Video height
   */
  video_height?: number;

  /**
   * Video duration in seconds
   */
  video_duration?: number;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the video. This field is 
   * required if InlineQueryResultVideo is used to send an HTML-page as a 
   * result (e.g., a YouTube video).
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to an mp3 audio file. By default, this audio file will 
 * be sent by the user. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the audio.
 */
export interface InlineQueryResultAudio {
  /**
   * Type of the result, must be audio
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL for the audio file
   */
  audio_url: string;

  /**
   * Title
   */
  title: string;

  /**
   * Caption, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Performer
   */
  performer?: string;

  /**
   * Audio duration in seconds
   */
  audio_duration?: number;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the audio
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a voice recording in an .ogg container encoded with 
 * OPUS. By default, this voice recording will be sent by the user. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the the voice message.
 */
export interface InlineQueryResultVoice {
  /**
   * Type of the result, must be voice
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid URL for the voice recording
   */
  voice_url: string;

  /**
   * Recording title
   */
  title: string;

  /**
   * Caption, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Recording duration in seconds
   */
  voice_duration?: number;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the voice recording
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a file. By default, this file will be sent by the 
 * user with an optional caption. Alternatively, you can use 
 * input_message_content to send a message with the specified content 
 * instead of the file. Currently, only .PDF and .ZIP files can be sent 
 * using this method.
 */
export interface InlineQueryResultDocument {
  /**
   * Type of the result, must be document
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * Title for the result
   */
  title: string;

  /**
   * Caption of the document to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * A valid URL for the file
   */
  document_url: string;

  /**
   * Mime type of the content of the file, either “application/pdf” or “application/zip”
   */
  mime_type: string;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Inline keyboard attached to the message
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the file
   */
  input_message_content?: InputMessageContent;

  /**
   * URL of the thumbnail (jpeg only) for the file
   */
  thumb_url?: string;

  /**
   * Thumbnail width
   */
  thumb_width?: number;

  /**
   * Thumbnail height
   */
  thumb_height?: number;
}

/**
 * Represents a location on a map. By default, the location will be sent by 
 * the user. Alternatively, you can use input_message_content to send a 
 * message with the specified content instead of the location.
 */
export interface InlineQueryResultLocation {
  /**
   * Type of the result, must be location
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 Bytes
   */
  id: string;

  /**
   * Location latitude in degrees
   */
  latitude: number;

  /**
   * Location longitude in degrees
   */
  longitude: number;

  /**
   * Location title
   */
  title: string;

  /**
   * Period in seconds for which the location can be updated, should be 
   * between 60 and 86400.
   */
  live_period?: number;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the location
   */
  input_message_content?: InputMessageContent;

  /**
   * Url of the thumbnail for the result
   */
  thumb_url?: string;

  /**
   * Thumbnail width
   */
  thumb_width?: number;

  /**
   * Thumbnail height
   */
  thumb_height?: number;
}

/**
 * Represents a venue. By default, the venue will be sent by the user. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the venue.
 */
export interface InlineQueryResultVenue {
  /**
   * Type of the result, must be venue
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 Bytes
   */
  id: string;

  /**
   * Latitude of the venue location in degrees
   */
  latitude: number;

  /**
   * Longitude of the venue location in degrees
   */
  longitude: number;

  /**
   * Title of the venue
   */
  title: string;

  /**
   * Address of the venue
   */
  address: string;

  /**
   * Foursquare identifier of the venue if known
   */
  foursquare_id?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the venue
   */
  input_message_content?: InputMessageContent;

  /**
   * Url of the thumbnail for the result
   */
  thumb_url?: string;

  /**
   * Thumbnail width
   */
  thumb_width?: number;

  /**
   * Thumbnail height
   */
  thumb_height?: number;
}

/**
 * Represents a contact with a phone number. By default, this contact will 
 * be sent by the user. Alternatively, you can use input_message_content to 
 * send a message with the specified content instead of the contact.
 */
export interface InlineQueryResultContact {
  /**
   * Type of the result, must be contact
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 Bytes
   */
  id: string;

  /**
   * Contact's phone number
   */
  phone_number: string;

  /**
   * Contact's first name
   */
  first_name: string;

  /**
   * Contact's last name
   */
  last_name?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the contact
   */
  input_message_content?: InputMessageContent;

  /**
   * Url of the thumbnail for the result
   */
  thumb_url?: string;

  /**
   * Thumbnail width
   */
  thumb_width?: number;

  /**
   * Thumbnail height
   */
  thumb_height?: number;
}

/**
 * Represents a Game.
 * @see https://core.telegram.org/bots/api#games
 */
export interface InlineQueryResultGame {
  /**
   * Type of the result, must be game
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * Short name of the game
   */
  game_short_name: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;
}

/**
 * Represents a link to a photo stored on the Telegram servers. By default, 
 * this photo will be sent by the user with an optional caption. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the photo.
 */
export interface InlineQueryResultCachedPhoto {
  /**
   * Type of the result, must be photo
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier of the photo
   */
  photo_file_id: string;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Caption of the photo to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the photo
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to an animated GIF file stored on the Telegram 
 * servers. By default, this animated GIF file will be sent by the user 
 * with an optional caption. Alternatively, you can use 
 * input_message_content to send a message with specified content instead 
 * of the animation.
 */
export interface InlineQueryResultCachedGif {
  /**
   * Type of the result, must be gif
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier for the GIF file
   */
  gif_file_id: string;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Caption of the GIF file to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the GIF animation
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without 
 * sound) stored on the Telegram servers. By default, this animated MPEG-4 
 * file will be sent by the user with an optional caption. Alternatively, 
 * you can use input_message_content to send a message with the specified 
 * content instead of the animation.
 */
export interface InlineQueryResultCachedMpeg4Gif {
  /**
   * Type of the result, must be mpeg4_gif
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier for the MP4 file
   */
  mpeg4_file_id: string;

  /**
   * Title for the result
   */
  title?: string;

  /**
   * Caption of the MPEG-4 file to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the video animation
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a sticker stored on the Telegram servers. By 
 * default, this sticker will be sent by the user. Alternatively, you can 
 * use input_message_content to send a message with the specified content 
 * instead of the sticker.
 */
export interface InlineQueryResultCachedSticker {
  /**
   * Type of the result, must be sticker
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier of the sticker
   */
  sticker_file_id: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the sticker
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a file stored on the Telegram servers. By default, 
 * this file will be sent by the user with an optional caption. 
 * Alternatively, you can use input_message_content to send a message with 
 * the specified content instead of the file.
 */
export interface InlineQueryResultCachedDocument {
  /**
   * Type of the result, must be document
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * Title for the result
   */
  title: string;

  /**
   * A valid file identifier for the file
   */
  document_file_id: string;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Caption of the document to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the file
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a video file stored on the Telegram servers. By 
 * default, this video file will be sent by the user with an optional 
 * caption. Alternatively, you can use input_message_content to send a 
 * message with the specified content instead of the video.
 */
export interface InlineQueryResultCachedVideo {
  /**
   * Type of the result, must be video
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier for the video file
   */
  video_file_id: string;

  /**
   * Title for the result
   */
  title: string;

  /**
   * Short description of the result
   */
  description?: string;

  /**
   * Caption of the video to be sent, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the video
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to a voice message stored on the Telegram servers. By 
 * default, this voice message will be sent by the user. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the voice message.
 */
export interface InlineQueryResultCachedVoice {
  /**
   * Type of the result, must be voice
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier for the voice message
   */
  voice_file_id: string;

  /**
   * Voice message title
   */
  title: string;

  /**
   * Caption, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the voice message
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents a link to an mp3 audio file stored on the Telegram servers. 
 * By default, this audio file will be sent by the user. Alternatively, you 
 * can use input_message_content to send a message with the specified 
 * content instead of the audio.
 */
export interface InlineQueryResultCachedAudio {
  /**
   * Type of the result, must be audio
   */
  type: string;

  /**
   * Unique identifier for this result, 1-64 bytes
   */
  id: string;

  /**
   * A valid file identifier for the audio file
   */
  audio_file_id: string;

  /**
   * Caption, 0-200 characters
   */
  caption?: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in the media caption.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Inline keyboard attached to the message
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  reply_markup?: InlineKeyboardMarkup;

  /**
   * Content of the message to be sent instead of the audio
   */
  input_message_content?: InputMessageContent;
}

/**
 * Represents the content of a text message to be sent as the result of an 
 * inline query.
 * @see https://core.telegram.org/bots/api#inputmessagecontent
 */
export interface InputTextMessageContent {
  /**
   * Text of the message to be sent, 1-4096 characters
   */
  message_text: string;

  /**
   * Send Markdown or HTML, if you want Telegram apps to show bold, italic, 
   * fixed-width text or inline URLs in your bot's message.
   * @see https://core.telegram.org/bots/api#markdown-style
   * @see https://core.telegram.org/bots/api#html-style
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;

  /**
   * Disables link previews for links in the sent message
   */
  disable_web_page_preview?: boolean;
}

/**
 * Represents the content of a location message to be sent as the result of 
 * an inline query.
 * @see https://core.telegram.org/bots/api#inputmessagecontent
 */
export interface InputLocationMessageContent {
  /**
   * Latitude of the location in degrees
   */
  latitude: number;

  /**
   * Longitude of the location in degrees
   */
  longitude: number;

  /**
   * Period in seconds for which the location can be updated, should be 
   * between 60 and 86400.
   */
  live_period?: number;
}

/**
 * Represents the content of a venue message to be sent as the result of an 
 * inline query.
 * @see https://core.telegram.org/bots/api#inputmessagecontent
 */
export interface InputVenueMessageContent {
  /**
   * Latitude of the venue in degrees
   */
  latitude: number;

  /**
   * Longitude of the venue in degrees
   */
  longitude: number;

  /**
   * Name of the venue
   */
  title: string;

  /**
   * Address of the venue
   */
  address: string;

  /**
   * Foursquare identifier of the venue, if known
   */
  foursquare_id?: string;
}

/**
 * Represents the content of a contact message to be sent as the result of 
 * an inline query.
 * @see https://core.telegram.org/bots/api#inputmessagecontent
 */
export interface InputContactMessageContent {
  /**
   * Contact's phone number
   */
  phone_number: string;

  /**
   * Contact's first name
   */
  first_name: string;

  /**
   * Contact's last name
   */
  last_name?: string;
}

/**
 * Represents a result of an inline query that was chosen by the user and 
 * sent to their chat partner.
 * @see https://core.telegram.org/bots/api#inlinequeryresult
 */
export interface ChosenInlineResult {
  /**
   * The unique identifier for the result that was chosen
   */
  result_id: string;

  /**
   * The user that chose the result
   */
  from: User;

  /**
   * Sender location, only for bots that require user location
   */
  location?: Location;

  /**
   * Identifier of the sent inline message. Available only if there is an 
   * inline keyboard attached to the message. Will be also received in 
   * callback queries and can be used to edit the message.
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   * @see https://core.telegram.org/bots/api#callbackquery
   * @see https://core.telegram.org/bots/api#updating-messages
   */
  inline_message_id?: string;

  /**
   * The query that was used to obtain the result
   */
  query: string;
}

/**
 * This object represents a portion of the price for goods or services.
 */
export interface LabeledPrice {
  /**
   * Portion label
   */
  label: string;

  /**
   * Price of the product in the smallest units of the currency (integer, not 
   * float/double). For example, for a price of US$ 1.45 pass amount = 145. 
   * See the exp parameter in currencies.json, it shows the number of digits 
   * past the decimal point for each currency (2 for the majority of currencies).
   * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
   * @see https://core.telegram.org/bots/payments/currencies.json
   */
  amount: number;
}

/**
 * This object contains basic information about an invoice.
 */
export interface Invoice {
  /**
   * Product name
   */
  title: string;

  /**
   * Product description
   */
  description: string;

  /**
   * Unique bot deep-linking parameter that can be used to generate this invoice
   */
  start_parameter: string;

  /**
   * Three-letter ISO 4217 currency code
   * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
   */
  currency: string;

  /**
   * Total price in the smallest units of the currency (integer, not 
   * float/double). For example, for a price of US$ 1.45 pass amount = 145. 
   * See the exp parameter in currencies.json, it shows the number of digits 
   * past the decimal point for each currency (2 for the majority of currencies).
   * @see https://core.telegram.org/bots/payments/currencies.json
   */
  total_amount: number;
}

/**
 * This object represents a shipping address.
 */
export interface ShippingAddress {
  /**
   * ISO 3166-1 alpha-2 country code
   */
  country_code: string;

  /**
   * State, if applicable
   */
  state: string;

  /**
   * City
   */
  city: string;

  /**
   * First line for the address
   */
  street_line1: string;

  /**
   * Second line for the address
   */
  street_line2: string;

  /**
   * Address post code
   */
  post_code: string;
}

/**
 * This object represents information about an order.
 */
export interface OrderInfo {
  /**
   * User name
   */
  name?: string;

  /**
   * User's phone number
   */
  phone_number?: string;

  /**
   * User email
   */
  email?: string;

  /**
   * User shipping address
   */
  shipping_address?: ShippingAddress;
}

/**
 * This object represents one shipping option.
 */
export interface ShippingOption {
  /**
   * Shipping option identifier
   */
  id: string;

  /**
   * Option title
   */
  title: string;

  /**
   * List of price portions
   */
  prices: LabeledPrice[];
}

/**
 * This object contains basic information about a successful payment.
 */
export interface SuccessfulPayment {
  /**
   * Three-letter ISO 4217 currency code
   * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
   */
  currency: string;

  /**
   * Total price in the smallest units of the currency (integer, not 
   * float/double). For example, for a price of US$ 1.45 pass amount = 145. 
   * See the exp parameter in currencies.json, it shows the number of digits 
   * past the decimal point for each currency (2 for the majority of currencies).
   * @see https://core.telegram.org/bots/payments/currencies.json
   */
  total_amount: number;

  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;

  /**
   * Identifier of the shipping option chosen by the user
   */
  shipping_option_id?: string;

  /**
   * Order info provided by the user
   */
  order_info?: OrderInfo;

  /**
   * Telegram payment identifier
   */
  telegram_payment_charge_id: string;

  /**
   * Provider payment identifier
   */
  provider_payment_charge_id: string;
}

/**
 * This object contains information about an incoming shipping query.
 */
export interface ShippingQuery {
  /**
   * Unique query identifier
   */
  id: string;

  /**
   * User who sent the query
   */
  from: User;

  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;

  /**
   * User specified shipping address
   */
  shipping_address: ShippingAddress;
}

/**
 * This object contains information about an incoming pre-checkout query.
 */
export interface PreCheckoutQuery {
  /**
   * Unique query identifier
   */
  id: string;

  /**
   * User who sent the query
   */
  from: User;

  /**
   * Three-letter ISO 4217 currency code
   * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
   */
  currency: string;

  /**
   * Total price in the smallest units of the currency (integer, not 
   * float/double). For example, for a price of US$ 1.45 pass amount = 145. 
   * See the exp parameter in currencies.json, it shows the number of digits 
   * past the decimal point for each currency (2 for the majority of currencies).
   * @see https://core.telegram.org/bots/payments/currencies.json
   */
  total_amount: number;

  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;

  /**
   * Identifier of the shipping option chosen by the user
   */
  shipping_option_id?: string;

  /**
   * Order info provided by the user
   */
  order_info?: OrderInfo;
}

/**
 * This object represents a game. Use BotFather to create and edit games, 
 * their short names will act as unique identifiers.
 */
export interface Game {
  /**
   * Title of the game
   */
  title: string;

  /**
   * Description of the game
   */
  description: string;

  /**
   * Photo that will be displayed in the game message in chats.
   */
  photo: PhotoSize[];

  /**
   * Brief description of the game or high scores included in the game 
   * message. Can be automatically edited to include current high scores for 
   * the game when the bot calls setGameScore, or manually edited using 
   * editMessageText. 0-4096 characters.
   * @see https://core.telegram.org/bots/api#setgamescore
   * @see https://core.telegram.org/bots/api#editmessagetext
   */
  text?: string;

  /**
   * Special entities that appear in text, such as usernames, URLs, bot 
   * commands, etc.
   */
  text_entities?: MessageEntity[];

  /**
   * Animation that will be displayed in the game message in chats. Upload 
   * via BotFather
   * @see https://t.me/botfather
   */
  animation?: Animation;
}

/**
 * You can provide an animation for your game so that it looks stylish in 
 * chats (check out Lumberjack for an example). This object represents an 
 * animation file to be displayed in the message containing a game.
 * @see https://core.telegram.org/bots/api#game
 * @see https://t.me/gamebot
 * @see https://core.telegram.org/bots/api#games
 */
export interface Animation {
  /**
   * Unique file identifier
   */
  file_id: string;

  /**
   * Animation thumbnail as defined by sender
   */
  thumb?: PhotoSize;

  /**
   * Original animation filename as defined by sender
   */
  file_name?: string;

  /**
   * MIME type of the file as defined by sender
   */
  mime_type?: string;

  /**
   * File size
   */
  file_size?: number;
}

/**
 * This object represents one row of the high scores table for a game.
 */
export interface GameHighScore {
  /**
   * Position in high score table for the game
   */
  position: number;

  /**
   * User
   */
  user: User;

  /**
   * Score
   */
  score: number;
}

/**
 * Use this method to receive incoming updates using long polling (wiki). 
 * An Array of Update objects is returned.
 * @see http://en.wikipedia.org/wiki/Push_technology#Long_polling
 * @see https://core.telegram.org/bots/api#update
 */
export interface getUpdates {
  /**
   * Optional
   */
  offset: number;

  /**
   * Optional
   */
  limit: number;

  /**
   * Optional
   */
  timeout: number;

  /**
   * Optional
   */
  allowed_updates: string[];
}

/**
 * Use this method to specify a url and receive incoming updates via an 
 * outgoing webhook. Whenever there is an update for the bot, we will send 
 * an HTTPS POST request to the specified url, containing a JSON-serialized 
 * Update. In case of an unsuccessful request, we will give up after a 
 * reasonable amount of attempts. Returns true.
 * @see https://core.telegram.org/bots/api#update
 */
export interface setWebhook {
  /**
   * Yes
   */
  url: string;

  /**
   * Optional
   */
  certificate: InputFile;

  /**
   * Optional
   */
  max_connections: number;

  /**
   * Optional
   */
  allowed_updates: string[];
}

/**
 * Use this method to send text messages. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendMessage {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  text: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  disable_web_page_preview: boolean;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to forward messages of any kind. On success, the sent 
 * Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface forwardMessage {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  from_chat_id: Integer or String;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Yes
   */
  message_id: number;
}

/**
 * Use this method to send photos. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendPhoto {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  photo: InputFile or String;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send audio files, if you want Telegram clients to 
 * display them in the music player. Your audio must be in the .mp3 format. 
 * On success, the sent Message is returned. Bots can currently send audio 
 * files of up to 50 MB in size, this limit may be changed in the future.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendAudio {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  audio: InputFile or String;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  duration: number;

  /**
   * Optional
   */
  performer: string;

  /**
   * Optional
   */
  title: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send general files. On success, the sent Message is 
 * returned. Bots can currently send files of any type of up to 50 MB in 
 * size, this limit may be changed in the future.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendDocument {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  document: InputFile or String;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send video files, Telegram clients support mp4 videos 
 * (other formats may be sent as Document). On success, the sent Message is 
 * returned. Bots can currently send video files of up to 50 MB in size, 
 * this limit may be changed in the future.
 * @see https://core.telegram.org/bots/api#document
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendVideo {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  video: InputFile or String;

  /**
   * Optional
   */
  duration: number;

  /**
   * Optional
   */
  width: number;

  /**
   * Optional
   */
  height: number;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  supports_streaming: boolean;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send audio files, if you want Telegram clients to 
 * display the file as a playable voice message. For this to work, your 
 * audio must be in an .ogg file encoded with OPUS (other formats may be 
 * sent as Audio or Document). On success, the sent Message is returned. 
 * Bots can currently send voice messages of up to 50 MB in size, this 
 * limit may be changed in the future.
 * @see https://core.telegram.org/bots/api#audio
 * @see https://core.telegram.org/bots/api#document
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendVoice {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  voice: InputFile or String;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  duration: number;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 
 * 1 minute long. Use this method to send video messages. On success, the 
 * sent Message is returned.
 * @see https://telegram.org/blog/video-messages-and-telescope
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendVideoNote {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  video_note: InputFile or String;

  /**
   * Optional
   */
  duration: number;

  /**
   * Optional
   */
  length: number;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send a group of photos or videos as an album. On 
 * success, an array of the sent Messages is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendMediaGroup {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  media: InputMedia[];

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;
}

/**
 * Use this method to send point on the map. On success, the sent Message 
 * is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendLocation {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  latitude: number;

  /**
   * Yes
   */
  longitude: number;

  /**
   * Optional
   */
  live_period: number;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to edit live location messages sent by the bot or via 
 * the bot (for inline bots). A location can be edited until its 
 * live_period expires or editing is explicitly disabled by a call to 
 * stopMessageLiveLocation. On success, if the edited message was sent by 
 * the bot, the edited Message is returned, otherwise True is returned.
 * @see https://core.telegram.org/bots/api#inline-mode
 * @see https://core.telegram.org/bots/api#stopmessagelivelocation
 * @see https://core.telegram.org/bots/api#message
 */
export interface editMessageLiveLocation {
  /**
   * Optional
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;

  /**
   * Yes
   */
  latitude: number;

  /**
   * Yes
   */
  longitude: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to stop updating a live location message sent by the bot 
 * or via the bot (for inline bots) before live_period expires. On success, 
 * if the message was sent by the bot, the sent Message is returned, 
 * otherwise True is returned.
 * @see https://core.telegram.org/bots/api#inline-mode
 * @see https://core.telegram.org/bots/api#message
 */
export interface stopMessageLiveLocation {
  /**
   * Optional
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to send information about a venue. On success, the sent 
 * Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendVenue {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  latitude: number;

  /**
   * Yes
   */
  longitude: number;

  /**
   * Yes
   */
  title: string;

  /**
   * Yes
   */
  address: string;

  /**
   * Optional
   */
  foursquare_id: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to send phone contacts. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendContact {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  phone_number: string;

  /**
   * Yes
   */
  first_name: string;

  /**
   * Optional
   */
  last_name: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method when you need to tell the user that something is 
 * happening on the bot's side. The status is set for 5 seconds or less 
 * (when a message arrives from your bot, Telegram clients clear its typing 
 * status). Returns True on success.
 */
export interface sendChatAction {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  action: string;
}

/**
 * Use this method to get a list of profile pictures for a user. Returns a 
 * UserProfilePhotos object.
 * @see https://core.telegram.org/bots/api#userprofilephotos
 */
export interface getUserProfilePhotos {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Optional
   */
  offset: number;

  /**
   * Optional
   */
  limit: number;
}

/**
 * Use this method to get basic info about a file and prepare it for 
 * downloading. For the moment, bots can download files of up to 20MB in 
 * size. On success, a File object is returned. The file can then be 
 * downloaded via the link 
 * https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> 
 * is taken from the response. It is guaranteed that the link will be valid 
 * for at least 1 hour. When the link expires, a new one can be requested 
 * by calling getFile again.
 * @see https://core.telegram.org/bots/api#file
 * @see https://core.telegram.org/bots/api#getfile
 */
export interface getFile {
  /**
   * Yes
   */
  file_id: string;
}

/**
 * Use this method to kick a user from a group, a supergroup or a channel. 
 * In the case of supergroups and channels, the user will not be able to 
 * return to the group on their own using invite links, etc., unless 
 * unbanned first. The bot must be an administrator in the chat for this to 
 * work and must have the appropriate admin rights. Returns True on success.
 * @see https://core.telegram.org/bots/api#unbanchatmember
 */
export interface kickChatMember {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  user_id: number;

  /**
   * Optional
   */
  until_date: number;
}

/**
 * Use this method to unban a previously kicked user in a supergroup or 
 * channel. The user will not return to the group or channel automatically, 
 * but will be able to join via link, etc. The bot must be an administrator 
 * for this to work. Returns True on success.
 */
export interface unbanChatMember {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  user_id: number;
}

/**
 * Use this method to restrict a user in a supergroup. The bot must be an 
 * administrator in the supergroup for this to work and must have the 
 * appropriate admin rights. Pass True for all boolean parameters to lift 
 * restrictions from a user. Returns True on success.
 */
export interface restrictChatMember {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  user_id: number;

  /**
   * Optional
   */
  until_date: number;

  /**
   * Optional
   */
  can_send_messages: boolean;

  /**
   * Optional
   */
  can_send_media_messages: boolean;

  /**
   * Optional
   */
  can_send_other_messages: boolean;

  /**
   * Optional
   */
  can_add_web_page_previews: boolean;
}

/**
 * Use this method to promote or demote a user in a supergroup or a 
 * channel. The bot must be an administrator in the chat for this to work 
 * and must have the appropriate admin rights. Pass False for all boolean 
 * parameters to demote a user. Returns True on success.
 */
export interface promoteChatMember {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  user_id: number;

  /**
   * Optional
   */
  can_change_info: boolean;

  /**
   * Optional
   */
  can_post_messages: boolean;

  /**
   * Optional
   */
  can_edit_messages: boolean;

  /**
   * Optional
   */
  can_delete_messages: boolean;

  /**
   * Optional
   */
  can_invite_users: boolean;

  /**
   * Optional
   */
  can_restrict_members: boolean;

  /**
   * Optional
   */
  can_pin_messages: boolean;

  /**
   * Optional
   */
  can_promote_members: boolean;
}

/**
 * Use this method to generate a new invite link for a chat; any previously 
 * generated link is revoked. The bot must be an administrator in the chat 
 * for this to work and must have the appropriate admin rights. Returns the 
 * new invite link as String on success.
 */
export interface exportChatInviteLink {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to set a new profile photo for the chat. Photos can't be 
 * changed for private chats. The bot must be an administrator in the chat 
 * for this to work and must have the appropriate admin rights. Returns 
 * True on success.
 */
export interface setChatPhoto {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  photo: InputFile;
}

/**
 * Use this method to delete a chat photo. Photos can't be changed for 
 * private chats. The bot must be an administrator in the chat for this to 
 * work and must have the appropriate admin rights. Returns True on success.
 */
export interface deleteChatPhoto {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to change the title of a chat. Titles can't be changed 
 * for private chats. The bot must be an administrator in the chat for this 
 * to work and must have the appropriate admin rights. Returns True on success.
 */
export interface setChatTitle {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  title: string;
}

/**
 * Use this method to change the description of a supergroup or a channel. 
 * The bot must be an administrator in the chat for this to work and must 
 * have the appropriate admin rights. Returns True on success.
 */
export interface setChatDescription {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  description: string;
}

/**
 * Use this method to pin a message in a supergroup or a channel. The bot 
 * must be an administrator in the chat for this to work and must have the 
 * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’ 
 * admin right in the channel. Returns True on success.
 */
export interface pinChatMessage {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  message_id: number;

  /**
   * Optional
   */
  disable_notification: boolean;
}

/**
 * Use this method to unpin a message in a supergroup or a channel. The bot 
 * must be an administrator in the chat for this to work and must have the 
 * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’ 
 * admin right in the channel. Returns True on success.
 */
export interface unpinChatMessage {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method for your bot to leave a group, supergroup or channel. 
 * Returns True on success.
 */
export interface leaveChat {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to get up to date information about the chat (current 
 * name of the user for one-on-one conversations, current username of a 
 * user, group or channel, etc.). Returns a Chat object on success.
 * @see https://core.telegram.org/bots/api#chat
 */
export interface getChat {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to get a list of administrators in a chat. On success, 
 * returns an Array of ChatMember objects that contains information about 
 * all chat administrators except other bots. If the chat is a group or a 
 * supergroup and no administrators were appointed, only the creator will 
 * be returned.
 * @see https://core.telegram.org/bots/api#chatmember
 */
export interface getChatAdministrators {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to get the number of members in a chat. Returns Int on success.
 */
export interface getChatMembersCount {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to get information about a member of a chat. Returns a 
 * ChatMember object on success.
 * @see https://core.telegram.org/bots/api#chatmember
 */
export interface getChatMember {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  user_id: number;
}

/**
 * Use this method to set a new group sticker set for a supergroup. The bot 
 * must be an administrator in the chat for this to work and must have the 
 * appropriate admin rights. Use the field can_set_sticker_set optionally 
 * returned in getChat requests to check if the bot can use this method. 
 * Returns True on success.
 * @see https://core.telegram.org/bots/api#getchat
 */
export interface setChatStickerSet {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  sticker_set_name: string;
}

/**
 * Use this method to delete a group sticker set from a supergroup. The bot 
 * must be an administrator in the chat for this to work and must have the 
 * appropriate admin rights. Use the field can_set_sticker_set optionally 
 * returned in getChat requests to check if the bot can use this method. 
 * Returns True on success.
 * @see https://core.telegram.org/bots/api#getchat
 */
export interface deleteChatStickerSet {
  /**
   * Yes
   */
  chat_id: Integer or String;
}

/**
 * Use this method to send answers to callback queries sent from inline 
 * keyboards. The answer will be displayed to the user as a notification at 
 * the top of the chat screen or as an alert. On success, True is returned.
 * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
 */
export interface answerCallbackQuery {
  /**
   * Yes
   */
  callback_query_id: string;

  /**
   * Optional
   */
  text: string;

  /**
   * Optional
   */
  show_alert: boolean;

  /**
   * Optional
   */
  url: string;

  /**
   * Optional
   */
  cache_time: number;
}

/**
 * Use this method to edit text and game messages sent by the bot or via 
 * the bot (for inline bots). On success, if edited message is sent by the 
 * bot, the edited Message is returned, otherwise True is returned.
 * @see https://core.telegram.org/bots/api#games
 * @see https://core.telegram.org/bots/api#inline-mode
 * @see https://core.telegram.org/bots/api#message
 */
export interface editMessageText {
  /**
   * Optional
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;

  /**
   * Yes
   */
  text: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  disable_web_page_preview: boolean;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to edit captions of messages sent by the bot or via the 
 * bot (for inline bots). On success, if edited message is sent by the bot, 
 * the edited Message is returned, otherwise True is returned.
 * @see https://core.telegram.org/bots/api#inline-mode
 * @see https://core.telegram.org/bots/api#message
 */
export interface editMessageCaption {
  /**
   * Optional
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;

  /**
   * Optional
   */
  caption: string;

  /**
   * Optional
   */
  parse_mode: string;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to edit only the reply markup of messages sent by the 
 * bot or via the bot (for inline bots).  On success, if edited message is 
 * sent by the bot, the edited Message is returned, otherwise True is returned.
 * @see https://core.telegram.org/bots/api#inline-mode
 * @see https://core.telegram.org/bots/api#message
 */
export interface editMessageReplyMarkup {
  /**
   * Optional
   */
  chat_id: Integer or String;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to delete a message, including service messages, with 
 * the following limitations:- A message can only be deleted if it was sent 
 * less than 48 hours ago.- Bots can delete outgoing messages in groups and 
 * supergroups.- Bots granted can_post_messages permissions can delete 
 * outgoing messages in channels.- If the bot is an administrator of a 
 * group, it can delete any message there.- If the bot has 
 * can_delete_messages permission in a supergroup or a channel, it can 
 * delete any message there.Returns True on success.
 */
export interface deleteMessage {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  message_id: number;
}

/**
 * Use this method to send .webp stickers. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendSticker {
  /**
   * Yes
   */
  chat_id: Integer or String;

  /**
   * Yes
   */
  sticker: InputFile or String;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply;
}

/**
 * Use this method to get a sticker set. On success, a StickerSet object is returned.
 * @see https://core.telegram.org/bots/api#stickerset
 */
export interface getStickerSet {
  /**
   * Yes
   */
  name: string;
}

/**
 * Use this method to upload a .png file with a sticker for later use in 
 * createNewStickerSet and addStickerToSet methods (can be used multiple 
 * times). Returns the uploaded File on success.
 * @see https://core.telegram.org/bots/api#file
 */
export interface uploadStickerFile {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Yes
   */
  png_sticker: InputFile;
}

/**
 * Use this method to create new sticker set owned by a user. The bot will 
 * be able to edit the created sticker set. Returns True on success.
 */
export interface createNewStickerSet {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Yes
   */
  name: string;

  /**
   * Yes
   */
  title: string;

  /**
   * Yes
   */
  png_sticker: InputFile or String;

  /**
   * Yes
   */
  emojis: string;

  /**
   * Optional
   */
  contains_masks: boolean;

  /**
   * Optional
   */
  mask_position: MaskPosition;
}

/**
 * Use this method to add a new sticker to a set created by the bot. 
 * Returns True on success.
 */
export interface addStickerToSet {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Yes
   */
  name: string;

  /**
   * Yes
   */
  png_sticker: InputFile or String;

  /**
   * Yes
   */
  emojis: string;

  /**
   * Optional
   */
  mask_position: MaskPosition;
}

/**
 * Use this method to move a sticker in a set created by the bot to a 
 * specific position . Returns True on success.
 */
export interface setStickerPositionInSet {
  /**
   * Yes
   */
  sticker: string;

  /**
   * Yes
   */
  position: number;
}

/**
 * Use this method to delete a sticker from a set created by the bot. 
 * Returns True on success.
 */
export interface deleteStickerFromSet {
  /**
   * Yes
   */
  sticker: string;
}

/**
 * Use this method to send answers to an inline query. On success, True is 
 * returned.No more than 50 results per query are allowed.
 */
export interface answerInlineQuery {
  /**
   * Yes
   */
  inline_query_id: string;

  /**
   * Yes
   */
  results: InlineQueryResult[];

  /**
   * Optional
   */
  cache_time: number;

  /**
   * Optional
   */
  is_personal: boolean;

  /**
   * Optional
   */
  next_offset: string;

  /**
   * Optional
   */
  switch_pm_text: string;

  /**
   * Optional
   */
  switch_pm_parameter: string;
}

/**
 * Use this method to send invoices. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendInvoice {
  /**
   * Yes
   */
  chat_id: number;

  /**
   * Yes
   */
  title: string;

  /**
   * Yes
   */
  description: string;

  /**
   * Yes
   */
  payload: string;

  /**
   * Yes
   */
  provider_token: string;

  /**
   * Yes
   */
  start_parameter: string;

  /**
   * Yes
   */
  currency: string;

  /**
   * Yes
   */
  prices: LabeledPrice[];

  /**
   * Optional
   */
  provider_data: string;

  /**
   * Optional
   */
  photo_url: string;

  /**
   * Optional
   */
  photo_size: number;

  /**
   * Optional
   */
  photo_width: number;

  /**
   * Optional
   */
  photo_height: number;

  /**
   * Optional
   */
  need_name: boolean;

  /**
   * Optional
   */
  need_phone_number: boolean;

  /**
   * Optional
   */
  need_email: boolean;

  /**
   * Optional
   */
  need_shipping_address: boolean;

  /**
   * Optional
   */
  send_phone_number_to_provider: boolean;

  /**
   * Optional
   */
  send_email_to_provider: boolean;

  /**
   * Optional
   */
  is_flexible: boolean;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * If you sent an invoice requesting a shipping address and the parameter 
 * is_flexible was specified, the Bot API will send an Update with a 
 * shipping_query field to the bot. Use this method to reply to shipping 
 * queries. On success, True is returned.
 * @see https://core.telegram.org/bots/api#update
 */
export interface answerShippingQuery {
  /**
   * Yes
   */
  shipping_query_id: string;

  /**
   * Yes
   */
  ok: boolean;

  /**
   * Optional
   */
  shipping_options: ShippingOption[];

  /**
   * Optional
   */
  error_message: string;
}

/**
 * Once the user has confirmed their payment and shipping details, the Bot 
 * API sends the final confirmation in the form of an Update with the field 
 * pre_checkout_query. Use this method to respond to such pre-checkout 
 * queries. On success, True is returned. Note: The Bot API must receive an 
 * answer within 10 seconds after the pre-checkout query was sent.
 * @see https://core.telegram.org/bots/api#update
 */
export interface answerPreCheckoutQuery {
  /**
   * Yes
   */
  pre_checkout_query_id: string;

  /**
   * Yes
   */
  ok: boolean;

  /**
   * Optional
   */
  error_message: string;
}

/**
 * Use this method to send a game. On success, the sent Message is returned.
 * @see https://core.telegram.org/bots/api#message
 */
export interface sendGame {
  /**
   * Yes
   */
  chat_id: number;

  /**
   * Yes
   */
  game_short_name: string;

  /**
   * Optional
   */
  disable_notification: boolean;

  /**
   * Optional
   */
  reply_to_message_id: number;

  /**
   * Optional
   */
  reply_markup: InlineKeyboardMarkup;
}

/**
 * Use this method to set the score of the specified user in a game. On 
 * success, if the message was sent by the bot, returns the edited Message, 
 * otherwise returns True. Returns an error, if the new score is not 
 * greater than the user's current score in the chat and force is False.
 * @see https://core.telegram.org/bots/api#message
 */
export interface setGameScore {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Yes
   */
  score: number;

  /**
   * Optional
   */
  force: boolean;

  /**
   * Optional
   */
  disable_edit_message: boolean;

  /**
   * Optional
   */
  chat_id: number;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;
}

/**
 * Use this method to get data for high score tables. Will return the score 
 * of the specified user and several of his neighbors in a game. On 
 * success, returns an Array of GameHighScore objects.
 * @see https://core.telegram.org/bots/api#gamehighscore
 */
export interface getGameHighScores {
  /**
   * Yes
   */
  user_id: number;

  /**
   * Optional
   */
  chat_id: number;

  /**
   * Optional
   */
  message_id: number;

  /**
   * Optional
   */
  inline_message_id: string;
}