import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Locale from 'App/Models/Locale'

export default class LocaleSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await Locale.createMany([
            {
                name: '日本語',
                originalName: '日本語',
                code: 'ja-jp',
            },
            {
                name: '英語',
                originalName: 'English',
                code: 'us-en',
            },
            {
                name: '中国語',
                originalName: '汉语',
                code: 'zh-tw',
            },
            {
                name: '韓国語',
                originalName: '한국어',
                code: 'kr-kr',
            },
        ])
    }
}
