using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using System;
using System.IO;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    [AllowAnonymous]
    public class ReportingController : BaseController
    {
        // GET: Reporting
        public ActionResult TithingReport()
        {
            return View();
        }

        public ActionResult MembershipReport()
        {
            return View();
        }

        public ActionResult OfferingReport()
        {
            return View();
        }

        public ActionResult TransactionsReport()
        {
            return View();
        }

        public ActionResult DonationReport()
        {
            return View();
        }

        public ActionResult FinancialSummary()
        {
            return View();
        }

        public ActionResult MemberTaxLetter()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetMemberGiving(int memberId, DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetMemberGiving(memberId, startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public ActionResult ExportTaxLetterPdf(string html)
        {
            try
            {
                using (var stream = new MemoryStream())
                {
                    var stringReader = new StringReader(html);
                    var pdfDocument = new Document(PageSize.A4, 10f, 10f, 100f, 0f);
                    var pdfWriter = PdfWriter.GetInstance(pdfDocument, stream);
                    pdfDocument.Open();
                    XMLWorkerHelper.GetInstance().ParseXHtml(pdfWriter, pdfDocument, stringReader);
                    pdfDocument.Close();
                    //return File(stream.ToArray(), "application/pdf", @"Letters.pdf");



                    System.IO.File.WriteAllBytes(@"C:\Users\jatorres_dev\Downloads\test.pdf", stream.ToArray());


                    return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        #region PartialViews for Components

        public ActionResult ReportingTabs()
        {
            return PartialView("_reportingTabs");
        }
        #endregion
    }
}