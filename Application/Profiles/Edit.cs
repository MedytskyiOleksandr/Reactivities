using System;
using Application.Core;
using MediatR;
using FluentValidation;
using AutoMapper;
using System.Threading.Tasks;

using Persistence;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Bio { get; set; }

            public string DisplayName { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName);
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;

            public Handler(DataContext context, IUserAccessor accessor)
            {
                _context = context;
                _accessor = accessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _accessor.GetUsername());

                if (user == null) return null;

                user.Bio = request.Bio ?? user.Bio;

                user.DisplayName = request.DisplayName ?? user.DisplayName;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update profile");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

