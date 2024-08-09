import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({},{message:"email không đúng định dạng"})
  @IsNotEmpty({
    message:"email không được để trống"
  })
  email: string;

  @IsNotEmpty()
  password: string;
  name: string;
  address: string;
}
