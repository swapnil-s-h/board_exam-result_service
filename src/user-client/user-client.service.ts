import { Injectable, NotFoundException } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClientService {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(userId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.USER_SERVICE_URL}/internal/users/${userId}`,
          {
            headers: {
              'X-Internal-Api-Key': process.env.INTERNAL_API_KEY,
            },
          },
        ),
      );

      return response;
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
