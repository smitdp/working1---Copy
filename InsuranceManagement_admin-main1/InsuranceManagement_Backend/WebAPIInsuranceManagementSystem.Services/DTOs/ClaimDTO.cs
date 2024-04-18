using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class ClaimDTO
    {
        public int PolicyId { get; set; }
        public int UserId { get; set; }
        public DateOnly IncidentDate { get; set; }
        public string IncidentLocation { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public List<string> Documents { get; set; }
    }
}
