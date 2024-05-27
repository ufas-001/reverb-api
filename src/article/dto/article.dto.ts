export class CreateArticleDto {
  readonly header: string;
  readonly link: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
