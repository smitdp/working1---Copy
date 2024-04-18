using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories
{
    public interface IUserRepository
    {

        Task<int> AddUserPolicy(UserPolicy userPolicy);

        Task<List<UserPolicy>> GetBoughtPolicies(int userId);
        
        Task<List<User>> GetApprovedAgents();

        Task<User> GetUserInfo(int id);
        
        Task<List<string>> GetDocumentTypesByPolicyId(int policyId);
        
        Task<int?> GetPolicyStatus(int policyId, int userId);

        Task<List<User>> getUsersList();

        Task<bool> UserHasPolicy(int userId, int policyId);

        Task<bool> UpdateUserStatus(int userId, bool isActive);
        Task<User> GetUserByIdAsync(int userId);
        Task SaveChangesAsync();




    }
}
