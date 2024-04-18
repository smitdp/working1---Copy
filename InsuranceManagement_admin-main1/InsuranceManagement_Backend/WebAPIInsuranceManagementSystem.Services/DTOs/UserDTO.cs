using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Password { get; set; }

        public string? Email { get; set; } 

        public string? PhoneNumber { get; set; }

        public int RoleId { get; set; }

        public string? RoleName { get; set; } 

        public int? IsApproved { get; set; }

        public bool IsActive { get; set; }

    }
}


// Request Body
//{
//  "userId": 0,
//  "policyId": 0,
//  "agentId": 0,
//  "enrollmentDate": "2024-04-06",
//  "endDate" : "2025-04-06"
//}