using System;
using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;

namespace API.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest=>dest.PhotoUrl, opt=>opt.MapFrom(src =>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
            .ForMember(dest =>dest.Age,opt =>opt.MapFrom(src=>src.DateOfBirth.CaluclateAge()));

            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto,AppUser>();
            CreateMap<RegisterDto,AppUser>();
            CreateMap<Message,MessageDto>()
            .ForMember(dest=>dest.SenderPhotoUrl,opt =>opt.MapFrom(src=>src.Sender.Photos.FirstOrDefault(x=>x.IsMain).Url))
            .ForMember(dest=>dest.RecipientPhotoUrl,opt =>opt.MapFrom(src=>src.Recipient.Photos.FirstOrDefault(x=>x.IsMain).Url));
            CreateMap<DateTime,DateTime>().ConvertUsing(d=> DateTime.SpecifyKind(d, DateTimeKind.Utc));
        }
    }
}