import { ConfigService } from '@nestjs/config';

export const getMongoURI = (configService: ConfigService): Promise<string> => {
  return configService.get('MONGO_URI');
};
