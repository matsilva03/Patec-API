import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { existsSync, mkdirSync } from 'fs'

async function bootstrap() {
  const uploadFolder = process.env.NODE_ENV === 'production' ? './dist/uploads' : '../uploads'

  if (!existsSync(uploadFolder)) {
    mkdirSync(uploadFolder, { recursive: true })
  }

  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    })
  )

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Patec-API')
    .setDescription('API em Node/Express desenvolvida para o Projeto Integrador do 4° semestre do curso de ADS da Fatec. ')
    .setVersion('0.1')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.enableCors()
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
