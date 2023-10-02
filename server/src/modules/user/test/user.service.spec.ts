import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  // it('should create a new user', async () => {
  //   const createUserDto: CreateUserDTO = {
  //     Firstname: 'Nikita',
  //     Lastname: 'Tsigulsky',
  //     Email: 'tsigulskynikita@gmail.com',
  //     Password: 'qwerty',
  //     Address: '0xC743928f1bF20bD62A9D67EeBC489345b2318281',
  //   };
  //   const result = await userService.create(createUserDto);
  //   expect(result).toEqual('mockUser');
  // });

  // it('should upload user avatar', async () => {
  //   const avatarFile = /* заглушка для файла */;
  //   const result = await userService.uploadAvatar(userId, avatarFile);

  //   expect(mockFileUploadService.upload).toHaveBeenCalledWith(avatarFile);
  //   expect(result).toEqual('mock-avatar-path');
  // });
});
