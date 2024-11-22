import bcrypt from "bcryptjs";

export const matchPassword = async (password,encryptedPassword) => {
  return await bcrypt.compare(password,encryptedPassword);
};
