using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;


namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class UserPolicyDTO
    {
        public int UserId { get; set; }
        public int PolicyId { get; set; }
        public int AgentId { get; set; }
        public DateOnly EnrollmentDate { get; set; }
        public DateOnly? EndDate { get; set; }

    }
}
