import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:DJxawOWvdsdBnn4y@finalproject.0siimhv.mongodb.net/',
    ),
    UsersModule,
    AdminModule,
    AddressModule,
    CategoryModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
