const Controller = require('./Controller');

class Agrobase extends Controller {
    constructor() {
        super();
    }

    async getJobs() {
        var arr = []

        const html = await this.RequestPromise('https://www.agrobase.com.br/oportunidades/vagas/emprego-nutricionista/?tag=pernambuco');
            const $ = this.Cheerio.load(html);
            const header = $('div.term-title');
            const jobs = $('div.post-template.post-t4.even');
            jobs.each((i, element) => {
                const jobElement = $(element);
                const title = jobElement.find('h3.post-title').text();
                const city = jobElement.find('.ico16-local').text();
                const salary = jobElement.find('.ico16-salario').text();
                const company = jobElement.find('.ico16-empresa').text();
                const description = jobElement.find('p').text();
                arr.push(this.JobTemplate({title, city, salary, company, description}));
            });
        return arr;
    }
}

module.exports = new Agrobase;