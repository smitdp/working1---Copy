using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class PolicyType
{
    public int Id { get; set; }

    public string PolicyTypeName { get; set; } = null!;

    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();
}
