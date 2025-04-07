import swagger from '#config/swagger';
import { BaseCommand } from '@adonisjs/core/ace';
import AutoSwagger from 'adonis-autoswagger';
export default class DocsGenerate extends BaseCommand {
    static commandName = 'docs:generate';
    static description = '';
    static options = {
        startApp: true,
        allowUnknownFlags: false,
        staysAlive: false,
    };
    async run() {
        const Router = await this.app.container.make('router');
        Router.commit();
        await AutoSwagger.default.writeFile(Router.toJSON(), swagger);
    }
}
//# sourceMappingURL=docs_generate.js.map