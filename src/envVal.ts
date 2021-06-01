import dotenv from 'dotenv';

dotenv.config();

export interface EnvValType {
  mongoConnectionString: string;
  adminUser: string;
  adminPass: string
} 

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.MONGO_CONNECTION_STRING || 
    !process.env.ADMIN_USER || 
    !process.env.ADMIN_PASS
    ) {
      throw new Error('Invalid .env file, some values are undefined, please check .env.example to see what you are missing');
  }

  return {
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
    adminUser: process.env.ADMIN_USER,
    adminPass: process.env.ADMIN_PASS,
  };
}

export const envVal: EnvValType = loadEnvVals();
