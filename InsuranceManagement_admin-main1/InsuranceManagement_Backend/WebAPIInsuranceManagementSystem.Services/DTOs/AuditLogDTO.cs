using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class AuditLogDTO
    {
        public int UserId { get; set; }
        public string Action { get; set; }
        public string Category { get; set; }
        public string Details { get; set; }
        public bool? IsSuccess { get; set; }
        public string? UserName {get; set;}

        public DateTime Timestamp { get; set; }
    }


}
