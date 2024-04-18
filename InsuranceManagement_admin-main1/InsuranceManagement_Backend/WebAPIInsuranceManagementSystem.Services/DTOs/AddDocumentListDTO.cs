using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class AddDocumentListDTO
    {
        public int PolicyId { get; set; }
        public string DocumentType { get; set; }
    }
}
