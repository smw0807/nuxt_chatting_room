/**
 * 권한 및 암호화 관련 함수들
 */

import { 
  hashSync,
  compareSync
 } from 'bcryptjs';

const jwt = require('jsonwebtoken');

const {
  access_time,
  access_key,
  refresh_time,
  refresh_key
} = process.env;

/**
 * 패스워드 암호화
 * @param {String} password 패스워드
 * @returns 
 */
function encryptPassword(password) {
  return hashSync(password, 5);
}

/**
 * 패스워드 확인
 * @param {String} reqPassword 입력 패스워드
 * @param {String} storePassword 저장 패스워드
 * @returns 
 */
function verifyPassword(reqPassword, storePassword) {
  return compareSync(reqPassword, storePassword);
}

/**
 * 
 * @param {Object} info 사용자 정보
 * @param {Boolen} isAccess accessToken 발급 여부
 * @param {Boolen} isRefresh refreshToken 발급 여부
 */
function makeToken(info, isAccess, isRefresh) {
  const result = {
    access: null,
    refresh: null
  }
  const { email, name, nickName, password } = info;

  if (isAccess)
    result.access = jwt.sign({email, name, nickName}, access_key, {expiresIn: access_time});
    
    if (isRefresh)
    result.refresh = jwt.sign({email, name, nickName}, refresh_key, {expiresIn: refresh_time});

  return result;
}

/**
 * accessToken 검증 함수
 * @param {String} token 토큰값
 * @returns 
 */
function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, access_key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  })
}

/**
 * refreshToken 검증 함수
 * @param {String} token  토큰값
 * @returns 
 */
function verifyRefreshToken(token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, refresh_key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  })
}

module.exports = {
  encryptPassword,
  verifyPassword,
  makeToken,
  verifyAccessToken,
  verifyRefreshToken
}