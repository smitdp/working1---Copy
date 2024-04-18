using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class UserPolicy
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int PolicyId { get; set; }

    public int AgentId { get; set; }

    public DateOnly EnrollmentDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int? IsClaimed { get; set; }

    public virtual User Agent { get; set; } = null!;

    public virtual Policy Policy { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
