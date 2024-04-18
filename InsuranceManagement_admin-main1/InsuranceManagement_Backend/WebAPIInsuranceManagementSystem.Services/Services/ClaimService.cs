using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;

namespace WebAPIInsuranceManagementSystem.Services.Services
{
    public class ClaimService : IClaimService
    {
        private readonly IClaimRepository _claimRepository;
        private readonly IAuditLogService _auditLogService;

        public ClaimService(IClaimRepository claimRepository, IAuditLogService auditLogService)
        {
            _claimRepository = claimRepository;
            _auditLogService = auditLogService;

        }

        public async Task<int> CreateClaim(ClaimDTO claimDTO)
        {
            try
            {
                Claim claim = ConvertToClaimModel(claimDTO);

                int claimId = await _claimRepository.CreateClaim(claim);

                if (claimId > 0 && claimDTO.Documents != null && claimDTO.Documents.Any())
                {
                    foreach (var documentPath in claimDTO.Documents)
                    {
                        await _claimRepository.AddClaimDocument(claimId, documentPath);
                    }
                }

                // Update isClaimed column in UserPolicy table
                await _claimRepository.UpdateIsClaimed(claimDTO.UserId, claimDTO.PolicyId);
                await _auditLogService.LogCreateClaimAction(claimDTO, true);
                return claimId;
            }
            catch (Exception ex)
            {
                await _auditLogService.LogCreateClaimAction(claimDTO, false);
                throw new Exception("Failed to create claim", ex);
            }
        }

        public async Task UpdateClaimStatus(int claimId, int status)
        {
            try
            {
                if (claimId <= 0)
                {
                    throw new ArgumentException("Invalid claim ID");
                }

                await _claimRepository.UpdateClaimStatus(claimId, status);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update claim status", ex);
            }
        }

        public async Task<List<GetClaimDTO>> GetAllClaims()
        {
            try
            {
                List<Claim> claims = await _claimRepository.GetAllClaims();
                List<GetClaimDTO> dtos = new List<GetClaimDTO>();

                foreach (var claim in claims)
                {
                    var documents = await _claimRepository.GetDocumentsByClaimId(claim.Id);

                    GetClaimDTO dto = ConvertToGetClaimDTO(claim);
                    dto.Documents = documents;

                    dtos.Add(dto);
                }

                return dtos;
            }
            catch (Exception ex)
            {
                return new List<GetClaimDTO>();
            }
        }




        private Claim ConvertToClaimModel(ClaimDTO claimDTO)
        {
            return new Claim
            {
                PolicyId = claimDTO.PolicyId,
                UserId = claimDTO.UserId,
                IncidentDate = claimDTO.IncidentDate,
                IncidentLocation = claimDTO.IncidentLocation,
                Address = claimDTO.Address,
                Description = claimDTO.Description,
                Status = claimDTO.Status,
                
            };
        }
        private GetClaimDTO ConvertToGetClaimDTO(Claim claim)
        {
            return new GetClaimDTO
            {
                ClaimId = claim.Id,
                PolicyId = claim.PolicyId,
                UserId = claim.UserId,
                PolicyName = claim.Policy.PolicyName,
                PolicyTypeName = claim.Policy.PolicyType.PolicyTypeName,
                UserFirstName = claim.User.FirstName,
                UserLastName = claim.User.LastName,
                Email = claim.User.Email,
                PhoneNumber = claim.User.PhoneNumber,
                claimStatus = claim.Status,
                Documents = claim.ClaimDocuments.Select(cd => cd.DocumentPath).ToList(),
                Address = claim.Address,
                Description = claim.Address, 
                IncidentDate = claim.IncidentDate,
                IncidentLocation = claim.IncidentLocation
            };
        }
    }
}
