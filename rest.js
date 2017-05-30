module.exports = {
    APIError: function (status, errorMessages, message) {
        this.status = status || 1;
        this.errorMessages = errorMessages || [];
        this.message = message || '';
    },
    APISuccess: function(message) {
        this.status = 0;
        this.errorMessages = [];
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/libff/sprest/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith('/libff/sprest/goyoProposalService/generateProposalCSV')) {
                console.log(`Process CSV ${ctx.request.method} ${ctx.request.url}...`);
                ctx.csv = (data) => {
                    let fileName = `proposal-${ctx.params.date}`;
                    ctx.response.attachment(fileName + '.csv');
                    ctx.response.type = 'application/csv';
                    ctx.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    console.log('Process CSV error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        status: e.status || 'internal:unknown_error',
                        errorMessages: e.errorMessages || [],
                        message: e.message || ''
                    };
                }

            } else
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        status: e.status || 'internal:unknown_error',
                        errorMessages: e.errorMessages || [],
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};
