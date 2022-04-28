// import { Provide } from '@midwayjs/decorator';
// import { InjectEntityModel } from '@midwayjs/orm';
// import { Photo } from '../entity/photo';
// import { PhotoMetadata } from '../entity/photoMetadata';
// import { Repository } from 'typeorm';
//
// @Provide()
// export class PhotoService {
//   @InjectEntityModel(Photo)
//   photoModel: Repository<Photo>;
//
//   @InjectEntityModel(PhotoMetadata)
//   photoMetadataModel: Repository<PhotoMetadata>;
//
//   async updatePhoto() {
//     // create a photo
//     const photo = new Photo();
//     photo.name = 'Me and Bears';
//     photo.description = 'I am near polar bears';
//     photo.filename = 'photo-with-bears.jpg';
//     photo.isPublished = true;
//     photo.views = 1;
//
//     // create a photo metadata
//     const metadata = new PhotoMetadata();
//     metadata.height = 640;
//     metadata.width = 480;
//     metadata.compressed = true;
//     metadata.comment = 'cybershoot';
//     metadata.orientation = 'portrait';
//     metadata.photo = photo; // this way we connect them
//
//     // first we should save a photo
//     await this.photoModel.save(photo);
//
//     // photo is saved. Now we need to save a photo metadata
//     await this.photoMetadataModel.save(metadata);
//
//     // done
//     console.log(
//       'Metadata is saved, and relation between metadata and photo is created in the database too'
//     );
//   }
// }
