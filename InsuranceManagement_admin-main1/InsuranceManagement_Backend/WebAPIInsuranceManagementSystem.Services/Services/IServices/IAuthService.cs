using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.Services.DTOs;

namespace WebAPIInsuranceManagementSystem.Services.Services.IServices
{
    public interface IAuthService
    {
        Task<int> Register(UserDTO userDTO);
        Task<string> Login(string email, string password);
        Task<bool> LogoutAsync(int userId);
      

    }
}
