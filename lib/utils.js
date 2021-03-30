const crypto = require("crypto");

const IV_LENGTH = 16; 

function hashRequest(path, appSecretKey, params) {
    let preSignString = `APP_KEY${params["APP_KEY"]}TIMESTAMP${params["TIMESTAMP"]}`;
    const hash = crypto
        .createHmac("sha256", appSecretKey)
        .update(path + preSignString)
        .digest("hex")
    return hash.toUpperCase();
}

function wrapCommonReqParams(appKey, appSecretKey, path, accessToken = null) {
    let sendParams = {
        APP_KEY: appKey,
        TIMESTAMP: new Date().getTime().toString(),
        ...(accessToken ? { ACCESS_TOKEN: accessToken } : {})
    };
    sendParams["SIGN"] = hashRequest(path, appSecretKey, sendParams);
    return sendParams;
}

function encryptString(appSecretKey, text) {
    let iv = crypto.randomBytes(IV_LENGTH);

    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(appSecretKey, 'utf-8'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('base64') + ':' + encrypted.toString('base64');
}

exports.wrapCommonReqParams = wrapCommonReqParams;
exports.encryptString = encryptString;