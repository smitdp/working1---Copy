using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;


namespace WebAPIInsuranceManagementSystem.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuditLogService _auditLogService;

        public UserController(IUserService userService, IAuditLogService auditLogService)
        {
            _userService = userService;
            _auditLogService = auditLogService;
        }

        [HttpPost("buy-policy")]
        public async Task<IActionResult> BuyPolicy(UserPolicyDTO userPolicyDTO)
        {
            try
            {
                if (userPolicyDTO == null)
                {
                    return BadRequest("Request body is null");
                }

                int statusCode = await _userService.BuyPolicy(userPolicyDTO);

                switch (statusCode)
                {
                    case 1:
                        return Ok("Policy purchased successfully");
                    case 2:
                        return BadRequest("Already have same policy");
                    case -1:
                        return BadRequest("Request is null");
                    default:
                        return StatusCode(500, "An error occurred while processing your request");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }


        [HttpGet("my-policies/{userId}")]
        public async Task<IActionResult> GetBoughtPolicies(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    return BadRequest("Invalid user ID");
                }

                List<MyPolicyDTO> myPolicies = await _userService.GetBoughtPolicies(userId);

                if (myPolicies == null || !myPolicies.Any())
                {
                    return NotFound("No policy found");
                }

                return Ok(myPolicies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }


        [HttpGet("agents")]
        public async Task<ActionResult<List<UserDTO>>> GetAgents()
        {
            try
            {
                List<UserDTO> agents = await _userService.GetApprovedAgents();
                if(agents == null || !agents.Any())
                {
                    return NotFound();
                }


                return Ok(agents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving agents: {ex.Message}");
            }
        }

        [HttpGet("user-info/{userId}")]
        public async Task<ActionResult<UserDTO>> GetUserInfo(int userId)
        {
            UserDTO user = await _userService.GetUserInfo(userId);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<UserDTO>>> getUsers()
        {
            try
            {
                List<UserDTO> users = await _userService.GetUsersList();
                if (users == null || !users.Any())
                {
                    return NotFound();
                }


                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving agents: {ex.Message}");
            }
        }

        [HttpPut("is-active/{id}")]
        public async Task<IActionResult> UpdateUserStatus(int id, [FromBody] UserStatusUpdateDTO userStatusUpdateDTO)
        {
            if (userStatusUpdateDTO == null)
            {
                return BadRequest("User status update data is required.");
            }

            if (id != userStatusUpdateDTO.UserId)
            {
                return BadRequest("User ID in the request path does not match the ID in the request body.");
            }

            var result = await _userService.UpdateUserStatus(id, userStatusUpdateDTO.IsActive);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return NotFound($"User with ID {id} not found.");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                if (updateUserDTO == null)
                {
                    return BadRequest("User data is required.");
                }


                var result = await _userService.UpdateUserAsync(id, updateUserDTO);

                if (result)
                {
                    return NoContent(); 
                }
                else
                {
                    return NotFound($"User with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }


        [HttpGet("auditlogs")]
        public async Task<IActionResult> GetAuditLogs()
        {
            try
            {
                var logs = await _auditLogService.GetAuditLogs();

                if (logs == null)
                {
                    return NotFound("logs not found.");
                }

                return Ok(logs);
            }
            catch (Exception ex)
            {
                // Log exception or handle it accordingly
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }
    }
}
