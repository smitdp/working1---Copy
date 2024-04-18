using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class AddPolicyDTO
    {
        public string PolicyNumber { get; set; }
        public int PolicyTypeId { get; set; }
        public string PolicyName { get; set; }
        public int? Duration { get; set; }
        public string Description { get; set; }
        public decimal? Installment { get; set; }
        public decimal? PremiumAmount { get; set; }
        public string RequiredDocuments { get; set; }
    }
}
