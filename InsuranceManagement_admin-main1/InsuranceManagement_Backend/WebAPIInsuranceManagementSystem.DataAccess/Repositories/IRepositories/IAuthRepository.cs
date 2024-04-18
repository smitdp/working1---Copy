using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
