import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:DJxawOWvdsdBnn4y@finalproject.0siimhv.mongodb.net/dev',
      // 'mongodb+srv://admin:DJxawOWvdsdBnn4y@finalproject.0siimhv.mongodb.net/prod',
    ),
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
