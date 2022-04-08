const Audit = require("../../Models/audits");

const AuditData=function(){

};

AuditData.prototype.insertAudit=async function (params){
    try {
        let result = await Audit.query().insert(params);
        return result;
    } catch (exception) {
        throw exception;
    }
};

module.exports=AuditData;