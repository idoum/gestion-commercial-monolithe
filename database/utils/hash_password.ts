/**
 * @file database/utils/hash_password.ts
 * @description Helper pour hasher les mots de passe (bcrypt).
 */
import bcrypt from 'bcryptjs'

export async function hashPassword(plain: string): Promise<string> {
  // @function hashPassword
  // @description Hash un mot de passe en bcrypt (10 rounds).
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plain, salt)
}
