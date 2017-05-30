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
            // if () {
            //   res.attachment('filename.csv');
            //   res.status(200).send(data);
            //
            // } else
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
                    debugger;
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
