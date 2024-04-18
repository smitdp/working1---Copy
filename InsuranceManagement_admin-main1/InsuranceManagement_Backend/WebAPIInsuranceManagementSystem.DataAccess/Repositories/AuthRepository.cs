using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPIInsuranceManagementSystem.DataAccess.Models;
using WebAPIInsuranceManagementSystem.DataAccess.Repositories.IRepositories;

namespace WebAPIInsuranceManagementSystem.DataAccess.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly InsuranceandclaimmanagementdbContext _context;

        public AuthRepository(InsuranceandclaimmanagementdbContext context)
        {
            _context = context;
        }

        public async Task<User> Register(User user)
        {
            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in RegisterAsync: {ex.Message}");
                return null; 
            }
        }

        public async Task<User> Login(string email, string password)
        {
            try
            {
                User user = await _context.Users.Include(e => e.Role).FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in LoginAsync: {ex.Message}");
                return null; 
            }
        }

        public async Task<bool> UserExists(string email)
        {
            try
            {
                return await _context.Users.AnyAsync(x => x.Email == email);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UserExistsAsync: {ex.Message}");
                return false; 
            }
        }
    }
}
