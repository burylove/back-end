// import { Provide } from '@midwayjs/decorator';
// import { InjectEntityModel } from '@midwayjs/orm';
// import { User } from '../entity/user';
// import { Repository } from 'typeorm';
//
// @Provide()
// export class UsersService {
//   @InjectEntityModel(User)
//   usersModel: Repository<User>;
//
//   // save
//   async saveUser() {
//     const user = new User();
//     user.name = 'Me and Bears';
//     user.description = 'a';
//     user.filename = 'b';
//
//     // save entity
//     const userResult = await this.usersModel.save(user);
//
//     // save success
//     console.log(userResult);
//   }
//
//   async findUsers() {
//     // find All
//     const allUsers = await this.usersModel.find({}); //  v0.3.x
//     console.log('All allUsers from the db: ', allUsers);
//
//     // find first
//     const firstUsers = await this.usersModel.findOne({
//       //  v0.3.x
//       where: {
//         id: 1,
//       },
//     });
//     console.log('First Users from the db: ', firstUsers);
//
//     // find one by name
//     //  v0.3.x
//     const meAndBearsUsers = await this.usersModel.findOne({
//       where: { name: 'Me and Bears' },
//     });
//     console.log('Me and Bears photo from the db: ', meAndBearsUsers);
//
//     // find and get count
//     //  v0.3.x
//     const [allUsersInfo, UsersCount] = await this.usersModel.findAndCount({});
//     console.log('All allUsersInfo: ', allUsersInfo);
//     console.log('UsersCount count: ', UsersCount);
//   }
//
//   async UpdateUsers() {
//     const UsersToUpdate = await this.usersModel.findOne({
//       where: { id: 4 },
//     });
//     UsersToUpdate.name = 'xiaole';
//
//     await this.usersModel.save(UsersToUpdate);
//   }
//
//   async RemoveUsers() {
//     const UsersToRemove = await this.usersModel.findOne({
//       where: { id: 2 },
//     }); // typeorm@0.2.x
//     await this.usersModel.remove(UsersToRemove);
//   }
// }
