import { Module } from '@nestjs/common';
import { FileModule } from './shared/file/file.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/projects/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'shared/static'),
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    ),
    UserModule,
    ProjectModule,
    FileModule,
  ],
})
export class AppModule {}
