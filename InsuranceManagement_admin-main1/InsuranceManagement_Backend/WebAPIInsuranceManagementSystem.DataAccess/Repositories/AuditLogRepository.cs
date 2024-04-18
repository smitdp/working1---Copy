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
    public class AuditLogRepository : IAuditLogRepository
    {
        private readonly InsuranceandclaimmanagementdbContext _context;

        public AuditLogRepository(InsuranceandclaimmanagementdbContext context)
        {
            _context = context;
        }

        public async Task AddAuditLog(AuditLog auditLog)
        {
            try
            {
                _context.AuditLogs.Add(auditLog);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
        }

        public async Task<List<AuditLog>> GetAuditLogs()
        {
            try
            {
                return await _context.AuditLogs.Include(u => u.User).ToListAsync();

            } 
            catch(Exception ex)
            {
                return null;
            }
            
        }
    }
}