import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { Photo } from './photo';

@EntityModel()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne(type => Photo, photo => photo.metadata)
  @JoinColumn()
  photo: Photo;
}
