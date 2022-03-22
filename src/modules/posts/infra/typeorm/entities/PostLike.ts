import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

import Post from "./Post";

@Entity("posts_likes")
class PostLike {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  post_id: string;

  @ManyToMany(() => Post)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default PostLike;
