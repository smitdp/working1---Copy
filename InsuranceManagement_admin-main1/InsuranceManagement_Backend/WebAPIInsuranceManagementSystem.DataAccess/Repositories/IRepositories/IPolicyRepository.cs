using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories
{
    public interface IPolicyRepository
    {
        Task<List<Policy>> GetAllPolicies();

        Task<List<UserPolicy>> GetAllUserPolicies();
        Task<List<DocumentList>> GetDocumentListAsync();

        Task<bool> AddDocument(DocumentList document);

        Task<int> AddPolicy(Policy policyModel);
       
      

        Task AddDocuments(int policyId, List<string> documents);


        Task<List<PolicyType>> GetAll();
        

    }
}
