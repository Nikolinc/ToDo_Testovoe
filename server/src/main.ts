import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5500;
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    await app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
