using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.Services.DTOs;

namespace WebAPIInsuranceManagementSystem.Services.Services.IServices
{
    public interface IAuditLogService
    {
        Task LogBuyPolicyAction(UserPolicyDTO userPolicyDTO, bool isSuccess);
        Task LogCreateClaimAction(ClaimDTO claimDTO, bool isSuccess);
        Task LogLoginAction(User user, bool isSuccess);
        Task LogRegisterAction(User user, bool isSuccess);
        Task LogLogoutAction(int userId, bool isSuccess);
        Task<List<AuditLogDTO>> GetAuditLogs();

    }
}
