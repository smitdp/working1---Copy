using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class GetClaimDTO
    {
        public int ClaimId { get; set; }
        public int PolicyId { get; set; }
        public int UserId { get; set; }
        public string PolicyName { get; set; }
        public string PolicyTypeName { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; } 
        public int? claimStatus { get; set; }
        public List<string> Documents { get; set; }
        public DateOnly IncidentDate { get; set; }
        public string IncidentLocation { get; set; }
        public string  Address { get; set; }
        public string Description { get; set; }
    }
}
