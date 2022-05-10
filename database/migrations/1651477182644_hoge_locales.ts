import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HogeLocales extends BaseSchema {
    protected tableName = 'hoge_locales'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('hoge_id').notNullable()
            table.string('name', 255).notNullable()
            table.string('type', 255).notNullable()
            table.string('code').notNullable()
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
