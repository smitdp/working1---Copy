using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class Policy
{
    public int Id { get; set; }

    public string PolicyNumber { get; set; } = null!;

    public int PolicyTypeId { get; set; }

    public string? PolicyName { get; set; }

    public int? Duration { get; set; }

    public string? Description { get; set; }

    public decimal? Installment { get; set; }

    public decimal? PremiumAmount { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<Claim> Claims { get; set; } = new List<Claim>();

    public virtual ICollection<DocumentList> DocumentLists { get; set; } = new List<DocumentList>();

    public virtual PolicyType PolicyType { get; set; } = null!;

    public virtual ICollection<UserPolicy> UserPolicies { get; set; } = new List<UserPolicy>();
}
