using System;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor: IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }
    }
}
