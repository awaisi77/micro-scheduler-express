const audit = require("../../Models/audits");
const AuditData=require("../data/auditData");

const AuditManager=function(){

}

AuditManager.prototype.insertAudit=async function(params){
    try{
        const auditData=new AuditData();
        const result=await auditData.insertAudit(params);
        return result;
    }catch(error){
        throw error;
    }

}
module.exports=AuditManager;