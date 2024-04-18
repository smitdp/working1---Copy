using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;

namespace WebAPIInsuranceManagementSystem.Controllers
{
    [Route("api/policy")]
    [ApiController]

    //[Authorize]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService _policyService;

        public PolicyController(IPolicyService policyService)
        {
            _policyService = policyService;
        }


        //[Authorize(Roles = "Insurer")]
        [HttpGet]
        public async Task<IActionResult> GetPolicies()
        {
            try
            {
                List<PolicyDTO> policies = await _policyService.GetAllPolicies();
                if (policies == null || !policies.Any())
                {
                    return NoContent(); // 204
                }
                return Ok(policies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("user-policies")]
        public async Task<IActionResult> GetAllUserPolicies()
        {
            try
            {
                List<UserPolicyInfoDTO> userPolicies = await _policyService.GetAllUserPolicies();

                if (userPolicies == null || !userPolicies.Any())
                {
                    return NoContent();
                }

                return Ok(userPolicies);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("policy-documents")]
        public async Task<IActionResult> GetDocumentList()
        {
            try
            {
                List<PolicyDocumentDTO> documentList = await _policyService.GetDocumentListAsync();

                if (documentList == null || !documentList.Any())
                {
                    return NoContent();
                }
                return Ok(documentList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the document list.");
            }
        }

        [HttpPost("add-document")]
        public async Task<IActionResult> AddDocument([FromBody] AddDocumentListDTO documentDTO)
        {
            try
            {
                await _policyService.AddDocument(documentDTO);
                return Ok("Document added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("add-policy")]
        public async Task<IActionResult> AddPolicy([FromBody] AddPolicyDTO addPolicyDto)
        {
            try
            {
                int policyId = await _policyService.AddPolicy(addPolicyDto);
                return Ok(policyId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("policy-types")]
        public async Task<IActionResult> GetAllPolicyTypes()
        {
            var policyTypes = _policyService.GetAllPolicyTypes();
            return Ok(policyTypes);
        }

    }
}
