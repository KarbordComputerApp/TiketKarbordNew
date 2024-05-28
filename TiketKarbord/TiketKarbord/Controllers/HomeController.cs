
using System.Web.Mvc;


namespace TiketKarbord.Controllers
{
    public class HomeController : Controller
    {

        // GET: Home

        public ActionResult Index()
        {
            return View();
        }

     

        public ActionResult Login()
        {
            return View();
        }

    }
}