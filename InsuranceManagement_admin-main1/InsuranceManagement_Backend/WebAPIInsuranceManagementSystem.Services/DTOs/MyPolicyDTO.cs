using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class MyPolicyDTO
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PolicyId { get; set; }

        public DateOnly EnrollmentDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public string PolicyNumber { get; set; } 

        public string policyTypeName { get; set; }
        public string? PolicyName { get; set; }

        public int? Duration { get; set; }

        public string? Description { get; set; }

        public decimal? Installment { get; set; }

        public decimal? PremiumAmount { get; set; }
        public string AgentName { get; set; }
        public string AgentPhoneNumber { get; set; }
        public int? isClaimed { get; set; }

        public int? status { get; set; }
        public List<string>? DocumentsNeeded { get; set; }


    }
}
