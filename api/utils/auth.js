/**
 * 권한 및 암호화 관련 함수들
 */

import { 
  hashSync,
  compareSync
 } from 'bcryptjs';

/**
 * 패스워드 암호화
 * @param {패스워드} password 
 * @returns 
 */
function encryptPassword(password) {
  return hashSync(password, 5);
}

/**
 * 패스워드 확인
 * @param {입력 패스워드} reqPassword 
 * @param {저장 패스워드} storePassword 
 * @returns 
 */
function verifyPassword(reqPassword, storePassword) {
  return compareSync(reqPassword, storePassword);
}

module.exports = {
  encryptPassword,
  verifyPassword
}