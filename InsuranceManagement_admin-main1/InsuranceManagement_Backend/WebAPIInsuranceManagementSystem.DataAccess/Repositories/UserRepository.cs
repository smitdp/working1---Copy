using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly InsuranceandclaimmanagementdbContext _context;

        public UserRepository(InsuranceandclaimmanagementdbContext context)
        {
            _context = context;
        }

        public async Task<int> AddUserPolicy(UserPolicy userPolicy)
        {
            try
            {
                _context.UserPolicies.Add(userPolicy);
                int rowsAffected = await _context.SaveChangesAsync();

                return rowsAffected;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }

        public async Task<bool> UserHasPolicy(int userId, int policyId)
        {
            try
            {
                return await _context.UserPolicies.AnyAsync(up => up.UserId == userId && up.PolicyId == policyId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false; 
            }
        }


        public async Task<List<UserPolicy>> GetBoughtPolicies(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    Console.WriteLine("Invalid user ID. User ID must be greater than zero.");
                    return new List<UserPolicy>();
                }

                List<UserPolicy> myPolicies = await _context.UserPolicies
                    .Include(up => up.Policy)
                        .ThenInclude(p => p.PolicyType)
                    .Include(up => up.Agent)
                    .Where(up => up.UserId == userId)
                    .ToListAsync();



                return myPolicies;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while retrieving user policies: {ex.Message}");
                return new List<UserPolicy>();
            }
        }

        public async Task<List<string>> GetDocumentTypesByPolicyId(int policyId)
        {
            try
            {
                List<string> documentTypes = await _context.DocumentLists
                    .Where(d => d.PolicyId == policyId)
                    .Select(d => d.DocumentType)
                    .ToListAsync();

                return documentTypes;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while retrieving document types: {ex.Message}");
                return new List<string>();
            }
        }

        public async Task<List<User>> GetApprovedAgents()
        {
            try
            {
                return await _context.Users
               .Where(u => u.RoleId == 2 && u.IsApproved == 1)
               .Include(r => r.Role)
               .ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<User>();
            }
        }

        public async Task<User?> GetUserInfo(int id)
        {
            try
            {
                return await _context.Users.Include(r => r.Role).FirstOrDefaultAsync(u => u.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }

        public async Task<int?> GetPolicyStatus(int policyId, int userId)
        {
            try
            {
                var claim = await _context.Claims.FirstOrDefaultAsync(c => c.PolicyId == policyId && c.UserId == userId);
                return claim?.Status;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while retrieving policy status: {ex.Message}");
                return null;
            }
        }

        public async Task<List<User>> getUsersList()
        {
            try
            {
                return await _context.Users
                   .Include(r => r.Role)
                   .ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<User>();
            }
        }

        public async Task<bool> UpdateUserStatus(int userId, bool isActive)
        {
            try
            {

                User user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return false;
                }

                user.IsActive = isActive;

                await _context.SaveChangesAsync();
                return true;
            } 
            catch(Exception ex)
            {
                return false;
                Console.WriteLine(ex.Message);
            }
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }





    }
}
