﻿using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>().ForMember(d => d.HostUsername, options => options
                .MapFrom(s => s.Attendees
                     .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, options => options.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, options => options.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, options => options.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, options => options.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, options => options.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, options => options.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following,
                    options => options.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, options => options.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, options => options.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, options => options.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following,
                    options => options.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, options => options.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, options => options.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, options => options.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
