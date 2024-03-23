using System;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<Comments.CommentDto>>
        {
            public string Body { get; set; }

            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<CommentDto>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly IUserAccessor _userAccessor;

            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 1;

                if (success) return Result<Comments.CommentDto>.Success(_mapper.Map<Comments.CommentDto>(comment));

                return Result<Comments.CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}

