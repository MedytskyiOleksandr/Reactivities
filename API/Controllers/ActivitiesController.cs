﻿ using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams pagingParams)
        {
            return  HandlePagedResult(await Mediator.Send(new List.Query{ Params = pagingParams}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Domain.Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        [Authorize(Policy = "IsActivityHost")] 
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Domain.Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")] 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendence.Command { Id = id }));
        }
    }
}
