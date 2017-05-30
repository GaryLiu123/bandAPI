const products = require('../products');

const healthDatas = require('../proposals');

const APIError = require('../rest').APIError;
const APISuccess = require('../rest').APISuccess;


module.exports = {
    //get daily proposal list (in CSV)
    'GET /libff/sprest/goyoProposalService/generateProposalCSV/:date': async (ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        });
    },
    //GOYO proposal submit
    'POST /libff/sprest/goyoProposalService/saveProposal': async (ctx, next) => {
        var p = healthDatas.createProposal(ctx.request.body);
        ctx.rest({
              status : 0,
              errorMessages : [],
              proposalId :p.listId,
              proposalCode : p.proposalCode
        });
    },

    'GET /libff/sprest/goyoProposalService/proposals/:id': async (ctx, next) => {
        console.log(`get product ${ctx.params.id}...`);
        debugger;
        var p = healthDatas.getProposal(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError(0, ['proposal:not_found'], `proposal not found by id. ${ctx.params.id}`);
        }
    },

    //GOYO Health data post
    'POST /libff/sprest/GOYO/healthData': async (ctx, next) => {
        console.info(`health data posted`);
        //console.info(ctx.request.body.healthDatas);
        var p = healthDatas.addHealthData(ctx.request.body.totalCount, ctx.request.body.healthDatas);
        if (p) {
            ctx.rest(new APISuccess('Successful!'));
        } else {
            throw new APIError(1, ['add health data error.'], 'Fail!');
        }
    },
    //retrieve health data
    'GET /libff/sprest/GOYO/healthDatas': async (ctx, next) => {
        ctx.rest({
            healthDatas: healthDatas.getHealthData()
        });
    }
};
