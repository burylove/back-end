// import { Inject, Controller, Get, Post, Query } from '@midwayjs/decorator';
// import { Context } from '@midwayjs/koa';
// import { UserService } from '../service/user.service';
// import { UsersService } from '../service/users.service';
// // import { AuthenticationClient } from 'authing-js-sdk';
// // const authenticationClient = new AuthenticationClient({
// //   appId: '61a24b25124b24612c180d6c',
// //   appHost: 'https://playertest.authing.cn',
// // });
// //
// // await authenticationClient.social.authorize('github', {
// //   popup: false,
// //   onSuccess: user => {
// //     console.log(user);
// //   },
// //   onError: (code, message) => {},
// // });
// import { Repository } from 'typeorm';
// import { InjectEntityModel } from '@midwayjs/orm';
// import { User } from '../entity/user';
// import { PhotoService } from '../service/photo.service';
//
// @Controller('/api')
// export class APIController {
//   @Inject()
//   ctx: Context;
//
//   @Inject()
//   userService: UserService;
//
//   @Inject()
//   usersService: UsersService;
//
//   @Inject()
//   photoService: PhotoService;
//
//   @InjectEntityModel(User)
//   photoModel: Repository<User>;
//
//   @Get('/get_user')
//   async getUser(@Query() queryData) {
//     console.log(queryData);
//     const uid = queryData.uid;
//     const url = queryData.url;
//     const user = await this.userService.getUser({ uid, url });
//     return { success: true, message: 'OK', data: user };
//   }
//
//   @Post('/addPhoto')
//   async addPhoto() {
//     const user = await this.photoService.updatePhoto();
//     console.log(user);
//   }
//
//   @Get('/get_users')
//   async getUsers(@Query() queryData) {
//     console.log(queryData);
//     const user = await this.usersService.findUsers();
//     return { success: true, message: 'OK', data: user };
//   }
//
//   @Post('/login')
//   async addUser() {
//     const user = await this.usersService.saveUser();
//     console.log(user);
//   }
//
//   @Post('/update')
//   async UpdateUsers() {
//     const user = await this.usersService.UpdateUsers();
//     console.log(user);
//   }
//
//   @Post('/remove')
//   async RemoveUsers() {
//     const user = await this.usersService.RemoveUsers();
//     console.log(user);
//   }
// }
