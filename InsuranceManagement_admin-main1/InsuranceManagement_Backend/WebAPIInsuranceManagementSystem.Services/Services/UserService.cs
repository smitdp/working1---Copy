using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;


namespace WebAPIInsuranceManagementSystem.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuditLogService _auditLogService;

        public UserService(IUserRepository userRepository, IAuditLogService auditLogService)
        {
            _userRepository = userRepository;
            _auditLogService = auditLogService;

        }


        public async Task<int> BuyPolicy(UserPolicyDTO userPolicyDTO)
        {
            try
            {
                if (userPolicyDTO == null)
                {
                    return -1; // Bad request
                }

                // Check if the user already has the same policy
                bool hasPolicy = await _userRepository.UserHasPolicy(userPolicyDTO.UserId, userPolicyDTO.PolicyId);
                if (hasPolicy)
                {
                    return 2; // User already has the same policy
                }

                UserPolicy userPolicy = ConvertToUserPolicy(userPolicyDTO);

                await _auditLogService.LogBuyPolicyAction(userPolicyDTO, true);
                return await _userRepository.AddUserPolicy(userPolicy);
            }
            catch (Exception ex)
            {
                await _auditLogService.LogBuyPolicyAction(userPolicyDTO, false);
                return -2; // Internal server error
            }
        }



        public async Task<List<MyPolicyDTO>> GetBoughtPolicies(int userId)
        {
            if (userId <= 0)
            {
                return new List<MyPolicyDTO>();
            }

            List<UserPolicy> myPolicies = await _userRepository.GetBoughtPolicies(userId);

            List<MyPolicyDTO> convertedMyPolicies = myPolicies.Select(policy => ConvertToMyPolicyDTO(policy)).ToList();

            foreach (var myPolicy in convertedMyPolicies)
            {
                myPolicy.DocumentsNeeded = await _userRepository.GetDocumentTypesByPolicyId(myPolicy.PolicyId);
                myPolicy.status = await _userRepository.GetPolicyStatus(myPolicy.PolicyId, userId);
            }

            return convertedMyPolicies;
        }


        public async Task<List<UserDTO>> GetApprovedAgents()
        {
            try
            {
                List<User> approvedAgents = await _userRepository.GetApprovedAgents();
                List<UserDTO> convertedAgents = approvedAgents.Select(agent => convertToUserDTO(agent)).ToList();
                return convertedAgents;
            }
            catch (Exception ex)
            { 
                throw new Exception("Error occurred while retrieving agents " + ex.Message);
            }
        }

        public async Task<UserDTO> GetUserInfo(int id)
        {
            try
            {
                User user = await _userRepository.GetUserInfo(id);

                UserDTO userDTO = convertToUserDTO(user);

                return userDTO;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while retrieving agents " + ex.Message);
            }
        }

        public async Task<List<UserDTO>> GetUsersList()
        {
            try
            {
                List<User> users = await _userRepository.getUsersList();
                List<UserDTO> convertedUsers = users.Select(user => convertToUserDTO(user)).ToList();
                return convertedUsers;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while retrieving user " + ex.Message);
            }
        }

        public async Task<bool> UpdateUserStatus(int userId, bool isActive)
        {
            return await _userRepository.UpdateUserStatus(userId, isActive);
        }

        public async Task<bool> UpdateUserAsync(int userId, UpdateUserDTO updateUserDTO)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);

                if (user == null)
                {
                    return false; // User not found
                }

                // Update user properties
                user.FirstName = updateUserDTO.FirstName;
                user.LastName = updateUserDTO.LastName;
                user.PhoneNumber = updateUserDTO.PhoneNumber;

                await _userRepository.SaveChangesAsync();

                return true; // User updated successfully
            }
            catch (Exception ex)
            {
                // Log exception or handle it accordingly
                return false;
            }
        }





        //********************************************************** Convert Model Methods *************************************************************
        private UserPolicy ConvertToUserPolicy(UserPolicyDTO userPolicyDTO)
        {
            UserPolicy userPolicy = new UserPolicy
            {
                UserId = userPolicyDTO.UserId,
                PolicyId = userPolicyDTO.PolicyId,
                AgentId = userPolicyDTO.AgentId,
                EnrollmentDate = userPolicyDTO.EnrollmentDate,
                EndDate = userPolicyDTO.EndDate
            };

            return userPolicy;
        }

        private MyPolicyDTO ConvertToMyPolicyDTO(UserPolicy userPolicy)
        {
            MyPolicyDTO policy = new MyPolicyDTO
            {
                Id = userPolicy.Id,
                UserId = userPolicy.UserId,
                PolicyId = userPolicy.PolicyId,
                EnrollmentDate = userPolicy.EnrollmentDate,
                EndDate = userPolicy.EndDate,
                PolicyNumber = userPolicy.Policy.PolicyNumber,
                policyTypeName = userPolicy.Policy.PolicyType.PolicyTypeName,
                PolicyName = userPolicy.Policy.PolicyName,
                Duration = userPolicy.Policy.Duration,
                Description = userPolicy.Policy.Description,
                Installment = userPolicy.Policy.Installment,
                PremiumAmount = userPolicy.Policy.PremiumAmount,
                AgentName = $"{userPolicy.Agent.FirstName} {userPolicy.Agent.LastName}",
                AgentPhoneNumber = userPolicy.Agent.PhoneNumber,
                isClaimed = userPolicy.IsClaimed

            };

            return policy;
        }

        private UserDTO convertToUserDTO(User user)
        {
            UserDTO userDTO = new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                RoleName = user.Role.RoleName,
                IsActive = user.IsActive
            };

            return userDTO;

        }

       
    }
}

