// version 1.7.6
// https://pastebin.com/YX1mm9h6

let chatIDs = [];
let token = ''

let feed = {};
let gCallbacks = {};
let gCommands = {};

let callbackTs = 0;
let startTime = Math.floor(Date.now() / 1000);

function tg(key) {
    let id = Date.now() + Math.random().toString(36);

    let chats = [];
    let messages = [];
    let silent = false;
    let throttleSec = 0;
    let photoPayload = null;
    let buttons = [];

    let bot = global.variables && global.variables['tg:token'] || token;
    let defaultChats = global.variables && global.variables['tg:chat_id'] || chatIDs || [];
    if (!Array.isArray(defaultChats)) defaultChats = [defaultChats];

    var builder = {
        line: function(text) {
            messages.push(text);
            return builder;
        },
        silent: function(enabled) {
            silent = enabled !== undefined ? enabled : true;
            return builder;
        },
        throttle: function(sec) {
            throttleSec = sec;
            return builder;
        },
        image: function(payload) {
            photoPayload = payload;
            return builder;
        },
        chat: function (/**/) {
            var args = Array.prototype.slice.call(arguments);
            args.forEach(function (chatId) {
                if (Array.isArray(chatId)) {
                    chats.push.apply(chats, chatId);
                } else {
                    chats.push(chatId);
                }
            });
            return builder;
        },
        button: function(text, callback) {
            buttons.push({ text: text, callback: callback, data: id + (buttons.length + 1) });
            return builder;
        },
        watch: function(key, callback) {
            gCommands[key] = callback;
            return true;
        },
        send: function(/**/) {
            var args = Array.prototype.slice.call(arguments);
            args.forEach(function (line) {
                if (Array.isArray(line)) {
                    messages.push.apply(messages, line);
                } else {
                    messages.push(line);
                }
            });

            let now = Math.floor(Date.now() / 1000);
            if (!!key && feed[key] !== undefined && now - feed[key] <= throttleSec) return;
            feed[key] = now;

            if (!chats.length) chats = defaultChats;

            chats.forEach(function (chatID) {
                try {
                    let request = HttpClient.POST("https://api.telegram.org")
                        .path("bot" + bot)
                        .path(photoPayload == null ? 'sendMessage' : 'sendPhoto')
                        .queryString('chat_id', chatID)
                        .queryString(photoPayload == null ? 'text' : 'caption', messages.join("\r\n"))
                        .queryString("parse_mode", "Markdown")
                        .queryString("disable_notification", silent);
                    if (photoPayload != null) {
                        request = typeof photoPayload === 'string' || photoPayload instanceof String
                            ? request.field('photo', photoPayload)
                            : request.fieldMultipart('photo', photoPayload);
                    }
                    if (buttons.length) {
                        var keyboard = {
                            "inline_keyboard": [
                                buttons.map(function(b) {
                                    return {
                                        "text": b.text,
                                        "callback_data": b.data
                                    };
                                })
                            ]
                        };
                        callbackTs = now;
                        buttons.forEach(function (b) { gCallbacks[b.data] = b.callback });
                        request = request.queryString('reply_markup', JSON.stringify(keyboard));
                    }
                    request.send();
                } catch (e) {
                    log.error(e.message);
                }
            })
        }
    }

    return builder;
}

function tgWatch() {
    let bot = global.variables && global.variables['tg:token'] || token;
    if (GlobalVariables.tg_loop != null) {
        clearInterval(GlobalVariables.tg_loop);
    }
    let loop = function () {
        if (!Object.keys(gCallbacks).length && !Object.keys(gCommands).length) return;

        let now = Math.floor(Date.now() / 1000);
        if (now - callbackTs > 3600) gCallbacks = {};

        let offset = GlobalVariables.__tg_offset || 0;
        let body = HttpClient.GET("https://api.telegram.org")
            .path("bot" + bot)
            .path('getUpdates')
            .queryString('offset', offset)
            .send()
            .getBody()
        JSON.parse(body).result.forEach(function (r) {
            if (r.update_id < offset) return;
            GlobalVariables.__tg_offset = r.update_id + 1;
            try {
                if (!!r.callback_query && gCallbacks[r.callback_query.data] != undefined) gCallbacks[r.callback_query.data](tg());
                if (!!r.message && r.message.date >= startTime && gCommands[r.message.text] != undefined) gCommands[r.message.text](tg());
            } catch (e) {
                log.error(e.message);
            }
        });
    };
    GlobalVariables.tg_loop = setInterval(loop, 5000);
}

// поддержка родных скриптов
function sendToTelegram(text, notify) {
    let t = tg();
    if (Array.isArray(text)) {
        text.forEach(function (txt) { t = t.line(txt); })
    } else {
        t = t.line(text);
    }
    
    t.silent(notify === undefined ? false : !notify).send();
}