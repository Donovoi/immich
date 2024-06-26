import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto, CreateUserOAuthDto, UpdateUserDto } from 'src/dtos/user.dto';

describe('update user DTO', () => {
  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(UpdateUserDto, {
      email: someEmail,
      id: '3fe388e4-2078-44d7-b36c-39d9dee3a657',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});

describe('create user DTO', () => {
  it('validates the email', async () => {
    const params: Partial<CreateUserDto> = {
      email: undefined,
      password: 'password',
      name: 'name',
    };
    let dto: CreateUserDto = plainToInstance(CreateUserDto, params);
    let errors = await validate(dto);
    expect(errors).toHaveLength(1);

    params.email = 'invalid email';
    dto = plainToInstance(CreateUserDto, params);
    errors = await validate(dto);
    expect(errors).toHaveLength(1);

    params.email = 'valid@email.com';
    dto = plainToInstance(CreateUserDto, params);
    errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(CreateUserDto, {
      email: someEmail,
      password: 'some password',
      name: 'some name',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});

describe('create user oauth DTO', () => {
  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(CreateUserOAuthDto, {
      email: someEmail,
      oauthId: 'some oauth id',
      name: 'some name',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});
