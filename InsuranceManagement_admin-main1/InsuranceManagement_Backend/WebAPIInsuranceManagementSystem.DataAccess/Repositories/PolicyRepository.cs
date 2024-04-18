using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly InsuranceandclaimmanagementdbContext _context;
        public PolicyRepository(InsuranceandclaimmanagementdbContext context)
        {
            _context = context;
        }

        public async Task<List<Policy>> GetAllPolicies()
        {
            try
            {
                List<Policy> policies = await _context.Policies.Include(p => p.PolicyType).ToListAsync();
                return policies;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve policies from the database", ex);
            }
        }

        public async Task<List<UserPolicy>> GetAllUserPolicies()
        {
            try
            {
                List<UserPolicy> userPolicies = await _context.UserPolicies
                    .Include(p => p.Policy)
                    .Include(u => u.User)
                    .Include(u => u.Agent)
                    .ToListAsync();
                return userPolicies;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve policies from the database", ex);
            }
        }

        public async Task<List<DocumentList>> GetDocumentListAsync()
        {
            try
            {
                return await _context.DocumentLists
                    .Include(p => p.Policy)
                    .ToListAsync();
            }
            catch (Exception ex)
            {

                throw new Exception("failed to retrive documents.");
            }
        }

        public async Task<bool> AddDocument(DocumentList document)
        {
            try
            {
                _context.DocumentLists.Add(document);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in PolicyRepository.AddDocument: {ex.Message}");
                return false;
            }
        }


        public async Task<int> AddPolicy(Policy policyModel)
        {
            _context.Policies.Add(policyModel);
            await _context.SaveChangesAsync();

            return policyModel.Id;
        }

        public async Task AddDocuments(int policyId, List<string> documents)
        {
            foreach (var document in documents)
            {
                DocumentList newDocument = new DocumentList
                {
                    PolicyId = policyId,
                    DocumentType = document
                };

                _context.DocumentLists.Add(newDocument);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<List<PolicyType>> GetAll()
        {
            return _context.PolicyTypes.ToList();
        }


    }
}
