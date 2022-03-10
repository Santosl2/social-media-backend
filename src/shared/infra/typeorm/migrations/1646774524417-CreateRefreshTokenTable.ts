import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRefreshTokenTable1646774524417
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "expiresIn",
            type: "int",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "refresh_tokens",
      new TableForeignKey({
        name: "FKUserId",
        columnNames: ["userId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("refresh_tokens", "FKUserId");

    await queryRunner.dropTable("refresh_tokens");
  }
}
