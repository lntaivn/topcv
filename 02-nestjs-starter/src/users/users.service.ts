import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassWord = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(pass: string, hash: string) {
    return compareSync(pass, hash);
  }

  async create(createUserDto: CreateUserDto) {
    let hashPassWord = this.getHashPassWord(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassWord,
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'ID không chính xác';
    return this.userModel.findOne({
      _id: id,
    });
  }

  findOneByUsername(username: string) {
   
    return this.userModel.findOne({
      email: username
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'ID không chính xác';
    return this.userModel.deleteOne({
      _id: id,
    });
  }
}
