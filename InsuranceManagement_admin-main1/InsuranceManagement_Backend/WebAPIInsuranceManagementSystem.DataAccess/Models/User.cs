using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public int RoleId { get; set; }

    public int? IsApproved { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public virtual ICollection<Claim> Claims { get; set; } = new List<Claim>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserPolicy> UserPolicyAgents { get; set; } = new List<UserPolicy>();

    public virtual ICollection<UserPolicy> UserPolicyUsers { get; set; } = new List<UserPolicy>();
}
