using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class Claim
{
    public int Id { get; set; }

    public int PolicyId { get; set; }

    public int UserId { get; set; }

    public DateOnly IncidentDate { get; set; }

    public string? IncidentLocation { get; set; }

    public string? Address { get; set; }

    public string? Description { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<ClaimDocument> ClaimDocuments { get; set; } = new List<ClaimDocument>();

    public virtual Policy Policy { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
