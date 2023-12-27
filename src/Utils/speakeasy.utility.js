import speakeasy from "speakeasy"

export function generateOTP() {
  return speakeasy.totp({
    secret: process.env.SPEAKEASY_SECRET.base32,
    encoding: 'base32',
  });
}

export function verifyOTP(token) {
  return speakeasy.totp.verify({
    secret: process.env.SPEAKEASY_SECRET,
    encoding: 'base32',
    token: token,
  });
}

