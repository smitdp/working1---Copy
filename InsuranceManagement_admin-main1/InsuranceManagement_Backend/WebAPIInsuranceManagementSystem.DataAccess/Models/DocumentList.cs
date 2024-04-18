using System;
using System.Collections.Generic;

namespace WebAPIInsuranceManagementSystem.DataAccess.Models;

public partial class DocumentList
{
    public int Id { get; set; }

    public int PolicyId { get; set; }

    public string DocumentType { get; set; } = null!;

    public virtual Policy Policy { get; set; } = null!;
}
