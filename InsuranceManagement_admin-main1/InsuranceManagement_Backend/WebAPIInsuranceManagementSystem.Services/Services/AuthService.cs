using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;
using WebAPIInsuranceManagementSystem.Services.DTOs;
using WebAPIInsuranceManagementSystem.Services.Services.IServices;

namespace WebAPIInsuranceManagementSystem.Services.Services
{
    public class AuthService : Controller,IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IEncryptionService _encryptionService;
        private readonly IAuditLogService _auditLogService;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IEncryptionService encryptionService, IAuditLogService auditLogService)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _encryptionService = encryptionService;
            _auditLogService = auditLogService;
        }

        public async Task<int> Register(UserDTO userDTO)
        {
            try
            {
                if (await _authRepository.UserExists(userDTO.Email))
                {
                    return 1;
                }


                
                User user = ConvertToUser(userDTO);
                string encryptedPassword = _encryptionService.Encrypt(userDTO.Password, "tzEIZllQVHJcr1xB");
                user.Password = encryptedPassword;

                User registeredUser = await _authRepository.Register(user);


                if (registeredUser != null)
                {
                    await _auditLogService.LogRegisterAction(registeredUser, true);
                    return 2;
                }

                else
                {
                    return 3;
                }
            }
            catch (Exception ex)
            {
                await _auditLogService.LogRegisterAction(new User { Id = -1 }, false);
                Console.WriteLine($"Error in RegisterAsync: {ex.Message}");
                return 3;
            }
        }

        public async Task<string> Login(string email, string password)

        {
            try
            {
                
                string encryptedPassword = _encryptionService.Encrypt(password, "tzEIZllQVHJcr1xB");

                User user = await _authRepository.Login(email, encryptedPassword);


               

                if (user != null)
                {
                    if (user.RoleId == 2)
                    {

                        return null;
                    }
                    string token = GenerateJwtToken(user);

                    await _auditLogService.LogLoginAction(user, true);
                    return token;
                    
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                await _auditLogService.LogLoginAction(new User { Id = -1 }, true);
                Console.WriteLine($"Error in LoginAsync: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> LogoutAsync(int userId)
        {
            try
            {
                if (userId == null)
                {
                    return false; 
                }

                await _auditLogService.LogLogoutAction(userId, true);

                return true; 
            }
            catch (Exception ex)
            {
                await _auditLogService.LogLogoutAction(-1, true);
                return false;
            }
        }



        //******************************************************** Generate Token method *************************************************************
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWTSecret"));

            var signingKey = new SymmetricSecurityKey(key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer= _configuration["JWTIssuer"],
                Audience= _configuration["JWTAudience"],
                Subject = new ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new System.Security.Claims.Claim(ClaimTypes.Role, user.Role.RoleName.ToString())

                 }),

                Expires = DateTime.UtcNow.AddHours(168),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        //******************************************************** Convert Model Methods *************************************************************
        public UserDTO ConvertToUserDTO(User user)
        {
           
            UserDTO userDTO = new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                PhoneNumber = user.PhoneNumber,
                RoleId = user.RoleId,
                IsApproved = user.IsApproved,
                IsActive = user.IsActive
            };

            return userDTO;
        }
        public User ConvertToUser(UserDTO userDTO)
        {
            User user = new User
            {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Email = userDTO.Email,
                Password = userDTO.Password, 
                PhoneNumber = userDTO.PhoneNumber,
                RoleId = userDTO.RoleId,
                IsApproved = userDTO.IsApproved,
                IsActive = userDTO.IsActive
            };

            return user;
        }

    }
}
