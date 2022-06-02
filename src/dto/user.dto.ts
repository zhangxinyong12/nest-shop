import {
  IsString,
  IsInt,
  Length,
  Contains,
  Min,
  Max,
  IsEmail,
  IsFQDN,
  IsDate,
  ValidationArguments,
  ValidateIf,
  IsOptional,
  IsNumber,
  IsNumberString,
  MaxLength,
} from 'class-validator';
// https://github.com/typestack/class-validator#usage
// export class Post {
//   @Length(10, 20)
//   title: string;

//   @Contains('hello')
//   text: string;

//   @IsInt()
//   @Min(0)
//   @Max(10)
//   rating: number;

//   @IsEmail()
//   email: string;

//   @IsFQDN()
//   site: string;

//   @IsDate()
//   createDate: Date;
// }
export class UserDto {
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），如果是，则忽略该属性上的所有验证器。
  @IsString({ message: 'name 必填项' })
  name: string;

  // @IsInt()
  // age: number;

  @IsString()
  breed: string;

  // @ValidateIf((o) => o.otherProperty !== undefined)
  @IsNumberString()
  // @IsOptional()
  height?: number; // 非必填

  // 当提供的条件函数返回 false 时，条件验证装饰器 ( @ValidateIf) 可用于忽略属性上的验证器。条件函数接受正在验证的对象，并且必须返回一个boolean.
  @ValidateIf((o) => o.other)
  @MaxLength(10)
  @IsString()
  other?: string;
}
