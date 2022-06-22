import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSocialConnections extends BaseSchema {
    protected tableName = 'user_social_connections'

    public async up() {
        this.schema.createTable(this.tableName, table => {
            table.integer('user_id').unique().primary().notNullable()
            table.string('provider').notNullable()
            table.string('connection').notNullable()
            table.string('is_social').notNullable()
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
