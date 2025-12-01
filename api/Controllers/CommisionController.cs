using Microsoft.AspNetCore.Mvc;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("CalculateCommission")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
            if (calculationRequest == null)
            {
                return BadRequest("Invalid request.");
            }

            if (calculationRequest.LocalSalesCount < 0 ||
                calculationRequest.ForeignSalesCount < 0 ||
                calculationRequest.AverageSaleAmount < 0)
            {
                return BadRequest("Sales counts and average sale amount must be non-negative.");
            }

            decimal totalLocalAmount = calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            decimal totalForeignAmount = calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;


            decimal avalphaLocalRate = 0.20m;
            decimal avalphaForeignRate = 0.35m;
            decimal competitorLocalRate = 0.02m;
            decimal competitorForeignRate = 0.0755m;

            decimal avalphaLocalCommission = totalLocalAmount * avalphaLocalRate;
            decimal avalphaForeignCommission = totalForeignAmount * avalphaForeignRate;
            decimal competitorLocalCommission = totalLocalAmount * competitorLocalRate;
            decimal competitorForeignCommission = totalForeignAmount * competitorForeignRate;

            decimal avalphaCommission = avalphaLocalCommission + avalphaForeignCommission;
            decimal competitorCommission = competitorLocalCommission + competitorForeignCommission;

            avalphaCommission = Math.Round(avalphaCommission, 2);
            competitorCommission = Math.Round(competitorCommission, 2);

            return Ok(new CommissionCalculationResponse()
            {
                AvalphaTechnologiesCommissionAmount = avalphaCommission,
                CompetitorCommissionAmount = competitorCommission
            });
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal AvalphaTechnologiesCommissionAmount { get; set; }

        public decimal CompetitorCommissionAmount { get; set; }
    }
}