import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await User.createMany([
            {
                firstName: '管理者',
                lastName: '太郎',
                type: 'admin',
                email: 'root@example.com',
                password: 'pass1234',
            },
        ])
    }
}
