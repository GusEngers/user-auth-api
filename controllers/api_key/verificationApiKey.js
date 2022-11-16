'use strict';
const Api_Key = require('../../models/api_key.js');
const ObjectId = require('mongoose').Types.ObjectId;

const verificationHex = (hex) => /^[0-9A-F]+$/ig.test(hex);

const verificationObjectId = (id) => {
	if(!verificationHex(id)) return false;
	if(ObjectId.isValid(id)){
    if((String)(new ObjectId(id)) === id) return true;        
    return false;
  };
  return false;
};

const verificationApiKey = async (api_key) => {
	if(!api_key) throw new Error('An api key is required');
	if(!verificationObjectId(api_key)) throw new Error('Invalid api key');

	const info = await Api_Key.findById(api_key);
	if(!info || !Object.entries(info).length) throw new Error('Invalid api key');
	return true;
};

module.exports = verificationApiKey;