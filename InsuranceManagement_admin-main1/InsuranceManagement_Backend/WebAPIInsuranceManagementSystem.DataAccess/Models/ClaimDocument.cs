using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class ClaimDocument
{
    public int Id { get; set; }

    public int ClaimId { get; set; }

    public string DocumentPath { get; set; } = null!;

    public virtual Claim Claim { get; set; } = null!;
}
