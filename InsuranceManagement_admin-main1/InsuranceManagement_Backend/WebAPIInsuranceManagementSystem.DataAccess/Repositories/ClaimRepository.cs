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
    public class ClaimRepository : IClaimRepository
    {
        private readonly InsuranceandclaimmanagementdbContext _context;

        public ClaimRepository(InsuranceandclaimmanagementdbContext context)
        {
            _context = context;

        }

        public async Task<int> CreateClaim(Claim claim)
        {
            _context.Claims.Add(claim);
            await _context.SaveChangesAsync();
            return claim.Id;
        }

        public async Task AddClaimDocument(int claimId, string documentPath)
        {
            ClaimDocument document = new ClaimDocument
            {
                ClaimId = claimId,
                DocumentPath = documentPath
            };
            _context.ClaimDocuments.Add(document);
            await _context.SaveChangesAsync();
        }


        public async Task<Claim> GetClaimById(int claimId)
        {
            return await _context.Claims.FindAsync(claimId);
        }

        public async Task UpdateIsClaimed(int userId, int policyId)
        {
            var userPolicy = await _context.UserPolicies
                .FirstOrDefaultAsync(up => up.UserId == userId && up.PolicyId == policyId);

            if (userPolicy != null)
            {
                userPolicy.IsClaimed = 1;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateClaimStatus(int claimId, int status)
        {
            try
            {
                var claim = await _context.Claims.FindAsync(claimId);

                if (claim == null)
                {
                    throw new ArgumentException("Claim not found");
                }

                claim.Status = status;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update claim status in repository", ex);
            }
        }

        public async Task<List<Claim>> GetAllClaims()
        {
            return await _context.Claims
                .Include(c => c.Policy)
                    .ThenInclude(t => t.PolicyType)
                .Include(c => c.User)
                .ToListAsync();
        }

        public async Task<List<string>> GetDocumentsByClaimId(int claimId)
        {
            return await _context.ClaimDocuments
                .Where(cd => cd.ClaimId == claimId)
                .Select(cd => cd.DocumentPath)
                .ToListAsync();
        }

    }
}
