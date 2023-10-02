import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  createFile(type: string, file): string {
    try {
      const fileExtrnsion = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExtrnsion}`;
      const fileParh = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(fileParh)) fs.mkdirSync(fileParh, { recursive: true });
      fs.writeFileSync(path.resolve(fileParh, fileName), file.buffer);
      return `${type}/${fileName}`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remoweFile(fileName) {
    try {
      const fileParh = path.resolve(__dirname, '..', 'static');
      fs.unlinkSync(`${fileParh}/${fileName}`);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
