
const APIError = require('./rest').APIError;

//health data
function HealthData(totalCount, healthDatas) {
    this.totalCount = totalCount;
    this.healthDatas = healthDatas;
}

var mHealthDatas = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
var id = getRandomInt(100100,500000);

function nextId() {
    id++;
    return id;
}

function getProposalNo() {
  return getRandomInt(100000000,900000000) + 90000000000;
}

//proposal
function Proposal(proposal1) {
    var proposal = proposal1.proposalInfo;
    if (!proposal.insureds) throw new APIError(1, ['no insured information'], 'Fail!');
    if (!proposal.mainCoverages) throw new APIError(1, ['no main coverages information'], 'Fail!');

    var todayTime = Date.now();
    var today = todayTime;

    this.listId= nextId().toString();
    this.proposalCode= getProposalNo().toString();
    this.policyCode= null;
    this.productId= proposal.productId || '9100271';
    this.packageId= proposal.packageId || '9100271';
    this.submitChannel= null;
    this.phName= 'GOYO'
    this.phGrnder= 'N'
    this.phCertiType= 0
    this.phCertiCode= 'OTHER'
    this.laName= proposal.insureds[0].name;
    this.laGrnder= proposal.insureds[0].gender;
    this.laCertiType= proposal.insureds[0].certiType;
    this.laCertiCode= proposal.insureds[0].certiCode;
    this.status= 80;
    this.signSite= null;
    this.attriChannel= null;
    this.propSignDate= today;
    this.takeEffectDate= null;
    this.producerId= 10632;
    this.sa= proposal.mainCoverages[0].sa;
    this.yearlyPrem= proposal.mainCoverages[0].premium;
    this.inforceDate= today;
    this.insertedBy= 10632;
    this.updatedBy= null;
    this.insertTime= todayTime;
    this.updateTime= todayTime;
    this.insertTimestamp= todayTime;
    this.updateTimestamp= todayTime;
    this.salesChannelCode= 'GOYO';
    this.salesCompanyCode= 'GOYO';
    this.tenantCode= 'UAL';

    this.proposalInfo=proposal;

}

var proposals = [];

module.exports = {
    addHealthData: (totalCount, healthDatas) => {
      //check count
      if (totalCount !== healthDatas.length)
          throw new APIError(1, ['list size not eq totalCount !'], 'Fail!');
      //debugger;
      var h = new HealthData (totalCount, healthDatas);

      for (var i in healthDatas) {
        mHealthDatas.push(healthDatas[i]);
      }
      return h.totalCount;
    },

    getHealthData: () => {
      return mHealthDatas;
    },

    createProposal: (proposal) => {
      var p = new Proposal (proposal);
      proposals.push(p);

      return p;
    },

    getProposal: (id) => {
        var i;
        for (i = 0; i < proposals.length; i++) {
            if (proposals[i].listId === id) {
                return proposals[i];
            }
        }
        return null;
    },
};
