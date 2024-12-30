import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
      {
        name: 'BORROW_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3005 },
      },
    ]),
  ],
})
export class AppModule {}
