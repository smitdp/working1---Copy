using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class ClaimUpdateDTO
    {
        public int ClaimId { get; set; }
        public int Status { get; set; }
    }
}
