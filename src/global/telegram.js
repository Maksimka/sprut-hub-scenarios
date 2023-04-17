let chatIDs = ["777777777"];
let token = "666666666:AABBCCddEeffggeeHH-IIJJkKLlMmnno_oP"

function sendToTelegram(text, notify) {
    try {
        if (!Array.isArray(text))
            text = [text];

        chatIDs.forEach(function (chatID) {
            HttpClient.POST("https://api.telegram.org")
                .path("bot" + token)
                .path("sendMessage")
                .queryString("chat_id", chatID)
                .queryString("text", text.join("\n"))
                .queryString("parse_mode", "Markdown")
                .queryString("disable_notification", notify == null ? false : !notify)
                .send()
        })
    } catch (e) {
        log.error(e.message);
    }
}

function sendPhotoToTelegram(binary,caption) {
    try {
        if (!caption) {caption = ""}
        chatIDs.forEach(function (chatID) {
            HttpClient.POST('https://api.telegram.org')
                .path("bot" + token)
                .path("sendPhoto")
                .queryString("chat_id", chatID)
                .queryString('caption', caption)
                .fieldMultipart('photo', binary)
                .send();
        })
    } catch (e) {
        log.error(e.message);
    }
}
sendToTelegram(["*Мой город*", "Sprut Hub запущен"])
