using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;

namespace WebAPIInsuranceManagementSystem.Services.Services
{
    public class AuditLogService : IAuditLogService
    {
        private readonly IAuditLogRepository _auditLogRepository;

        public AuditLogService(IAuditLogRepository auditLogRepository)
        {
            _auditLogRepository = auditLogRepository;
        }

        public async Task LogAsync(AuditLogDTO auditLog)
        {
            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        public async Task LogBuyPolicyAction(UserPolicyDTO userPolicyDTO, bool isSuccess)
        {
            AuditLogDTO auditLog = new AuditLogDTO
            {
                UserId = userPolicyDTO.UserId,
                Action = "Buy Policy",
                Category = "Policy",
                Details = isSuccess ? $"PolicyId: {userPolicyDTO.PolicyId}" : "Error occurred during policy purchase",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        public async Task LogCreateClaimAction(ClaimDTO claimDTO, bool isSuccess)
        {
            var auditLog = new AuditLogDTO
            {
                UserId = claimDTO.UserId,
                Action = "Create Claim",
                Category = "Claim",
                Details = isSuccess ? $"Claimed Successfully" : "Error occurred During claim",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        } 
        public async Task LogLoginAction(User user, bool isSuccess)
        {
            var auditLog = new AuditLogDTO
            {
                UserId = user.Id,
                Action = "User logged In",
                Category = "Auth",
                Details = isSuccess ? $"Login successful" : "Error in login",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        public async Task LogRegisterAction(User user, bool isSuccess)
        {
            var auditLog = new AuditLogDTO
            {
                UserId = user.Id,
                Action = "New user registered successfully",
                Category = "Auth",
                Details = isSuccess ? $"Registeration successful" : "Error in Registration",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        public async Task LogLogoutAction(User user, bool isSuccess)
        {
            var auditLog = new AuditLogDTO
            {
                UserId = user.Id,
                Action = "New user registered successfully",
                Category = "Auth",
                Details = isSuccess ? $"Registeration successful" : "Error in Registration",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        public async Task LogLogoutAction(int userId, bool isSuccess)
        {
            var auditLog = new AuditLogDTO
            {
                UserId = userId,
                Action = "User Loggedout",
                Category = "Auth",
                Details = isSuccess ? $"Logout successful" : "Error in Logout",
                IsSuccess = isSuccess
            };

            await _auditLogRepository.AddAuditLog(ConvertToAuditLog(auditLog));
        }

        //**********************************convert method*********************************************
        private AuditLog ConvertToAuditLog(AuditLogDTO auditLogDTO)
        {
            return new AuditLog
            {
                UserId = auditLogDTO.UserId,
                Timestamp = DateTime.Now,
                Action = auditLogDTO.Action,
                Category = auditLogDTO.Category,
                Details = auditLogDTO.Details,
                IsSuccess = auditLogDTO.IsSuccess
            };
        }

        private AuditLogDTO ConvertToAuditLogDTO(AuditLog auditLog)
        {
            return new AuditLogDTO
            {
                UserId = auditLog.UserId,
                Timestamp = DateTime.Now,
                Action = auditLog.Action,
                Category = auditLog.Category,
                Details = auditLog.Details,
                IsSuccess = auditLog.IsSuccess,
                UserName = auditLog.User.FirstName + " " + auditLog.User.LastName,

            };
        }

        public async Task<List<AuditLogDTO>> GetAuditLogs()
        {
            try
            {
                List<AuditLog> logs = await _auditLogRepository.GetAuditLogs();
                List<AuditLogDTO> auditLogDTOs = new List<AuditLogDTO>();
                foreach (AuditLog auditlog in logs)
                {
                    auditLogDTOs.Add(ConvertToAuditLogDTO(auditlog));
                }
                return auditLogDTOs;
            }
            catch
            {
                return null;
            }
        }
    }
}