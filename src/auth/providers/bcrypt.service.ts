import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class BcryptService implements HashingService {
  async hashPassword(data: string | Buffer): Promise<string> {
    const salt: string = await bcryptjs.genSalt();
    const hash: string = await bcryptjs.hash(data.toString(), salt);
    return hash;
  }
  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    const result: boolean = await bcryptjs.compare(data.toString(), encrypted);
    return result;
  }
}
