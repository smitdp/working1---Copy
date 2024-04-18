using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPIInsuranceManagementSystem.Services.DTOs
{
    public class UserStatusUpdateDTO
    {
        public int UserId { get; set; }
        public bool IsActive { get; set; }
    }
}
