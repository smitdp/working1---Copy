using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class UserPolicyInfoDTO
    {
        public int UserId { get; set; }

        public int PolicyId { get; set; }

        public int AgentId { get; set; }

        public DateOnly EnrollmentDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public int? IsClaimed { get; set; }

        public string UserName {  get; set; }

        public string AgentName { get; set; }

        public string PolicyName { get; set; }

    }
}
