import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('first_name', 255).notNullable()
            table.string('last_name', 255).notNullable()
            table.string('type').notNullable()
            table.string('email', 255).unique().notNullable()
            table.string('password', 180).notNullable()
            table.string('remember_me_token').nullable()
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('deleted_at', { useTz: true })
            table.timestamp('created_at', { useTz: true }).notNullable()
            table.timestamp('updated_at', { useTz: true }).notNullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
