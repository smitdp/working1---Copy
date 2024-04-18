using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class AuditLog
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime Timestamp { get; set; }

    public string Action { get; set; } = null!;

    public string? Category { get; set; }

    public string? Details { get; set; }

    public bool? IsSuccess { get; set; }

    public virtual User User { get; set; } = null!;
}
