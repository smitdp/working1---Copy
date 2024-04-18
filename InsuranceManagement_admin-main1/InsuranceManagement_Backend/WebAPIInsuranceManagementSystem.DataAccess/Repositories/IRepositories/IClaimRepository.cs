using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories
{
    public interface IClaimRepository
    {
        public Task<int> CreateClaim(Claim claim);
        public Task AddClaimDocument(int claimId, string documentPath);

        public Task<Claim> GetClaimById(int claimId);

        Task UpdateIsClaimed(int userId, int policyId);

        Task UpdateClaimStatus(int claimId, int status);

        Task<List<Claim>> GetAllClaims();

        Task<List<string>> GetDocumentsByClaimId(int claimId);



    }
}
