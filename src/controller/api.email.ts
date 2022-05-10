import {Inject, Controller, Post, Body, Get, Query} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as nodemailer from 'nodemailer';
import {Web2UserEmail} from "../interface";
import {Web2UsersService} from "../service/web2.user.service";

const randomFns=()=> { // 生成6位随机数
  let code = '';
  for(let i= 0;i<6;i++){
    code += parseInt(String(Math.random() * 10));
  }
  return code;
};

const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;


@Controller('/api/email')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  web2UserService: Web2UsersService;

  @Get('/check_code')
  async check_code(@Query() queryData) {
    const email = queryData.email;
    const code = queryData.code;
    const input = {
      email,
      code
    }
    const result = await this.web2UserService.findUserCode(input)
    if (result){
      const user_near_data = await this.web2UserService.findUserNear(email);
      return user_near_data;
    }else{
      return 'no code'
    }
  }


  @Post('/send')
  async send(@Body() input:Web2UserEmail) {
    const email = input.email;
    const email_check = regEmail.test(email);
    if (email_check){
      const code = randomFns();
      const transporter = nodemailer.createTransport({
        host: 'smtp.88.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'tansh@88.com', // generated ethereal user
          pass: 'kGNsvpWthCgNCrwu', // generated ethereal password
        },
      });
      // create reusable transporter object using the default SMTP transport
      const result = await transporter.sendMail({
        from: 'tansh@88.com', // 发件邮箱
        to: `${email}`, // 收件列表
        subject: `${code} is your XX verification code`, // 标题
        html: `
            <p>Your XX verification code is: ${code}. </p>
            <p><strong style="color: #ff4e2a;">*** Please complete the account verification process in 10 minutes. ***</strong></p>`, // html 内容
      }
      );
      const input_data = {
        email,
        code
      }
      await this.web2UserService.addUserCode(input_data);
      console.log(result);
      return 'ok';
    }else{
      return 'error email';
    }
  }
}
