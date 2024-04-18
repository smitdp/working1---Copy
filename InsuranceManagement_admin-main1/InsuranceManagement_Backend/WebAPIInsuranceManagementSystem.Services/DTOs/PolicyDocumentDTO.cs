using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class PolicyDocumentDTO
    {
        public int ID { get; set; }
        public int PolicyId { get; set; }
        public string DocumentType { get; set; }
        public string PolicyName { get; set; }
    }
}
