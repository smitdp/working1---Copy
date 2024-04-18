using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.Services.DTOs;

namespace WebAPIInsuranceManagementSystem.Services.Services.IServices
{
    public interface IClaimService
    {
        public Task<int> CreateClaim(ClaimDTO claimDTO);

        Task UpdateClaimStatus(int claimId, int status);
  
        Task<List<GetClaimDTO>> GetAllClaims();


    }
}
