const axios = require("axios");
const https = require("https");
const { wrapCommonReqParams } = require('./utils');

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


async function get(appKey, appSecretKey, endpoint, url, sendParams, acessToken = null) {
    let resp = null;
    try {
        resp = await axiosInstance.get(`${endpoint}${url}`, {
            params: {
                ...wrapCommonReqParams(appKey, appSecretKey, url, acessToken),
                ...sendParams
            }
        });
        return resp.data;
    } catch (error) {
        throw error.response ? error.response.data : error.code;
    }
}

async function post(appKey, appSecretKey, endpoint, url, sendParams, acessToken = null) {
    let resp = null;
    try {
        resp = await axiosInstance.post(`${endpoint}${url}`, sendParams, {
            params: wrapCommonReqParams(appKey, appSecretKey, url, acessToken)
        });
        return resp.data;
    } catch (error) {
        throw error.response ? error.response.data : error.code;
    }
}


async function put(appKey, appSecretKey, endpoint, url, sendParams, acessToken = null) {
    let resp = null;
    try {
        resp = await axiosInstance.put(`${endpoint}${url}`, sendParams, {
            params: wrapCommonReqParams(appKey, appSecretKey, url, acessToken)
        });
        return resp.data;
    } catch (error) {
        throw error.response ? error.response.data : error.code;
    }
}

async function httpDelete(appKey, appSecretKey, endpoint, url, sendParams, acessToken = null) {
    let resp = null;
    try {
        resp = await axiosInstance.delete(`${endpoint}${url}`, {
            params: {
                ...wrapCommonReqParams(appKey, appSecretKey, url, acessToken),
                ...sendParams
            }
        });
        return resp.data;
    } catch (error) {
        throw error.response ? error.response.data : error.code;
    }
}

exports.httpGet = get;
exports.httpPost = post;
exports.httpPut = put;
exports.httpDelete = httpDelete;


