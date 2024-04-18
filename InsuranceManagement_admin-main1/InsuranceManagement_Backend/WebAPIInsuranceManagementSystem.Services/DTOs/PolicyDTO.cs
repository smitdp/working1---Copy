using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class PolicyDTO
    {
        //public int PolicyTypeId { get; set; }

        public int Id { get; set; }
        public string? PolicyNumber { get; set; }

        public string? PolicyTypeName { get; set; }

        public string? PolicyName { get; set; }

        public int? Duration { get; set; }

        public string? Description { get; set; }

        public decimal? Installment { get; set; }

        public decimal? PremiumAmount { get; set; }

        public bool IsActive { get; set; }
    }
}
